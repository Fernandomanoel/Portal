"""Planilhas das atividades de Contabilidade (Aulas 13 a 16) e do Simples Nacional.

Copiam o visual da planilha original «Escrita Fiscal e Contabilidade — Aulas 13 a 16»: plano de contas
em faixas de cor (azul = Ativo, laranja = Passivo e PL, verde = Receitas, vermelho = Custos e despesas),
lançamentos em roxo, conta a debitar em vermelho e conta a creditar em verde, com a conferência
«OK / Errado» na própria planilha. O aluno faz tudo na planilha; o passo a passo fica no portal.

Os dados vêm de src/data/atividadesAutocorrigidas/dadosContabilidade.ts (exportados por exportar.mjs).
Com a variável GABARITO_DIR definida, grava também uma cópia preenchida de cada planilha nessa pasta
(para conferir no LibreOffice; esses arquivos NÃO vão para public/).
"""
import math
import os
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

from comum import leia_me, pasta

AREA = "contabilidade"
MOEDA = '_-"R$"\\ * #,##0.00_-;\\-"R$"\\ * #,##0.00_-;_-"R$"\\ * "-"??_-;_-@_-'

# Faixas de cor do plano de contas: nível 1 (escuro) a nível 4 (conta analítica).
PALETAS = {
    "azul": ["2F5597", "8FAADC", "B4C7E7", "DAE3F3"],
    "laranja": ["ED7D31", "F4B183", "F8CBAD", "FBE5D6"],
    "verde": ["70AD47", "A9D18E", "C5E0B4", "E2EFDA"],
    "vermelho": ["E05252", "FF8F8F", "FFB7B7", "FFE5E5"],
}
CINZA = "BFBFBF"
ROXO, ROXO_CLARO, VERM, VERDE = "BA8CDC", "CFAFE7", "FFB7B7", "C5E0B4"
AMARELO, AMARELO_FORTE = "FFE699", "FFD966"

def Fonte(**kw):
    """Fonte sempre com nome e tamanho: sem eles o LibreOffice troca a Calibri por uma fonte com serifa."""
    kw.setdefault("name", "Calibri")
    kw.setdefault("size", 11)
    return Font(**kw)


BOM = (PatternFill("solid", bgColor="C6EFCE", fgColor="C6EFCE"), Fonte(color="006100", bold=True))
RUIM = (PatternFill("solid", bgColor="FFC7CE", fgColor="FFC7CE"), Fonte(color="9C0006", bold=True))
FINO = Side(style="thin", color="FFFFFF")


def preenche(cor):
    return PatternFill("solid", fgColor=cor)


def nivel(codigo):
    return codigo.count(".") + 1


def paleta(codigo):
    if codigo.startswith("1"):
        return PALETAS["azul"]
    if codigo.startswith("2"):
        return PALETAS["laranja"]
    if codigo.startswith("3.2"):
        return PALETAS["vermelho"]
    return PALETAS["verde"]


def filhos(plano, codigo):
    return [c for c, _, _ in plano if c.startswith(codigo + ".") and nivel(c) == nivel(codigo) + 1]


def semaforo(ws, intervalo, bom=("OK", "Correto", "Certo"), ruim=("Errado", "Inexiste", "Digite S ou A")):
    for texto in bom:
        ws.conditional_formatting.add(intervalo, CellIsRule(operator="equal", formula=[f'"{texto}"'], fill=BOM[0], font=BOM[1]))
    for texto in ruim:
        ws.conditional_formatting.add(intervalo, CellIsRule(operator="equal", formula=[f'"{texto}"'], fill=RUIM[0], font=RUIM[1]))


def titulos_colunas(ws, larguras):
    for col, largura in larguras.items():
        ws.column_dimensions[col].width = largura


def cabecalho_contas(ws, plano):
    """Linhas 1 e 2: «Números das contas» e «Contas contábeis», como na planilha original."""
    ws.merge_cells("A1:D1")
    ws["A1"] = "Números das contas"
    for col, txt in zip("ABCD", ["#", "#.#", "#.#.#", "#.#.#.##"]):
        c = ws[f"{col}2"]
        c.value, c.font = txt, Fonte(bold=True, italic=True, size=8)
        c.alignment = Alignment(horizontal="center")
    ws.merge_cells("E1:E2")
    ws["E1"] = "Contas contábeis"
    ws["E1"].font = Fonte(bold=True, size=18)
    ws["E1"].alignment = Alignment(horizontal="center", vertical="center")
    ws["A1"].font = Fonte(bold=True, size=9)
    ws["A1"].alignment = Alignment(horizontal="center")
    for row in ws["A1:E2"]:
        for c in row:
            c.fill = preenche(CINZA)


def linhas_do_plano(ws, plano, formula_saldo=None, tipo_do_aluno=None):
    """Escreve o plano a partir da linha 3. Devolve {código: linha}."""
    linha_de = {}
    for i, (codigo, nome, tipo) in enumerate(plano):
        r = 3 + i
        linha_de[codigo] = r
    for codigo, nome, tipo in plano:
        r = linha_de[codigo]
        n = nivel(codigo)
        cor = paleta(codigo)[n - 1] if n <= 4 else paleta(codigo)[3]
        col_codigo = "ABCD"[n - 1]
        ws[f"{col_codigo}{r}"] = int(codigo) if n == 1 else codigo
        for col in "ABCDE":
            ws[f"{col}{r}"].fill = preenche(cor)
        ws[f"E{r}"] = nome
        ws[f"E{r}"].alignment = Alignment(wrap_text=True, vertical="center", indent=0)
        claro = n == 1
        fonte = Fonte(color="FFFFFF", bold=True) if claro else Fonte(bold=(tipo == "S"))
        ws[f"E{r}"].font = fonte
        ws[f"{col_codigo}{r}"].font = fonte
        ws[f"{col_codigo}{r}"].alignment = Alignment(horizontal="center" if n == 1 else "left", vertical="center")
    return linha_de


def saldos_formulas(ws, plano, linha_de, primeira, ultima):
    """Coluna F: conta analítica = lançamentos (SOMASE); sintética = soma das filhas."""
    ws.merge_cells("F1:F2")
    ws["F1"] = "Saldos"
    ws["F1"].font = Fonte(bold=True)
    ws["F1"].alignment = Alignment(horizontal="center", vertical="center")
    for row in ws["F1:F2"]:
        for c in row:
            c.fill = preenche(CINZA)
    k, i, m = f"$K${primeira}:$K${ultima}", f"$I${primeira}:$I${ultima}", f"$M${primeira}:$M${ultima}"
    for codigo, _, tipo in plano:
        r = linha_de[codigo]
        if tipo == "A":
            devedor = codigo.startswith("1") or codigo.startswith("3.2")
            a, b = ("K", "M") if devedor else ("M", "K")
            ws[f"F{r}"] = f"=SUMIF(${a}${primeira}:${a}${ultima},D{r},{i})-SUMIF(${b}${primeira}:${b}${ultima},D{r},{i})"
        else:
            ws[f"F{r}"] = "=SUM(" + ",".join(f"F{linha_de[f]}" for f in filhos(plano, codigo)) + ")"
        ws[f"F{r}"].number_format = MOEDA
        ws[f"F{r}"].alignment = Alignment(vertical="center")
        cor = paleta(codigo)[min(nivel(codigo), 4) - 1]
        ws[f"F{r}"].fill = preenche(cor)
        ws[f"F{r}"].font = Fonte(color="FFFFFF", bold=True) if nivel(codigo) == 1 else Fonte(bold=(tipo == "S"))
    # Resultado: receitas − custos e despesas, só mostrado na linha de «3».
    r3 = linha_de["3"]
    ws[f"F{r3}"] = f"=F{linha_de['3.1']}-F{linha_de['3.2']}"


def blocos_lancamentos(ws, lancs_prontos, lancs, gabarito, primeira=3):
    """Lançamentos nas colunas H a N: `lancs_prontos` já lançados (cinza) e `lancs` para o aluno fazer."""
    ws.merge_cells("H1:H2")
    ws["H1"] = "Lançamentos"
    ws.merge_cells("I1:J2")
    ws["I1"] = "Valor"
    ws.merge_cells("K1:L2")
    ws["K1"] = "Conta a debitar"
    ws.merge_cells("M1:N2")
    ws["M1"] = "Conta a creditar"
    for ref, tam in [("H1", 18), ("I1", 11), ("K1", 11), ("M1", 11)]:
        ws[ref].font = Fonte(bold=True, size=tam)
        ws[ref].alignment = Alignment(horizontal="center", vertical="center")
    for row in ws["H1:N2"]:
        for c in row:
            c.fill = preenche(CINZA)

    total = len(lancs_prontos) + len(lancs)
    ultima = primeira + total - 1
    for n, l in enumerate(lancs_prontos + lancs):
        r = primeira + n
        pronto = n < len(lancs_prontos)
        ws[f"H{r}"] = l["texto"]
        ws[f"H{r}"].alignment = Alignment(wrap_text=True, vertical="center")
        for col, cor in zip("HIJKLMN", [ROXO, ROXO_CLARO, ROXO_CLARO, VERM, VERM, VERDE, VERDE]):
            ws[f"{col}{r}"].fill = preenche("D9D9D9" if pronto else cor)
        for col in "IKM":
            ws[f"{col}{r}"].alignment = Alignment(vertical="center", horizontal="center" if col != "I" else "right")
        ws[f"I{r}"].number_format = MOEDA
        if pronto or gabarito:
            ws[f"I{r}"], ws[f"K{r}"], ws[f"M{r}"] = l["valor"], l["debito"], l["credito"]
        if pronto:
            for col in "JLN":
                ws[f"{col}{r}"] = "OK"
                ws[f"{col}{r}"].alignment = Alignment(horizontal="center", vertical="center")
            ws[f"H{r}"].font = Fonte(color="595959")
        else:
            ws[f"J{r}"] = f'=IF(I{r}="","",IF(ROUND(I{r},2)={round(l["valor"], 2)},"OK","Errado"))'
            ws[f"L{r}"] = f'=IF(K{r}="","",IF(TRIM(K{r})="{l["debito"]}","OK","Errado"))'
            ws[f"N{r}"] = f'=IF(M{r}="","",IF(TRIM(M{r})="{l["credito"]}","OK","Errado"))'
            for col in "JLN":
                ws[f"{col}{r}"].alignment = Alignment(horizontal="center", vertical="center")
        linhas = max(1, math.ceil(len(l["texto"]) / 66))
        ws.row_dimensions[r].height = max(30, 15 * linhas)

    primeiro_do_aluno = primeira + len(lancs_prontos)
    if lancs:
        semaforo(ws, f"J{primeiro_do_aluno}:N{ultima}")
        # Só o valor e as contas são digitados: validação de dados na própria planilha.
        dv_valor = DataValidation(type="decimal", operator="greaterThanOrEqual", formula1="0", allow_blank=True)
        dv_valor.errorTitle, dv_valor.error = "Valor inválido", "Digite um valor em reais, maior ou igual a zero."
        ws.add_data_validation(dv_valor)
        dv_valor.add(f"I{primeiro_do_aluno}:I{ultima}")
        dv_conta = DataValidation(type="list", formula1="Listas!$A$1:$A$72", allow_blank=True, showErrorMessage=True)
        dv_conta.errorTitle, dv_conta.error = "Conta inexistente", "Digite o número de uma conta analítica (4 níveis, como 1.1.1.02)."
        dv_conta.errorStyle = "warning"
        ws.add_data_validation(dv_conta)
        dv_conta.add(f"K{primeiro_do_aluno}:K{ultima}")
        dv_conta.add(f"M{primeiro_do_aluno}:M{ultima}")
    return primeira, ultima


def lista_de_contas(wb, plano):
    """Aba oculta com as contas analíticas, que alimenta a lista suspensa de Débito e Crédito."""
    ws = wb.create_sheet("Listas")
    for i, (cod, _, tipo) in enumerate([p for p in plano if p[2] == "A"], start=1):
        ws[f"A{i}"] = cod
    ws.sheet_state = "hidden"


def conferencia(ws, linha_de, inicio, fechamento, rotulos):
    """Quadro «O saldo do ATIVO ainda está:» como na planilha original."""
    itens = [
        (rotulos[0], f"=IF(ROUND(F{linha_de['1']},2)={fechamento['ativo']},\"Correto\",\"Errado\")"),
        (rotulos[1], f"=IF(ROUND(F{linha_de['2']},2)={round(fechamento['passivo'] + fechamento['patrimonio'], 2)},\"Correto\",\"Errado\")"),
        (rotulos[2], f"=IF(ROUND(F{linha_de['3']},2)={fechamento['resultado']},\"Correto\",\"Errado\")"),
    ]
    for k, (texto, formula) in enumerate(itens):
        r = inicio + k
        ws[f"H{r}"] = texto
        ws[f"H{r}"].alignment = Alignment(horizontal="right", vertical="center")
        ws[f"H{r}"].font = Fonte(bold=True)
        ws[f"I{r}"] = formula
        ws[f"I{r}"].alignment = Alignment(horizontal="center")
    semaforo(ws, f"I{inicio}:I{inicio + 2}")


def congelar(ws):
    ws.freeze_panes = "A3"
    ws.sheet_view.zoomScale = 90
    titulos_colunas(ws, {"A": 3, "B": 5, "C": 7, "D": 10, "E": 52, "F": 17, "G": 2, "H": 70, "I": 15.5, "J": 10.5, "K": 12.5, "L": 10.5, "M": 12.5, "N": 10.5})


def aba_contabilidade(wb, nome, plano, prontos, novos, gabarito, fechamento, rotulos):
    ws = wb.create_sheet(nome)
    cabecalho_contas(ws, plano)
    linha_de = linhas_do_plano(ws, plano)
    primeira, ultima = blocos_lancamentos(ws, prontos, novos, gabarito)
    saldos_formulas(ws, plano, linha_de, primeira, ultima)
    conferencia(ws, linha_de, ultima + 2, fechamento, rotulos)
    congelar(ws)
    return ws, linha_de


def para_dicts(lancs):
    return [dict(l) for l in lancs]


# ---------------------------------------------------------------- Aula 13: sintética ou analítica

def plano_para_classificar(dados, gabarito):
    plano = [tuple(p) for p in dados["plano"]]
    wb = Workbook()
    leia_me(wb, [
        "Aula 13 — Plano de contas: conta sintética ou analítica",
        "1. Na aba «Aula 13», leia cada conta e preencha a coluna amarela com S (sintética) ou A (analítica).",
        "2. A planilha responde sozinha: a coluna ao lado escreve o tipo por extenso e a seguinte diz Certo ou Errado.",
        "3. Dica: conta sintética é a que tem contas «filhas» (o número dela aparece no começo do número das outras). Analítica é a que não tem filhas: é nela que se lança.",
        "4. No fim da lista, o placar mostra quantas você acertou.",
        "O passo a passo completo, com figuras, está na atividade do portal.",
    ])
    ws = wb.create_sheet("Aula 13")
    cabecalho_contas(ws, plano)
    linha_de = linhas_do_plano(ws, plano)
    ws.merge_cells("F1:H2")
    ws["F1"] = 'Preencha com "S" para Sintética ou "A" para Analítica'
    ws["F1"].font = Fonte(bold=True)
    ws["F1"].alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    for row in ws["F1:H2"]:
        for c in row:
            c.fill = preenche(CINZA)
    dv = DataValidation(type="list", formula1='"S,A"', allow_blank=True, showErrorMessage=True)
    dv.errorTitle, dv.error = "Só S ou A", "Digite S para Sintética ou A para Analítica."
    ws.add_data_validation(dv)
    ultima = 2 + len(plano)
    for codigo, _, tipo in plano:
        r = linha_de[codigo]
        ws[f"F{r}"].fill = preenche(AMARELO_FORTE)
        ws[f"F{r}"].alignment = Alignment(horizontal="center", vertical="center")
        ws[f"F{r}"].font = Fonte(bold=True)
        if gabarito:
            ws[f"F{r}"] = tipo
        ws[f"G{r}"] = f'=IF(F{r}="S","Conta Sintética",IF(F{r}="A","Conta Analítica",IF(F{r}="","","Digite S ou A")))'
        ws[f"H{r}"] = f'=IF(F{r}="","",IF(F{r}=J{r},"Certo","Errado"))'
        ws[f"J{r}"] = tipo
        for col in "GH":
            ws[f"{col}{r}"].alignment = Alignment(horizontal="center", vertical="center")
        dv.add(f"F{r}")
    ws.column_dimensions["J"].hidden = True
    semaforo(ws, f"G3:H{ultima}")
    # Placar
    ws["J1"] = "gabarito"
    ws["L1"] = "Placar"
    ws["L1"].font = Fonte(bold=True, size=14)
    ws["L2"] = "Certas"
    ws["M2"] = f'=COUNTIF(H3:H{ultima},"Certo")'
    ws["L3"] = "Erradas"
    ws["M3"] = f'=COUNTIF(H3:H{ultima},"Errado")'
    ws["L4"] = "Faltam"
    ws["M4"] = f'=COUNTA(E3:E{ultima})-M2-M3'
    for r in (2, 3, 4):
        ws[f"L{r}"].font = Fonte(bold=True)
        ws[f"M{r}"].alignment = Alignment(horizontal="center")
    ws["L6"] = "Contas no plano:"
    ws["M6"] = f"=COUNTA(E3:E{ultima})"
    ws["L7"] = "Sintéticas:"
    ws["M7"] = f'=COUNTIF(J3:J{ultima},"S")'
    ws["L8"] = "Analíticas:"
    ws["M8"] = f'=COUNTIF(J3:J{ultima},"A")'
    ws.freeze_panes = "A3"
    ws.sheet_view.zoomScale = 90
    titulos_colunas(ws, {"A": 3, "B": 5, "C": 7, "D": 10, "E": 52, "F": 12, "G": 18, "H": 12, "I": 2, "J": 6, "K": 2, "L": 16, "M": 10})
    ws.column_dimensions["J"].hidden = True
    ws["L7"].font = ws["L8"].font = ws["L6"].font = Fonte(bold=True, color="7F7F7F")
    # A contagem de S/A usa a coluna oculta: escondê-la não atrapalha, mas o placar a lê.
    return wb


# ---------------------------------------------------------------- Aulas 14, 15 e 16

def contabilidade(dados, aula, gabarito):
    plano = [tuple(p) for p in dados["plano"]]
    prontos = para_dicts(dados["aula14"]) if aula == 15 else []
    novos = para_dicts(dados[f"aula{aula}"])
    fech = dados["fechamento"][f"aula{aula}"]
    rotulos = {
        14: ["O saldo do ATIVO ainda está:", "O saldo do PASSIVO ainda está:", "O saldo da conta de RESULTADO ainda está:"],
        15: ["O saldo do ATIVO ficou:", "O saldo do PASSIVO + PL ficou:", "O saldo da conta de RESULTADO ficou:"],
        16: ["O saldo do ATIVO ficou:", "O saldo do PASSIVO + PL ficou:", "O saldo da conta de RESULTADO ficou:"],
    }[aula]
    wb = Workbook()
    passos = {
        14: "Lance os 7 fatos da Walking Pet: para cada um, digite o valor, a conta a debitar e a conta a creditar. A planilha confere tudo.",
        15: "As linhas em cinza são os lançamentos da Aula 14, já feitos. Lance os 9 fatos novos nas linhas coloridas.",
        16: "Empresa nova, livros zerados. Lance os 13 fatos do mês: valor, conta a debitar e conta a creditar.",
    }[aula]
    leia_me(wb, [
        f"Aula {aula} — Lançamentos contábeis" + (" (Walking Pet)" if aula != 16 else " (unidade de banho e tosa)"),
        passos,
        "Regra de ouro: todo lançamento tem um valor, uma conta que recebe (débito) e uma conta que dá (crédito), e o valor é o mesmo nas duas.",
        "As colunas OK/Errado respondem na hora. O saldo de cada conta aparece em «Saldos» e os totais de Ativo, Passivo e Resultado são conferidos abaixo dos lançamentos.",
        "O passo a passo completo, com figuras, está na atividade do portal.",
    ])
    ws, linha_de = aba_contabilidade(wb, f"Aula {aula}", plano, prontos, novos, gabarito, fech, rotulos)
    lista_de_contas(wb, plano)
    return wb


# ---------------------------------------------------------------- Balanço e DRE

BP = [  # (linha, coluna do rótulo, rótulo, coluna do valor, referência na aba Aula 15 ou fórmula)
    (5, "A", "Ativo", "B", "='Aula 15'!F3"),
    (6, "A", "Circulante ", "B", "='Aula 15'!F4"),
    (7, "A", "  Disponível ", "B", "='Aula 15'!F5"),
    (8, "A", "  Contas a receber", "B", "='Aula 15'!F9"),
    (9, "A", "  Estoques", "B", "='Aula 15'!F13"),
    (10, "A", "  Outros créditos", "B", "='Aula 15'!F16"),
    (12, "A", "Não-Circulante ", "B", "='Aula 15'!F20"),
    (13, "A", "  Realizável a Longo Prazo", "B", "='Aula 15'!F21"),
    (14, "A", "  Investimentos ", "B", "='Aula 15'!F24"),
    (15, "A", "  Imobilizado", "B", "='Aula 15'!F27"),
    (5, "C", "Passivo", "D", "='Aula 15'!F37"),
    (6, "C", "Circulante ", "D", "='Aula 15'!F38"),
    (7, "C", "  Fornecedores", "D", "='Aula 15'!F39"),
    (8, "C", "  Financiamentos e empréstimos", "D", "='Aula 15'!F43"),
    (9, "C", "  Obrigações fiscais ", "D", "='Aula 15'!F46"),
    (10, "C", "  Contas a pagar", "D", "='Aula 15'!F55"),
    (11, "C", "  Provisões", "D", "='Aula 15'!F63"),
    (13, "C", "Não-Circulante ", "D", "='Aula 15'!F67"),
    (14, "C", "  Financiamentos e empréstimos", "D", "='Aula 15'!F68"),
    (15, "C", "  Outros tipos de empréstimos", "D", "='Aula 15'!F71"),
    (17, "C", "Patrimônio Líquido ", "D", "='Aula 15'!F73"),
    (18, "C", "   Capital Social ", "D", "='Aula 15'!F74"),
    (19, "C", "   Reservas de capital", "D", "='Aula 15'!F77"),
    (20, "C", "   Lucros/prejuízos acumulados", "D", "='Aula 15'!F79"),
    (21, "C", "   Resultado do exercício (lucro)", "D", "='Aula 15'!F82"),
    (23, "A", "Total do Ativo ", "B", "=B5"),
    (23, "C", "Total do Passivo + PL", "D", "=D17+D13+D6+D21"),
]
DRE = [
    (5, "(+) Receita bruta de vendas", "='Aula 15'!F85"),
    (7, "(–) Deduções (ICMS sobre as vendas)", "=-'Aula 15'!F87"),
    (9, "(=) Receita líquida", "=F5-F7"),
    (11, "(–) Custo das mercadorias vendidas", "='Aula 15'!F97"),
    (13, "(=) Lucro bruto", "=F9-F11"),
    (15, "(–) Despesas com venda", "='Aula 15'!F102"),
    (17, "(–) Despesas financeiras", "='Aula 15'!F104"),
    (19, "(+) Receita financeira", "='Aula 15'!F88"),
    (21, "(–) Despesas administrativas", "='Aula 15'!F101"),
    (23, "(=) Lucro Líquido", "=F13-F15-F17+F19-F21"),
]


def esperado_bp(dados):
    """Valores esperados de cada célula do BP/DRE, calculados a partir dos lançamentos."""
    t = dados["totais15"]
    return {
        "B5": t["1"], "B6": t["1.1"], "B7": t["1.1.1"], "B8": t["1.1.2"], "B9": t["1.1.3"], "B10": t["1.1.4"],
        "B12": t["1.2"], "B13": t["1.2.1"], "B14": t["1.2.2"], "B15": t["1.2.3"],
        "D5": t["2"], "D6": t["2.1"], "D7": t["2.1.1"], "D8": t["2.1.2"], "D9": t["2.1.3"], "D10": t["2.1.5"], "D11": t["2.1.6"],
        "D13": t["2.2"], "D14": t["2.2.1"], "D15": t["2.2.2"], "D17": t["2.3"], "D18": t["2.3.1"], "D19": t["2.3.2"], "D20": t["2.3.3"],
        "D21": t["resultado"], "B23": t["1"], "D23": round(t["2"] + t["resultado"], 2),
        "F5": t["3.1.1.01"], "F7": -t["3.1.1.03"], "F9": round(t["3.1.1.01"] + t["3.1.1.03"], 2), "F11": t["3.2.1"],
        "F13": round(t["3.1.1.01"] + t["3.1.1.03"] - t["3.2.1"], 2), "F15": t["3.2.2.02"], "F17": t["3.2.3"], "F19": t["3.1.2"],
        "F21": t["3.2.2.01"], "F23": t["resultado"],
    }


def balanco_e_dre(dados, gabarito):
    plano = [tuple(p) for p in dados["plano"]]
    wb = Workbook()
    leia_me(wb, [
        "Aula 15 — Balanço Patrimonial e DRE da Walking Pet",
        "A aba «Aula 15» traz os livros já fechados (os 16 lançamentos feitos). Na aba «Aula 15 - BP e DRE», preencha as células amarelas ligando cada valor ao saldo da aba «Aula 15».",
        "Como ligar: clique na célula amarela, digite = , clique na aba «Aula 15», clique na célula do saldo e aperte Enter. Exemplo: ='Aula 15'!F3.",
        "Cada célula fica verde quando o valor está certo e vermelha quando está errado. No fim, Total do Ativo e Total do Passivo + PL precisam ser iguais.",
        "O passo a passo completo, com figuras, está na atividade do portal.",
    ])
    fech = dados["fechamento"]["aula15"]
    aba_contabilidade(
        wb, "Aula 15", plano, para_dicts(dados["aula14"]) + para_dicts(dados["aula15"]), [], False, fech,
        ["O saldo do ATIVO ficou:", "O saldo do PASSIVO + PL ficou:", "O saldo da conta de RESULTADO ficou:"],
    )
    ws = wb.create_sheet("Aula 15 - BP e DRE")
    ws.sheet_view.showGridLines = False
    titulos_colunas(ws, {"A": 34, "B": 16, "C": 34, "D": 16, "E": 38, "F": 22})
    verde, amarelo_claro, azul = "E2EFDA", "FFF2CC", "D9E2F3"
    lado = Side(style="thin", color="000000")
    for r in range(1, 34):
        for col in "ABCD":
            ws[f"{col}{r}"].fill = preenche(verde)
        for col in "EF":
            ws[f"{col}{r}"].fill = preenche(amarelo_claro)
    ws.merge_cells("A1:F1")
    ws["A1"] = "WALKING PET"
    ws["A1"].font = Fonte(bold=True, size=18, color="2F5597")
    ws["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ws.merge_cells("A2:F2")
    ws["A2"] = "CNPJ:XX.XXX.XXX/XXXX-XX"
    ws["A2"].alignment = Alignment(horizontal="center")
    ws.merge_cells("A3:F3")
    ws["A3"] = "Demonstrações Financeiras - Período de XX/XX/XXXX a XX/XX/XXXX"
    ws["A3"].font = Fonte(bold=True)
    ws["A3"].alignment = Alignment(horizontal="center")
    for r in (1, 2):
        for col in "ABCDEF":
            ws[f"{col}{r}"].fill = preenche(azul)
    for col in "ABCDEF":
        ws[f"{col}3"].fill = preenche("FFC000")
    ws.row_dimensions[1].height = 34
    ws.merge_cells("A4:D4")
    ws["A4"] = "Balanço Patrimonial"
    ws.merge_cells("E4:F4")
    ws["E4"] = "Demonstração do Resultado do Exercício"
    for ref in ("A4", "E4"):
        ws[ref].font = Fonte(bold=True)
        ws[ref].alignment = Alignment(horizontal="center")
    for col in "ABCDEF":
        ws[f"{col}4"].border = Border(top=lado, bottom=lado)
    esperado = esperado_bp(dados)
    campos = []
    negrito = {5, 6, 12, 13, 17, 23}
    for linha, col_r, rotulo, col_v, ref in BP:
        ws[f"{col_r}{linha}"] = rotulo
        celula = ws[f"{col_v}{linha}"]
        celula.number_format = MOEDA
        celula.fill = preenche(AMARELO)
        if gabarito:
            celula.value = ref
        campos.append(f"{col_v}{linha}")
        if linha in negrito or rotulo.strip() in ("Ativo", "Passivo"):
            ws[f"{col_r}{linha}"].font = Fonte(bold=True)
    for linha, rotulo, ref in DRE:
        ws[f"E{linha}"] = rotulo
        ws[f"E{linha}"].font = Fonte(bold=linha in (9, 13, 23), color="595959" if linha not in (9, 13, 23) else "000000")
        celula = ws[f"F{linha}"]
        celula.number_format = MOEDA
        celula.fill = preenche(AMARELO)
        if gabarito:
            celula.value = ref
        campos.append(f"F{linha}")
    for ref in ("A23", "C23", "E23"):
        ws[ref].font = Fonte(bold=True)
    ws.merge_cells("A24:D24")
    ws["A24"] = "São Paulo, XX de XXXXXX de XXXX"
    ws["A24"].alignment = Alignment(horizontal="center")
    ws.merge_cells("A27:D28")
    ws["A27"] = "Presidente - “Declaro, sob as penas da lei, que as informações aqui contidas, são verdadeiras e me responsabilizo por todas elas.”"
    ws["A27"].alignment = Alignment(wrap_text=True, horizontal="center", vertical="center")
    ws.merge_cells("E27:F27")
    ws["E27"] = "Diretoria"
    ws["E27"].font = Fonte(bold=True)
    ws["E27"].alignment = Alignment(horizontal="center")
    ws.merge_cells("A31:D33")
    ws["A31"] = "Contador - “Declaro, sob as penas da lei, que as informações aqui contidas, refletem a documentação que me foi entregue, são verdadeiras e me responsabilizo por todas.”"
    ws["A31"].alignment = Alignment(wrap_text=True, horizontal="center", vertical="center")
    for ref, txt in [("E31", "PRESIDENTE"), ("F31", "CONTADOR"), ("E32", "NOME"), ("F32", "NOME"), ("E33", "CPF: XXX.XXX.XXX-XX"), ("F33", "CT CRC: XXXXXXXXX/X-X")]:
        ws[ref] = txt
        ws[ref].alignment = Alignment(horizontal="center")
        ws[ref].font = Fonte(bold=ref in ("E31", "F31"), size=9)
    # Conferência: cada célula amarela fica verde ou vermelha conforme o valor esperado.
    for ref in campos:
        alvo = esperado[ref]
        ws.conditional_formatting.add(ref, FormulaRule(formula=[f'AND({ref}<>"",ROUND({ref},2)={alvo})'], fill=BOM[0], font=BOM[1], stopIfTrue=True))
        ws.conditional_formatting.add(ref, FormulaRule(formula=[f'AND({ref}<>"",ROUND({ref},2)<>{alvo})'], fill=RUIM[0], font=RUIM[1], stopIfTrue=True))
    ws["A35"] = "Conferência"
    ws["A35"].font = Fonte(bold=True, size=12)
    ws["A36"] = "Total do Ativo = Total do Passivo + PL?"
    ws["B36"] = '=IF(OR(B23="",D23=""),"",IF(ROUND(B23,2)=ROUND(D23,2),"Correto","Errado"))'
    ws["A37"] = "Lucro líquido da DRE = Resultado do exercício do Balanço?"
    ws["B37"] = '=IF(OR(F23="",D21=""),"",IF(ROUND(F23,2)=ROUND(D21,2),"Correto","Errado"))'
    ws["A36"].alignment = ws["A37"].alignment = Alignment(wrap_text=True)
    ws.row_dimensions[37].height = 30
    for ref in ("B36", "B37"):
        ws[ref].alignment = Alignment(horizontal="center", vertical="center")
    semaforo(ws, "B36:B37")
    ws.print_options.horizontalCentered = True
    return wb


# ---------------------------------------------------------------- Simples Nacional

def simples(dados, gabarito):
    wb = Workbook()
    leia_me(wb, [
        "Simples Nacional — alíquota efetiva e imposto do mês",
        "Aba «Tabelas»: as faixas dos Anexos I (Comércio), II (Indústria) e III (Serviços) da Lei Complementar 123/2006.",
        "Aba «Consulta Imposto Simples»: preencha as células amarelas com fórmulas. Alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12. Imposto do mês = RBM × alíquota efetiva.",
        "Cada resposta fica verde (OK) ou vermelha (Errado) sozinha. Mude a RBT12 para ver a faixa trocar.",
        "O passo a passo completo, com figuras, está na atividade do portal.",
    ])
    t = wb.create_sheet("Tabelas")
    titulos_colunas(t, {"A": 24, "B": 20, "C": 12, "D": 18, "E": 20})
    cores = {"I": "2F5597", "II": "ED7D31", "III": "70AD47"}
    inicio_de = {}
    r = 1
    for anexo in dados["anexos"]:
        t.merge_cells(f"A{r}:E{r}")
        t[f"A{r}"] = f"Anexo {anexo['id']} — {anexo['nome']}"
        t[f"A{r}"].font = Fonte(bold=True, color="FFFFFF", size=12)
        t[f"A{r}"].fill = preenche(cores[anexo["id"]])
        r += 1
        for col, txt in zip("ABCDE", ["Receita bruta em 12 meses: de (R$)", "até (R$)", "Faixa", "Alíquota nominal", "Parcela a deduzir (R$)"]):
            t[f"{col}{r}"] = txt
            t[f"{col}{r}"].font = Fonte(bold=True)
            t[f"{col}{r}"].fill = preenche(CINZA)
            t[f"{col}{r}"].alignment = Alignment(wrap_text=True, horizontal="center", vertical="center")
        t.row_dimensions[r].height = 32
        r += 1
        inicio_de[anexo["id"]] = r
        anterior = 0.0
        for i, f in enumerate(anexo["faixas"], start=1):
            t[f"A{r}"] = 0 if i == 1 else round(anterior + 0.01, 2)
            t[f"B{r}"] = f["ate"]
            t[f"C{r}"] = f"{i}ª faixa"
            t[f"D{r}"] = f["aliquota"] / 100
            t[f"E{r}"] = f["deduzir"]
            t[f"A{r}"].number_format = t[f"B{r}"].number_format = t[f"E{r}"].number_format = MOEDA
            t[f"D{r}"].number_format = "0.00%"
            t[f"C{r}"].alignment = Alignment(horizontal="center")
            for col in "ABCDE":
                t[f"{col}{r}"].fill = preenche("F2F2F2" if i % 2 else "FFFFFF")
            anterior = f["ate"]
            r += 1
        r += 1

    c = wb.create_sheet("Consulta Imposto Simples")
    c.sheet_view.zoomScale = 100
    titulos_colunas(c, {"A": 44, "B": 24})
    entradas = [("A1", "Receita bruta do mês (RBM)", "B1", dados["rbm"]), ("A2", "Receita dos últimos 12 meses (RBT12)", "B2", dados["rbt12"])]
    for ra, txt, rb, valor in entradas:
        c[ra] = txt
        c[ra].font = Fonte(bold=True)
        c[rb] = valor
        c[rb].number_format = MOEDA
        c[rb].fill = preenche(ROXO_CLARO)
        c[ra].fill = preenche(ROXO)
    cab = ["Anexo", "Faixa (nº)", "Alíquota nominal", "Parcela a deduzir (R$)", "Alíquota efetiva", "Imposto do mês (R$)", "Confere?"]
    c.column_dimensions["B"].width = 26
    c.column_dimensions["C"].width = 18
    c.column_dimensions["D"].width = 22
    c.column_dimensions["E"].width = 18
    c.column_dimensions["F"].width = 22
    c.column_dimensions["G"].width = 12
    c.column_dimensions["H"].width = 2
    for col, txt in zip("ABCDEFG", cab):
        cel = c[f"{col}4"]
        cel.value = txt
        cel.font = Fonte(bold=True, color="FFFFFF")
        cel.fill = preenche("217346")
        cel.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    c.row_dimensions[4].height = 32
    for k, anexo in enumerate(dados["anexos"]):
        r = 5 + k
        ini = inicio_de[anexo["id"]]
        fim = ini + 5
        tab = f"Tabelas!$A${ini}:$E${fim}"
        c[f"A{r}"] = f"Anexo {anexo['id']} — {anexo['nome']}"
        c[f"A{r}"].font = Fonte(bold=True)
        esperado = dados["esperado"][anexo["id"]]
        formulas = {
            "B": f"=MATCH($B$2,Tabelas!$A${ini}:$A${fim},1)",
            "C": f"=VLOOKUP($B$2,{tab},4,TRUE)",
            "D": f"=VLOOKUP($B$2,{tab},5,TRUE)",
            "E": f"=($B$2*C{r}-D{r})/$B$2",
            "F": f"=$B$1*E{r}",
        }
        for col in "BCDEF":
            cel = c[f"{col}{r}"]
            cel.fill = preenche(AMARELO)
            cel.alignment = Alignment(horizontal="center")
            if gabarito:
                cel.value = formulas[col]
        c[f"C{r}"].number_format = "0.00%"
        c[f"D{r}"].number_format = MOEDA
        c[f"E{r}"].number_format = "0.0000%"
        c[f"F{r}"].number_format = MOEDA
        c[f"G{r}"] = (
            f'=IF($B$2<>{dados["rbt12"]},"—",IF(OR(B{r}="",C{r}="",D{r}="",E{r}="",F{r}=""),"",'
            f'IF(AND(B{r}={esperado["faixa"]},ROUND(C{r},4)={esperado["nominal"]},ROUND(D{r},2)={esperado["deduzir"]},ROUND(E{r},6)={esperado["efetiva"]},ROUND(F{r},2)={esperado["imposto"]}),"OK","Errado")))'
        )
        c[f"G{r}"].alignment = Alignment(horizontal="center")
    semaforo(c, "G5:G7")
    c["A9"] = "Menor imposto do mês"
    c["A9"].font = Fonte(bold=True)
    c["B9"] = "=MIN(F5:F7)" if gabarito else None
    c["A10"] = "Anexo do menor imposto"
    c["A10"].font = Fonte(bold=True)
    c["B10"] = '=INDEX(A5:A7,MATCH(B9,F5:F7,0))' if gabarito else None
    for ref in ("B9", "B10"):
        c[ref].fill = preenche(AMARELO)
        c[ref].alignment = Alignment(horizontal="center")
    c["B9"].number_format = MOEDA
    c["G9"] = f'=IF($B$2<>{dados["rbt12"]},"—",IF(B9="","",IF(ROUND(B9,2)={dados["esperado"]["menor"]},"OK","Errado")))'
    c["G10"] = f'=IF($B$2<>{dados["rbt12"]},"—",IF(B10="","",IF(ISNUMBER(SEARCH("Anexo {dados["esperado"]["menorAnexo"]} ",B10&" ")),"OK","Errado")))'
    for ref in ("G9", "G10"):
        c[ref].alignment = Alignment(horizontal="center")
    semaforo(c, "G9:G10")
    c["A12"] = "Simulação: troque a RBT12 (B2) por outro valor e veja a faixa e a alíquota efetiva mudarem."
    c["A12"].font = Fonte(italic=True, color="595959")
    dv = DataValidation(type="decimal", operator="between", formula1="0", formula2="4800000", showErrorMessage=True)
    dv.errorTitle, dv.error = "Fora do Simples", "O Simples Nacional vai até R$ 4.800.000,00 de receita bruta em 12 meses."
    c.add_data_validation(dv)
    dv.add("B2")
    return wb


# ---------------------------------------------------------------- gerar

def gerar(dados):
    dados = dict(dados)
    saida = pasta(AREA)
    gab = os.environ.get("GABARITO_DIR")
    gab_dir = Path(gab) if gab else None
    if gab_dir:
        gab_dir.mkdir(parents=True, exist_ok=True)
    arquivos = {
        "plano-de-contas-para-classificar.xlsx": lambda g: plano_para_classificar(dados, g),
        "walking-pet-aula-14-para-lancar.xlsx": lambda g: contabilidade(dados, 14, g),
        "walking-pet-aula-15-para-lancar.xlsx": lambda g: contabilidade(dados, 15, g),
        "walking-pet-balanco-e-dre-para-montar.xlsx": lambda g: balanco_e_dre(dados, g),
        "banho-e-tosa-aula-16-para-lancar.xlsx": lambda g: contabilidade(dados, 16, g),
        "simples-nacional-para-calcular.xlsx": lambda g: simples(dados, g),
    }
    feitos = []
    for nome, montar in arquivos.items():
        montar(False).save(saida / nome)
        feitos.append(str(saida / nome))
        if gab_dir:
            montar(True).save(gab_dir / nome)
    return feitos
