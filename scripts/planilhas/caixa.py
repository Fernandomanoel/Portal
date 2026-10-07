"""Planilhas das atividades do Assistente de Administração Financeira: fluxo de caixa (configurar) e conciliação bancária (preencher)."""
from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Font

from comum import DATA, FONTE_VERMELHA, MOEDA, VERDE, VERMELHO, cabecalho, data, formula, leia_me, linhas, livres, pasta

R = "'Razão do sistema'"
C = "'Conciliação'"


def gerar(d):
    saida = pasta("assistente-administracao-financeira")

    # --------------------------------------------------------------- 1) fluxo de caixa para configurar
    wb = Workbook()
    leia_me(wb, [
        "Fluxo de Caixa Projetado — planilha para CONFIGURAR (outubro/2025)",
        "Esta planilha vem com os pagamentos e recebimentos previstos para outubro. Siga as etapas da atividade no portal:",
        "Etapa 1: confira as abas e formate datas e valores. O saldo inicial do mês está em Resumo!B1.",
        "Etapa 2: na aba Fluxo, crie F = Valor com sinal (entrada positiva, saída negativa) e G = Saldo acumulado.",
        "Etapa 3: Formatação Condicional para o saldo negativo e Validação de Dados (lista) na Categoria.",
        "Etapa 4: na aba Resumo, totalize por categoria com SOMASE.",
        "Etapa 5: encontre o menor saldo do mês, o dia em que ele acontece e quantas linhas ficam no negativo.",
        "Etapa 6: proteja as fórmulas e escreva o parecer para a diretoria.",
        "Os valores são fictícios, feitos para o treino.",
    ])
    ws = wb.create_sheet("Fluxo")
    cabecalho(ws, ["Data", "Descrição", "Categoria", "Tipo", "Valor (R$)"], [12, 38, 26, 10, 14])
    linhas(ws, [[data(p["data"]), p["descricao"], p["categoria"], p["tipo"], p["valor"]] for p in d["fluxo"]], {1: DATA, 5: MOEDA})
    ws = wb.create_sheet("Resumo")
    ws.column_dimensions["A"].width = 34
    ws.column_dimensions["B"].width = 16
    ws["A1"] = "Saldo inicial em 01/10/2025"
    ws["A1"].font = Font(bold=True)
    ws["B1"] = d["saldoOutubro"]
    ws["B1"].number_format = MOEDA
    ws["A3"], ws["B3"] = "Categoria", "Total no mês (R$)"
    for c in ("A3", "B3"):
        ws[c].font = Font(bold=True)
    for r, cat in enumerate(d["categorias"], start=4):
        ws.cell(row=r, column=1, value=cat)
    r = 4 + len(d["categorias"]) + 1
    for i, rotulo in enumerate(["Saldo final do mês", "Menor saldo do mês", "Data do menor saldo", "Linhas com saldo negativo"]):
        ws.cell(row=r + i, column=1, value=rotulo).font = Font(bold=True)
    ws = wb.create_sheet("Categorias")
    ws.column_dimensions["A"].width = 30
    ws["A1"] = "Categorias válidas"
    ws["A1"].font = Font(bold=True)
    for r, cat in enumerate(d["categorias"], start=2):
        ws.cell(row=r, column=1, value=cat)
    wb.save(saida / "fluxo-caixa-para-configurar.xlsx")

    # --------------------------------------------------------------- 2) conciliação já configurada
    wb = Workbook()
    leia_me(wb, [
        "Conciliação Bancária — planilha JÁ CONFIGURADA (setembro/2025)",
        "Não altere as colunas cinza: são fórmulas e estão protegidas (proteção sem senha, apenas para evitar acidentes).",
        "1. A aba «Razão do sistema» é o que a empresa lançou no sistema para a conta corrente. A aba «Extrato do banco» é o que passou de fato na conta.",
        "2. Lance TODAS as linhas do extrato na aba Conciliação: Data, Documento, Histórico e Valor (crédito positivo, débito com sinal de menos).",
        "3. A coluna Situação compara com o sistema: CONCILIADO, DIFERENÇA DE VALOR ou NÃO LANÇADO NO SISTEMA.",
        "4. No Razão, a coluna Situação mostra o que ficou PENDENTE (está no sistema, mas não passou no banco) e o que foi lançado em DUPLICIDADE.",
        "5. A aba Resumo monta a conciliação. Confira: o saldo final do extrato precisa bater com a última linha do extrato do banco,",
        "   e os dois saldos ajustados precisam ser iguais (diferença zero). Se não bater, tem linha digitada errada.",
        "Regras completas no briefing da atividade, no portal. Os valores são fictícios, feitos para o treino.",
    ])
    ws = wb.create_sheet("Razão do sistema")
    cabecalho(ws, ["Data", "Documento", "Histórico", "Valor (R$)", "Situação"], [12, 13, 44, 14, 24])
    linhas(ws, [[data(x["data"]), x["documento"], x["historico"], x["valor"]] for x in d["razao"]], {1: DATA, 4: MOEDA})
    nr = len(d["razao"]) + 1
    for r in range(2, nr + 1):
        formula(ws, r, 5, (f'=IF(COUNTIF(B$2:B{r},B{r})>1,"DUPLICADO NO SISTEMA",IF(COUNTIF({C}!$B:$B,B{r})=0,"PENDENTE",'
                           f'IF(ABS(SUMIF({C}!$B:$B,B{r},{C}!$D:$D)-D{r})>0.005,"DIFERENÇA DE VALOR","CONCILIADO")))'))
    ws.conditional_formatting.add(f"E2:E{nr}", FormulaRule(formula=['$E2<>"CONCILIADO"'], fill=VERMELHO, font=FONTE_VERMELHA))
    ws.protection.sheet = True

    ws = wb.create_sheet("Extrato do banco")
    cabecalho(ws, ["Data", "Documento", "Histórico", "Valor (R$)", "Saldo (R$)"], [12, 13, 44, 14, 14])
    ws.cell(row=2, column=3, value="SALDO ANTERIOR")
    ws.cell(row=2, column=5, value=d["saldoSetembro"]).number_format = MOEDA
    saldo = d["saldoSetembro"]
    extrato = []
    for x in d["extrato"]:
        saldo += x["valor"]
        extrato.append([data(x["data"]), x["documento"], x["historico"], x["valor"], round(saldo, 2)])
    linhas(ws, extrato, {1: DATA, 4: MOEDA, 5: MOEDA}, inicio=3)

    ws = wb.create_sheet("Conciliação")
    cabecalho(ws, ["Data", "Documento", "Histórico", "Valor (R$)", "Valor no sistema (R$)", "Diferença (R$)", "Situação"], [12, 13, 40, 14, 18, 14, 26])
    LIN = 200
    livres(ws, range(1, 5), LIN)
    for r in range(2, LIN + 1):
        ws.cell(row=r, column=1).number_format = DATA
        ws.cell(row=r, column=4).number_format = MOEDA
        formula(ws, r, 5, f'=IF(B{r}="","",IFERROR(VLOOKUP(B{r},{R}!$B:$D,3,FALSE),""))', MOEDA)
        formula(ws, r, 6, f'=IF(OR(B{r}="",E{r}=""),"",D{r}-E{r})', MOEDA)
        formula(ws, r, 7, f'=IF(B{r}="","",IF(E{r}="","NÃO LANÇADO NO SISTEMA",IF(ABS(F{r})>0.005,"DIFERENÇA DE VALOR","CONCILIADO")))')
    ws.conditional_formatting.add(f"G2:G{LIN}", FormulaRule(formula=['AND($G2<>"",$G2<>"CONCILIADO")'], fill=VERMELHO, font=FONTE_VERMELHA))
    ws.protection.sheet = True

    ws = wb.create_sheet("Resumo")
    ws.column_dimensions["A"].width = 58
    ws.column_dimensions["B"].width = 18
    ws["A1"] = "Conciliação bancária — 30/09/2025"
    ws["A1"].font = Font(bold=True, size=13)
    itens = [
        ("Saldo inicial em 01/09 (banco e sistema)", d["saldoSetembro"]),
        ("Saldo final pelo extrato (o que você lançou)", f"=B2+SUM({C}!D:D)"),
        ("Saldo final pelo sistema (razão)", f"=B2+SUM({R}!D:D)"),
        ("(+) Lançamentos só no extrato, a lançar no sistema", f'=SUMIF({C}!G:G,"NÃO LANÇADO NO SISTEMA",{C}!D:D)'),
        ("(+) Correção das diferenças de valor (extrato − sistema)", f'=SUMIF({C}!G:G,"DIFERENÇA DE VALOR",{C}!F:F)'),
        ("(−) Lançamentos em duplicidade no sistema, a estornar", f'=SUMIF({R}!E:E,"DUPLICADO NO SISTEMA",{R}!D:D)'),
        ("(+/−) Pendentes: no sistema, ainda não passaram no banco", f'=SUMIF({R}!E:E,"PENDENTE",{R}!D:D)'),
        ("Saldo ajustado do banco (extrato + pendentes)", "=B3+B8"),
        ("Saldo ajustado do sistema (razão + ajustes − duplicidades)", "=B4+B5+B6-B7"),
        ("Diferença (precisa ser zero)", "=ROUND(B9-B10,2)"),
    ]
    for r, (rotulo, valor) in enumerate(itens, start=2):
        ws.cell(row=r, column=1, value=rotulo).font = Font(bold=r in (9, 10, 11))
        c = formula(ws, r, 2, valor, MOEDA) if isinstance(valor, str) else ws.cell(row=r, column=2, value=valor)
        c.number_format = MOEDA
    ws.conditional_formatting.add("B11", FormulaRule(formula=["$B$11=0"], fill=VERDE))
    ws.conditional_formatting.add("B11", FormulaRule(formula=["$B$11<>0"], fill=VERMELHO, font=FONTE_VERMELHA))
    ws.protection.sheet = True
    wb.save(saida / "conciliacao-configurada-setembro.xlsx")
    return [saida / "fluxo-caixa-para-configurar.xlsx", saida / "conciliacao-configurada-setembro.xlsx"]
