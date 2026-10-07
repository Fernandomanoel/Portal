"""Gera as planilhas das atividades de estoque em public/atividades/compras-estoque/.

Uso: npm run planilhas  (exporta os dados com o Node e chama este script; precisa de openpyxl).
As fórmulas são gravadas em inglês, que é como o arquivo .xlsx guarda: o Excel em português
mostra PROCV, SOMASES, SE etc.
"""
import json
import sys
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Font, PatternFill, Protection
from openpyxl.worksheet.datavalidation import DataValidation

dados = json.load(open(sys.argv[1], encoding="utf-8"))
SAIDA = Path(__file__).resolve().parents[2] / "public" / "atividades" / "compras-estoque"
SAIDA.mkdir(parents=True, exist_ok=True)

TITULO = Font(bold=True, color="FFFFFF")
FUNDO_TITULO = PatternFill("solid", fgColor="217346")
FORMULA = PatternFill("solid", fgColor="E5E7EB")
VERMELHO = PatternFill("solid", fgColor="FECACA")
MOEDA = '"R$" #,##0.00'


def cabecalho(ws, nomes, larguras):
    for i, (nome, largura) in enumerate(zip(nomes, larguras), start=1):
        c = ws.cell(row=1, column=i, value=nome)
        c.font, c.fill, c.alignment = TITULO, FUNDO_TITULO, Alignment(vertical="center")
        ws.column_dimensions[c.column_letter].width = largura
    ws.freeze_panes = "A2"


def leia_me(wb, linhas):
    ws = wb.active
    ws.title = "Leia-me"
    ws.column_dimensions["A"].width = 110
    for i, texto in enumerate(linhas, start=1):
        c = ws.cell(row=i, column=1, value=texto)
        c.alignment = Alignment(wrap_text=True, vertical="top")
        if i == 1:
            c.font = Font(bold=True, size=14)


def aba_cadastro(wb):
    ws = wb.create_sheet("Cadastro")
    cabecalho(ws, ["Código", "Descrição", "Grupo", "Unidade", "Saldo", "Mínimo", "Custo (R$)", "Preço (R$)"], [10, 30, 14, 9, 8, 9, 12, 12])
    for r, c in enumerate(dados["cadastro"], start=2):
        for col, v in enumerate([c["codigo"], c["descricao"], c["grupo"], c["unidade"], c["saldoInicial"], c["minimo"], c["custo"], c["preco"]], start=1):
            ws.cell(row=r, column=col, value=v)
        ws.cell(row=r, column=7).number_format = MOEDA
        ws.cell(row=r, column=8).number_format = MOEDA
    return ws


def linha_mov(m):
    return [m["data"], m["documento"], m["codigo"], m["tipo"], m["quantidade"], m["desconto"], m["custoNf"] if m["custoNf"] != "" else None]


COLS_MOV = ["Data", "Documento", "Código", "Tipo", "Qtd", "Desconto %", "Custo NF (R$)"]
LARG_MOV = [12, 12, 10, 12, 7, 11, 13]

# --------------------------------------------------------------- 1) para configurar
wb = Workbook()
leia_me(wb, [
    "Controle de Estoque — planilha para CONFIGURAR",
    "Esta planilha vem só com os dados. Siga as etapas da atividade no portal para configurá-la:",
    "Etapa 1: transforme o Cadastro em Tabela (Ctrl + T) e confira o congelamento da linha de títulos.",
    "Etapa 2: crie em Cadastro as colunas I = Valor em estoque (saldo × custo) e J = Situação (REPOR quando saldo <= mínimo).",
    "Etapa 3: na aba Movimentos, aplique Validação de Dados (Lista) na coluna Tipo.",
    "Etapa 4: aplique Formatação Condicional na coluna Situação (REPOR em vermelho).",
    "Etapa 5: na aba Consulta, use PROCV para trazer os dados do código digitado em B2.",
    "Etapa 6: em Cadastro, crie a coluna Saldo atual com SOMASES sobre a aba Movimentos.",
    "Etapa 7: proteja as fórmulas (Revisão > Proteger Planilha), deixando livres só as células de digitação.",
    "Os dados são fictícios, feitos para o treino.",
])
aba_cadastro(wb)
ws = wb.create_sheet("Movimentos")
cabecalho(ws, COLS_MOV, LARG_MOV)
for r, m in enumerate(dados["amostra"], start=2):
    for col, v in enumerate(linha_mov(m), start=1):
        ws.cell(row=r, column=col, value=v)
ws = wb.create_sheet("Consulta")
ws.column_dimensions["A"].width = 18
ws.column_dimensions["B"].width = 32
for r, rotulo in enumerate(["Código", "Descrição", "Saldo", "Custo (R$)", "Preço (R$)"], start=2):
    ws.cell(row=r, column=1, value=rotulo).font = Font(bold=True)
ws["B2"] = "EST-002"
wb.save(SAIDA / "estoque-para-configurar.xlsx")

# --------------------------------------------------------------- 2) já configurada
wb = Workbook()
leia_me(wb, [
    "Controle de Estoque — planilha JÁ CONFIGURADA (setembro)",
    "Não altere as colunas cinza: são fórmulas e estão protegidas (proteção sem senha, apenas para evitar acidentes).",
    "1. Leia os documentos na aba «Documentos de setembro», em ordem de data.",
    "2. Antes de cada saída ou baixa, digite o código em Consulta!B2 e confira o saldo daquele momento.",
    "3. Lance na aba Movimentos só o que as regras permitem: código existente, documento não repetido, saldo suficiente.",
    "4. As colunas Descrição, Preço, Valor líquido e Alerta se preenchem sozinhas. Alerta «CORRIGIR CÓDIGO» ou «DUPLICADO»: apague a linha e registre a ocorrência.",
    "5. No fim, o Cadastro mostra o Saldo atual, a Situação e o Valor em estoque de cada item.",
    "Regras completas no briefing da atividade, no portal. Os dados são fictícios, feitos para o treino.",
])
ws = aba_cadastro(wb)
for col, (nome, larg) in enumerate([("Saldo atual", 11), ("Situação", 10), ("Valor em estoque (R$)", 18)], start=9):
    c = ws.cell(row=1, column=col, value=nome)
    c.font, c.fill = TITULO, FUNDO_TITULO
    ws.column_dimensions[c.column_letter].width = larg
n = len(dados["cadastro"]) + 1
for r in range(2, n + 1):
    soma = lambda tipo: f'SUMIFS(Movimentos!$E:$E,Movimentos!$C:$C,$A{r},Movimentos!$D:$D,"{tipo}")'
    ws.cell(row=r, column=9, value=f"=E{r}+{soma('Entrada')}+{soma('Devolução')}-{soma('Saída')}-{soma('Baixa')}")
    ws.cell(row=r, column=10, value=f'=IF(I{r}<=F{r},"REPOR","OK")')
    ws.cell(row=r, column=11, value=f"=I{r}*G{r}").number_format = MOEDA
    for col in (9, 10, 11):
        ws.cell(row=r, column=col).fill = FORMULA
ws.conditional_formatting.add(f"J2:J{n}", FormulaRule(formula=['$J2="REPOR"'], fill=VERMELHO, font=Font(color="991B1B", bold=True)))
ws.protection.sheet = True

ws = wb.create_sheet("Documentos de setembro")
cabecalho(ws, COLS_MOV + ["Observação"], LARG_MOV + [24])
for r, m in enumerate(dados["movimentos"], start=2):
    for col, v in enumerate(linha_mov(m) + [m["obs"]], start=1):
        ws.cell(row=r, column=col, value=v)

ws = wb.create_sheet("Movimentos")
cabecalho(ws, COLS_MOV + ["Descrição", "Preço (R$)", "Valor líquido (R$)", "Alerta"], LARG_MOV + [28, 11, 16, 20])
LINHAS = 300
for r in range(2, LINHAS + 1):
    for col in range(1, 8):
        ws.cell(row=r, column=col).protection = Protection(locked=False)
    f = {
        8: f'=IF(C{r}="","",IFERROR(VLOOKUP(C{r},Cadastro!$A:$H,2,FALSE),"CÓDIGO NÃO ENCONTRADO"))',
        9: f'=IF(C{r}="","",IFERROR(VLOOKUP(C{r},Cadastro!$A:$H,8,FALSE),0))',
        10: f'=IF(D{r}="Saída",E{r}*I{r}*(1-F{r}/100),IF(D{r}="Devolução",-E{r}*I{r}*(1-F{r}/100),0))',
        11: f'=IF(C{r}="","",IF(H{r}="CÓDIGO NÃO ENCONTRADO","CORRIGIR CÓDIGO",IF(COUNTIFS(B$2:B{r},B{r},C$2:C{r},C{r},D$2:D{r},D{r})>1,"DUPLICADO",IF(AND(D{r}="Saída",F{r}>10),"APROVAR DESCONTO","OK"))))',
    }
    for col, formula in f.items():
        c = ws.cell(row=r, column=col, value=formula)
        c.fill = FORMULA
    ws.cell(row=r, column=9).number_format = MOEDA
    ws.cell(row=r, column=10).number_format = MOEDA
lista = DataValidation(type="list", formula1='"Entrada,Saída,Baixa,Devolução"', allow_blank=True, showErrorMessage=True, errorTitle="Tipo inválido", error="Escolha um tipo da lista.")
ws.add_data_validation(lista)
lista.add(f"D2:D{LINHAS}")
ws.conditional_formatting.add(f"K2:K{LINHAS}", FormulaRule(formula=['AND($K2<>"",$K2<>"OK")'], fill=VERMELHO, font=Font(color="991B1B", bold=True)))
ws.protection.sheet = True

ws = wb.create_sheet("Consulta")
ws.column_dimensions["A"].width = 18
ws.column_dimensions["B"].width = 32
ws["A1"] = "Digite o código em B2"
ws["A1"].font = Font(bold=True)
rotulos = [("Código", None), ("Descrição", 2), ("Saldo atual", 9), ("Mínimo", 6), ("Situação", 10), ("Custo (R$)", 7), ("Preço (R$)", 8)]
for r, (rotulo, coluna) in enumerate(rotulos, start=2):
    ws.cell(row=r, column=1, value=rotulo).font = Font(bold=True)
    if coluna:
        c = ws.cell(row=r, column=2, value=f'=IFERROR(VLOOKUP($B$2,Cadastro!$A:$K,{coluna},FALSE),"CÓDIGO NÃO ENCONTRADO")')
        c.fill = FORMULA
ws["B2"] = "EST-014"
ws["B2"].protection = Protection(locked=False)
ws.protection.sheet = True
wb.save(SAIDA / "estoque-configurado-setembro.xlsx")
print("planilhas geradas em", SAIDA)
