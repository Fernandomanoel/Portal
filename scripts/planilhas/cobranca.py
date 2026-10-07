"""Planilhas das atividades de contas a receber (Crédito e Cobrança): para configurar e já configurada."""
from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Font

from comum import DATA, FONTE_VERMELHA, LIVRE, MOEDA, PORCENTO, VERMELHO, cabecalho, data, formula, leia_me, linhas, livres, pasta

P = "'Parâmetros'"
B = "Baixas"
COLS = ["Nota fiscal", "Cliente", "Emissão", "Vencimento", "Valor (R$)"]
LARG = [11, 28, 11, 12, 13]


def aba_parametros(wb, d, data_base, rotulo_base, extras=()):
    ws = wb.create_sheet("Parâmetros")
    ws.column_dimensions["A"].width = 42
    ws.column_dimensions["B"].width = 14
    p = d["parametros"]
    valores = [(rotulo_base, data(data_base), DATA), ("Multa por atraso", p["multa"] / 100, PORCENTO), ("Juros ao mês (pro rata dia)", p["juros"] / 100, PORCENTO), *extras]
    for r, (rotulo, valor, fmt) in enumerate(valores, start=1):
        ws.cell(row=r, column=1, value=rotulo).font = Font(bold=True)
        ws.cell(row=r, column=2, value=valor).number_format = fmt
    return ws


def aba_carteira(wb, titulos):
    ws = wb.create_sheet("Carteira")
    cabecalho(ws, COLS, LARG)
    linhas(ws, [[t["nf"], t["cliente"], data(t["emissao"]), data(t["vencimento"]), t["valor"]] for t in titulos], {3: DATA, 4: DATA, 5: MOEDA})
    return ws


def gerar(d):
    saida = pasta("credito-cobranca")
    p = d["parametros"]

    # --------------------------------------------------------------- 1) para configurar
    wb = Workbook()
    leia_me(wb, [
        "Contas a Receber — planilha para CONFIGURAR (posição de 01/09/2025)",
        "Esta planilha vem só com os títulos em aberto e os parâmetros de cobrança. Siga as etapas da atividade no portal:",
        "Etapa 1: confira as abas, transforme a Carteira em Tabela (Ctrl + T) e formate datas e valores.",
        "Etapa 2: em Carteira, crie F = Dias de atraso (data-base menos vencimento, nunca negativo) e G = Faixa (aging).",
        "Etapa 3: crie H = Multa, I = Juros e J = Valor atualizado, usando os parâmetros com referência absoluta ($).",
        "Etapa 4: monte a aba Resumo por faixa com SOMASES e CONT.SES.",
        "Etapa 5: Formatação Condicional para os títulos acima de 90 dias.",
        "Etapa 6: aba Consulta: digite o cliente em B2 e veja quanto ele deve (SOMASES).",
        "Etapa 7: proteja as fórmulas (Revisão > Proteger Planilha).",
        "Os clientes e valores são fictícios, feitos para o treino.",
    ])
    aba_parametros(wb, d, d["dataConfigurar"], "Data-base da posição")
    configurar = set(d["configurar"])
    aba_carteira(wb, [t for t in d["titulos"] if t["nf"] in configurar])
    ws = wb.create_sheet("Resumo")
    cabecalho(ws, ["Faixa", "Quantidade", "Valor original (R$)", "Valor atualizado (R$)"], [16, 12, 18, 20])
    for r, f in enumerate(["A vencer", "1 a 30", "31 a 60", "61 a 90", "Acima de 90", "Total"], start=2):
        ws.cell(row=r, column=1, value=f)
    ws = wb.create_sheet("Consulta")
    ws.column_dimensions["A"].width = 28
    ws.column_dimensions["B"].width = 30
    for r, rotulo in enumerate(["Cliente", "Títulos vencidos", "Valor original vencido (R$)", "Valor atualizado vencido (R$)"], start=2):
        ws.cell(row=r, column=1, value=rotulo).font = Font(bold=True)
    ws["B2"] = "Mercado Boa Compra"
    wb.save(saida / "cobranca-para-configurar.xlsx")

    # --------------------------------------------------------------- 2) já configurada
    wb = Workbook()
    leia_me(wb, [
        "Contas a Receber — planilha JÁ CONFIGURADA (fechamento de setembro/2025)",
        "Não altere as colunas cinza: são fórmulas e estão protegidas (proteção sem senha, apenas para evitar acidentes).",
        "1. A aba «Retorno do banco» traz os créditos de setembro, como vieram do arquivo do banco.",
        "2. Lance TODAS as linhas na aba Baixas, em ordem: Data do pagamento, Nota fiscal, Valor pago e Documento do banco.",
        "3. A coluna Situação classifica cada baixa: QUITADO, PARCIAL (falta saldo), NF NÃO ENCONTRADA, DUPLICADO (crédito repetido no arquivo)",
        "   ou JÁ QUITADO (o cliente pagou de novo: o valor vira crédito do cliente, a devolver).",
        "4. A Carteira mostra a situação de cada título no fechamento (30/09), o valor em aberto e quem deve ir para negativação.",
        "5. Use a aba Resumo (livre) para as suas somas: SOMASE, CONT.SE e SOMASES sobre Carteira e Baixas.",
        "Regras completas no briefing da atividade, no portal. Os clientes e valores são fictícios, feitos para o treino.",
    ])
    ws = aba_parametros(wb, d, d["dataFechamento"], "Data do fechamento", [("Tolerância de diferença a menor (R$)", p["tolerancia"], MOEDA), ("Dias de atraso para negativar", p["negativar"], "0")])
    ws.protection.sheet = True

    ws = aba_carteira(wb, d["titulos"])
    extras = [("Dias de atraso", 9), ("Faixa", 12), ("Valor atualizado (R$)", 15), ("Pago (R$)", 12), ("Situação", 12), ("Em aberto (R$)", 14), ("Cobrança", 12)]
    for col, (nome, larg) in enumerate(extras, start=6):
        c = ws.cell(row=1, column=col, value=nome)
        c.font, c.fill = ws["A1"].font.copy(), ws["A1"].fill.copy()
        ws.column_dimensions[c.column_letter].width = larg
    n = len(d["titulos"]) + 1
    for r in range(2, n + 1):
        conta = lambda sit: f'COUNTIFS({B}!$B:$B,$A{r},{B}!$I:$I,"{sit}")'
        formula(ws, r, 6, f"=MAX(0,{P}!$B$1-D{r})")
        formula(ws, r, 7, f'=IF(F{r}=0,"A vencer",IF(F{r}<=30,"1 a 30",IF(F{r}<=60,"31 a 60",IF(F{r}<=90,"61 a 90","Acima de 90"))))')
        formula(ws, r, 8, f"=IF(F{r}=0,E{r},E{r}*(1+{P}!$B$2)+E{r}*{P}!$B$3/30*F{r})", MOEDA)
        formula(ws, r, 9, f'=SUMIFS({B}!$C:$C,{B}!$B:$B,$A{r},{B}!$I:$I,"QUITADO")+SUMIFS({B}!$C:$C,{B}!$B:$B,$A{r},{B}!$I:$I,"PARCIAL")', MOEDA)
        formula(ws, r, 10, f'=IF({conta("QUITADO")}>0,"QUITADO",IF({conta("PARCIAL")}>0,"PARCIAL",IF(F{r}>0,"VENCIDO","A VENCER")))')
        formula(ws, r, 11, f'=IF(J{r}="QUITADO",0,IF(J{r}="PARCIAL",SUMIFS({B}!$H:$H,{B}!$B:$B,$A{r},{B}!$I:$I,"PARCIAL"),H{r}))', MOEDA)
        formula(ws, r, 12, f'=IF(AND(J{r}="VENCIDO",F{r}>{P}!$B$5),"NEGATIVAR","")')
    ws.conditional_formatting.add(f"L2:L{n}", FormulaRule(formula=['$L2="NEGATIVAR"'], fill=VERMELHO, font=FONTE_VERMELHA))
    ws.protection.sheet = True

    ws = wb.create_sheet("Retorno do banco")
    cabecalho(ws, ["Data do crédito", "Documento", "Nota fiscal informada", "Valor pago (R$)"], [14, 13, 20, 15])
    linhas(ws, [[data(x["data"]), x["documento"], x["nf"], x["valor"]] for x in d["pagamentos"]], {1: DATA, 4: MOEDA})

    ws = wb.create_sheet(B)
    cabecalho(ws, ["Data do pagamento", "Nota fiscal", "Valor pago (R$)", "Documento", "Cliente", "Vencimento", "Devido na data (R$)", "Saldo que falta (R$)", "Situação"],
              [14, 11, 14, 12, 28, 12, 16, 16, 20])
    LIN = 200
    livres(ws, range(1, 5), LIN)
    for r in range(2, LIN + 1):
        ws.cell(row=r, column=1).number_format = DATA
        ws.cell(row=r, column=3).number_format = MOEDA
        valor = f"VLOOKUP(B{r},Carteira!$A:$E,5,FALSE)"
        formula(ws, r, 5, f'=IF(B{r}="","",IFERROR(VLOOKUP(B{r},Carteira!$A:$E,2,FALSE),"NF NÃO ENCONTRADA"))')
        formula(ws, r, 6, f'=IF(OR(B{r}="",E{r}="NF NÃO ENCONTRADA"),"",VLOOKUP(B{r},Carteira!$A:$E,4,FALSE))', DATA)
        formula(ws, r, 7, f'=IF(F{r}="",0,IF(A{r}>F{r},{valor}*(1+{P}!$B$2)+{valor}*{P}!$B$3/30*(A{r}-F{r}),{valor}))', MOEDA)
        formula(ws, r, 8, f'=IF(I{r}="PARCIAL",G{r}-C{r},0)', MOEDA)
        formula(ws, r, 9, (f'=IF(B{r}="","",IF(E{r}="NF NÃO ENCONTRADA","NF NÃO ENCONTRADA",IF(COUNTIF(D$2:D{r},D{r})>1,"DUPLICADO",'
                           f'IF(COUNTIFS(B$1:B{r - 1},B{r},I$1:I{r - 1},"QUITADO")>0,"JÁ QUITADO",IF(C{r}>=G{r}-{P}!$B$4,"QUITADO","PARCIAL")))))'))
    ws.conditional_formatting.add(f"I2:I{LIN}", FormulaRule(formula=['AND($I2<>"",$I2<>"QUITADO",$I2<>"PARCIAL")'], fill=VERMELHO, font=FONTE_VERMELHA))
    ws.protection.sheet = True

    ws = wb.create_sheet("Resumo")
    ws.column_dimensions["A"].width = 46
    ws.column_dimensions["B"].width = 18
    ws["A1"] = "Aba livre para os seus cálculos de fechamento"
    ws["A1"].font = Font(bold=True)
    for r, rotulo in enumerate(["Total recebido e baixado (QUITADO + PARCIAL)", "Saldo que falta nos pagamentos parciais", "Créditos de clientes a devolver (JÁ QUITADO)",
                                "Títulos vencidos sem pagamento", "Valor atualizado dos vencidos sem pagamento", "Títulos para negativar", "Total em aberto na carteira"], start=3):
        ws.cell(row=r, column=1, value=rotulo)
        ws.cell(row=r, column=2).protection = LIVRE
    wb.save(saida / "cobranca-configurada-setembro.xlsx")
    return [saida / "cobranca-para-configurar.xlsx", saida / "cobranca-configurada-setembro.xlsx"]
