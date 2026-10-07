"""Confere as planilhas JÁ CONFIGURADAS contra os números que as atividades corrigem.

Preenche cada planilha com os lançamentos certos (os do gabarito), recalcula as fórmulas no
LibreOffice (sem interface) e compara célula a célula com os valores esperados que o exportar.mjs
calculou a partir dos mesmos dados das atividades. Precisa de openpyxl e do LibreOffice (soffice).

Uso: python3 scripts/planilhas/conferir.py "$(node scripts/planilhas/exportar.mjs)"
"""
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from openpyxl import load_workbook

from comum import PUBLICO, data

dados = json.load(open(sys.argv[1], encoding="utf-8"))
tmp = Path(tempfile.mkdtemp(prefix="conferir-"))
falhas = []


def recalcular(arquivo, preencher):
    wb = load_workbook(PUBLICO / arquivo)
    preencher(wb)
    entrada = tmp / "entrada" / Path(arquivo).name
    entrada.parent.mkdir(exist_ok=True)
    wb.save(entrada)
    saida = tmp / "saida"
    subprocess.run(["soffice", "--headless", "--calc", "--convert-to", "xlsx", "--outdir", str(saida), str(entrada)], check=True, capture_output=True)
    return load_workbook(saida / entrada.name, data_only=True)


def igual(rotulo, obtido, esperado, tolerancia=0.01):
    ok = abs((obtido or 0) - esperado) <= tolerancia if isinstance(esperado, (int, float)) else obtido == esperado
    if not ok:
        falhas.append(f"{rotulo}: planilha {obtido!r}, atividade {esperado!r}")


def escrever(ws, linhas_):
    for r, linha in enumerate(linhas_, start=2):
        for col, v in enumerate(linha, start=1):
            ws.cell(row=r, column=col, value=v)


# ------------------------------------------------------------------ estoque
d = dados["estoque"]
wb = recalcular("compras-estoque/estoque-configurado-setembro.xlsx", lambda wb: escrever(wb["Movimentos"], [
    [data(m["data"]), m["documento"], m["codigo"], m["tipo"], m["quantidade"], m["desconto"], m["custoNf"] or None] for m in d["lancar"]]))
for r in range(2, len(d["cadastro"]) + 2):
    codigo = wb["Cadastro"].cell(row=r, column=1).value
    igual(f"estoque {codigo} saldo", wb["Cadastro"].cell(row=r, column=9).value, d["esperado"]["saldo"][codigo], 0)

# ------------------------------------------------------------------ folha
d = dados["folha"]
wb = recalcular("departamento-pessoal/folha-configurada-setembro.xlsx", lambda wb: escrever(wb["Lançamentos"], [
    [data(o["data"]), o["matricula"], o["tipo"], o["quantidade"]] for o in d["lancar"]]))
esperado = {e["matricula"]: e for e in d["esperado"]}
for r in range(2, len(d["funcionarios"]) + 2):
    ws = wb["Folha"]
    e = esperado[ws.cell(row=r, column=1).value]
    for col, campo in [(12, "bruto"), (13, "inss"), (15, "irrf"), (17, "liquido"), (18, "fgts")]:
        igual(f"folha {e['matricula']} {campo}", ws.cell(row=r, column=col).value, e[campo])
alertas = [wb["Lançamentos"].cell(row=r, column=7).value for r in range(2, len(d["lancar"]) + 2)]
igual("folha alertas de limite", sum(a == "LIMITE 2H — JUSTIFICAR" for a in alertas), sum(1 for o in d["lancar"] if o["acimaDoLimite"]))

# ------------------------------------------------------------------ cobrança
d = dados["cobranca"]
wb = recalcular("credito-cobranca/cobranca-configurada-setembro.xlsx", lambda wb: escrever(wb["Baixas"], [
    [data(p["data"]), p["nf"], p["valor"], p["documento"]] for p in d["pagamentos"]]))
for r, sit in enumerate(d["esperado"]["baixas"], start=2):
    igual(f"cobrança baixa linha {r}", wb["Baixas"].cell(row=r, column=9).value, sit)
for r, c in enumerate(d["esperado"]["carteira"], start=2):
    ws = wb["Carteira"]
    igual(f"cobrança {c['nf']} situação", ws.cell(row=r, column=10).value, c["situacao"])
    igual(f"cobrança {c['nf']} em aberto", ws.cell(row=r, column=11).value, c["emAberto"])
    igual(f"cobrança {c['nf']} negativar", ws.cell(row=r, column=12).value == "NEGATIVAR", c["negativar"])

# ------------------------------------------------------------------ conciliação
d = dados["caixa"]
wb = recalcular("assistente-administracao-financeira/conciliacao-configurada-setembro.xlsx", lambda wb: escrever(wb["Conciliação"], [
    [data(x["data"]), x["documento"], x["historico"], x["valor"]] for x in d["extrato"]]))
for r, sit in enumerate(d["esperado"]["razao"], start=2):
    igual(f"conciliação razão linha {r}", wb["Razão do sistema"].cell(row=r, column=5).value, sit)
for r, sit in enumerate(d["esperado"]["extrato"], start=2):
    igual(f"conciliação extrato linha {r}", wb["Conciliação"].cell(row=r, column=7).value, sit)
ws = wb["Resumo"]
igual("conciliação saldo do extrato", ws["B3"].value, d["esperado"]["saldoExtrato"])
igual("conciliação saldo do sistema", ws["B4"].value, d["esperado"]["saldoSistema"])
igual("conciliação saldo ajustado", ws["B9"].value, d["esperado"]["saldoAjustado"])
igual("conciliação diferença", ws["B11"].value, 0)
igual("conciliação última linha do extrato", wb["Extrato do banco"].cell(row=len(d["extrato"]) + 2, column=5).value, d["esperado"]["saldoExtrato"])

# ------------------------------------------------------------------ vendas
d = dados["vendas"]
lancar = [i for i in d["setembro"] if i["status"] != "Cancelado"]
wb = recalcular("vendas/vendas-configurada-setembro.xlsx", lambda wb: escrever(wb["Lançamentos"], [
    [i["pedido"], data(i["data"]), i["vendedor"], i["codigo"], i["quantidade"], i["desconto"], "Gerente" if re.search("aprovado pelo gerente", i["obs"], re.I) else None] for i in lancar]))
nomes = {"CÓDIGO INVÁLIDO": "CORRIGIR CÓDIGO", "BLOQUEADO": "BLOQUEADO — SEM APROVAÇÃO"}
for r, sit in enumerate(d["esperado"]["alertas"], start=2):
    igual(f"vendas alerta linha {r}", wb["Lançamentos"].cell(row=r, column=11).value, nomes.get(sit, sit))
for r, e in enumerate(d["esperado"]["resumo"], start=2):
    ws = wb["Vendedores"]
    igual(f"vendas {e['codigo']} faturamento", ws.cell(row=r, column=4).value, e["faturamento"])
    igual(f"vendas {e['codigo']} comissão %", round((ws.cell(row=r, column=6).value or 0) * 100, 4), e["percentual"])
    igual(f"vendas {e['codigo']} comissão", ws.cell(row=r, column=7).value, e["comissao"])

shutil.rmtree(tmp)
if falhas:
    print(f"{len(falhas)} divergência(s):")
    print("\n".join(falhas[:60]))
    sys.exit(1)
print("planilhas conferidas: todas as fórmulas batem com as atividades")
