"""Planilhas das atividades de folha de pagamento (Departamento Pessoal): para configurar e já configurada."""
from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Font
from openpyxl.worksheet.datavalidation import DataValidation

from comum import DATA, FONTE_VERMELHA, LIVRE, MOEDA, PORCENTO, VERDE, VERMELHO, cabecalho, data, formula, leia_me, linhas, livres, pasta

T = "Tabelas"
L = "'Lançamentos'"


def aba_cadastro(wb, d):
    ws = wb.create_sheet("Cadastro")
    cabecalho(ws, ["Matrícula", "Nome", "Cargo", "Setor", "Admissão", "Salário (R$)", "Dependentes", "VT — custo mensal (R$)"], [10, 24, 24, 15, 11, 13, 12, 14])
    linhas(ws, [[f["matricula"], f["nome"], f["cargo"], f["setor"], data(f["admissao"]), f["salario"], f["dependentes"], f["valeTransporte"]] for f in d["funcionarios"]], {5: DATA, 6: MOEDA, 8: MOEDA})
    return ws


def aba_tabelas(wb, d):
    ws = wb.create_sheet(T)
    for col, larg in zip("ABCDEF", [20, 12, 16, 3, 30, 12]):
        ws.column_dimensions[col].width = larg
    ws["A1"] = "Tabela do INSS — setembro/2025 (progressiva)"
    ws["A9"] = "Tabela do IRRF — a partir de maio/2025"
    ws["E1"] = "Parâmetros da empresa e da lei"
    for c in ("A1", "A9", "E1"):
        ws[c].font = Font(bold=True)
    for col, t in zip("AB", ["Salário até (R$)", "Alíquota"]):
        ws[f"{col}2"] = t
    for r, f in enumerate(d["faixasInss"], start=3):
        ws.cell(row=r, column=1, value=f["ate"]).number_format = MOEDA
        ws.cell(row=r, column=2, value=f["aliquota"] / 100).number_format = PORCENTO
    for col, t in zip("ABC", ["Base a partir de (R$)", "Alíquota", "Parcela a deduzir (R$)"]):
        ws[f"{col}10"] = t
    for r, f in enumerate(d["faixasIrrf"], start=11):
        ws.cell(row=r, column=1, value=f["de"]).number_format = MOEDA
        ws.cell(row=r, column=2, value=f["aliquota"] / 100).number_format = PORCENTO
        ws.cell(row=r, column=3, value=f["deducao"]).number_format = MOEDA
    p = d["parametros"]
    params = [
        ("Dedução por dependente (IR)", p["dependente"], MOEDA),
        ("Desconto simplificado mensal (IR)", p["simplificado"], MOEDA),
        ("Divisor de horas do mês", p["divisor"], None),
        ("Dias úteis do mês (seg. a sáb.)", p["diasUteis"], None),
        ("Domingos e feriados do mês", p["domingos"], None),
        ("FGTS (depósito da empresa)", p["fgts"] / 100, PORCENTO),
        ("Desconto máximo de VT", p["vt"] / 100, PORCENTO),
        ("Limite de hora extra por dia (h)", p["limite"], None),
    ]
    ws["E2"], ws["F2"] = "Parâmetro", "Valor"
    for r, (nome, valor, fmt) in enumerate(params, start=3):
        ws.cell(row=r, column=5, value=nome)
        c = ws.cell(row=r, column=6, value=valor)
        if fmt:
            c.number_format = fmt
    ws.protection.sheet = True
    return ws


def inss(celula):
    return (f"ROUND(MIN({celula},{T}!$A$3)*{T}!$B$3+MAX(0,MIN({celula},{T}!$A$4)-{T}!$A$3)*{T}!$B$4"
            f"+MAX(0,MIN({celula},{T}!$A$5)-{T}!$A$4)*{T}!$B$5+MAX(0,MIN({celula},{T}!$A$6)-{T}!$A$5)*{T}!$B$6,2)")


def irrf(celula):
    return f"ROUND(MAX(0,{celula}*VLOOKUP({celula},{T}!$A$11:$C$15,2,TRUE)-VLOOKUP({celula},{T}!$A$11:$C$15,3,TRUE)),2)"


def gerar(d):
    saida = pasta("departamento-pessoal")
    n = len(d["funcionarios"]) + 1

    # --------------------------------------------------------------- 1) para configurar
    wb = Workbook()
    leia_me(wb, [
        "Folha de Pagamento — planilha para CONFIGURAR (setembro/2025)",
        "Esta planilha vem com o cadastro dos 40 funcionários e as tabelas oficiais. Siga as etapas da atividade no portal:",
        "Etapa 1: confira as abas Cadastro e Tabelas e transforme o Cadastro em Tabela (Ctrl + T).",
        "Etapa 2: em Cadastro, crie I = INSS (tabela progressiva, faixa por faixa, com ARRED).",
        "Etapa 3: crie J = Dedução do IR (a maior entre INSS + dependentes e o desconto simplificado), K = Base do IR e L = IRRF (PROCV aproximado).",
        "Etapa 4: crie M = Vale-transporte (6% do salário, limitado ao custo), N = Salário líquido e O = FGTS.",
        "Etapa 5: Validação de Dados em Dependentes (número inteiro de 0 a 10) e em Setor (lista).",
        "Etapa 6: Formatação Condicional para destacar quem tem IRRF a recolher.",
        "Etapa 7: aba Holerite com PROCV pela matrícula digitada em B2.",
        "Etapa 8: proteja as fórmulas (Revisão > Proteger Planilha).",
        "As tabelas de INSS e IRRF são as de setembro/2025. Os funcionários são fictícios, feitos para o treino.",
    ])
    aba_cadastro(wb, d)
    aba_tabelas(wb, d).protection.sheet = False
    ws = wb.create_sheet("Holerite")
    ws.column_dimensions["A"].width = 24
    ws.column_dimensions["B"].width = 26
    for r, rotulo in enumerate(["Matrícula", "Nome", "Cargo", "Salário", "INSS", "IRRF", "Vale-transporte", "Salário líquido", "FGTS do mês"], start=2):
        ws.cell(row=r, column=1, value=rotulo).font = Font(bold=True)
    ws["B2"] = "F-101"
    wb.save(saida / "folha-para-configurar.xlsx")

    # --------------------------------------------------------------- 2) já configurada
    wb = Workbook()
    leia_me(wb, [
        "Folha de Pagamento — planilha JÁ CONFIGURADA (setembro/2025)",
        "Não altere as colunas cinza: são fórmulas e estão protegidas (proteção sem senha, apenas para evitar acidentes).",
        "1. Leia as ocorrências na aba «Ocorrências de setembro» (cartão de ponto, faltas, vales), em ordem de data.",
        "2. Lance na aba Lançamentos as colunas brancas: Data, Matrícula, Tipo (escolha na lista) e Quantidade.",
        "   Quantidade: horas em decimal para HE e Atraso (1,5 = 1h30), dias para Falta, reais para Adiantamento.",
        "3. Olhe a coluna Alerta: CORRIGIR MATRÍCULA ou DUPLICADO = apague a linha e registre; LIMITE 2H = pague e peça justificativa ao gestor;",
        "   CONFERIR ATESTADO = veja a observação: falta com atestado médico NÃO é descontada (apague a linha).",
        "4. A aba Folha calcula sozinha horas extras, DSR, descontos, INSS, IRRF, VT, líquido e FGTS. A aba Holerite mostra um funcionário.",
        "Regras completas no briefing da atividade, no portal. Os funcionários são fictícios, feitos para o treino.",
    ])
    aba_cadastro(wb, d).protection.sheet = True
    aba_tabelas(wb, d)

    ws = wb.create_sheet("Ocorrências de setembro")
    cabecalho(ws, ["Data", "Matrícula", "Tipo", "Quantidade", "Observação"], [12, 11, 14, 12, 40])
    linhas(ws, [[data(o["data"]), o["matricula"], o["tipo"], o["quantidade"], o["obs"]] for o in d["ocorrencias"]], {1: DATA})

    ws = wb.create_sheet("Lançamentos")
    cabecalho(ws, ["Data", "Matrícula", "Tipo", "Quantidade", "Nome", "Valor (R$)", "Alerta"], [12, 11, 14, 12, 26, 13, 26])
    LIN = 300
    livres(ws, range(1, 5), LIN)
    sal = lambda r: f"IFERROR(VLOOKUP(B{r},Cadastro!$A:$F,6,FALSE),0)"
    for r in range(2, LIN + 1):
        ws.cell(row=r, column=1).number_format = DATA
        formula(ws, r, 5, f'=IF(B{r}="","",IFERROR(VLOOKUP(B{r},Cadastro!$A:$H,2,FALSE),"MATRÍCULA NÃO ENCONTRADA"))')
        formula(ws, r, 6, (f'=IF(B{r}="","",IF(C{r}="HE 50%",D{r}*{sal(r)}/{T}!$F$5*1.5,IF(C{r}="HE 100%",D{r}*{sal(r)}/{T}!$F$5*2,'
                           f'IF(C{r}="Falta",-D{r}*{sal(r)}/30,IF(C{r}="Atraso",-D{r}*{sal(r)}/{T}!$F$5,IF(C{r}="Adiantamento",-D{r},0))))))'), MOEDA)
        formula(ws, r, 7, (f'=IF(B{r}="","",IF(E{r}="MATRÍCULA NÃO ENCONTRADA","CORRIGIR MATRÍCULA",IF(COUNTIFS(A$2:A{r},A{r},B$2:B{r},B{r},C$2:C{r},C{r})>1,"DUPLICADO",'
                           f'IF(AND(C{r}="HE 50%",D{r}>{T}!$F$10),"LIMITE 2H — JUSTIFICAR",IF(C{r}="Falta","CONFERIR ATESTADO","OK")))))'))
    lista = DataValidation(type="list", formula1='"' + ",".join(d["tipos"]) + '"', allow_blank=True, showErrorMessage=True, errorTitle="Tipo inválido", error="Escolha um tipo da lista.")
    ws.add_data_validation(lista)
    lista.add(f"C2:C{LIN}")
    ws.conditional_formatting.add(f"G2:G{LIN}", FormulaRule(formula=['AND($G2<>"",$G2<>"OK")'], fill=VERMELHO, font=FONTE_VERMELHA))
    ws.protection.sheet = True

    ws = wb.create_sheet("Folha")
    cabecalho(ws, ["Matrícula", "Nome", "Salário (R$)", "HE 50% (h)", "HE 100% (h)", "Faltas (dias)", "Atrasos (h)", "Adiantamento (R$)",
                   "Horas extras (R$)", "DSR s/ HE (R$)", "Faltas e atrasos (R$)", "Salário bruto (R$)", "INSS (R$)", "Base do IR (R$)",
                   "IRRF (R$)", "VT (R$)", "Líquido (R$)", "FGTS (R$)"], [10, 24, 12, 9, 9, 9, 9, 13, 13, 12, 13, 14, 11, 13, 11, 10, 13, 11])
    soma = lambda r, tipo, col="D": f'SUMIFS({L}!${col}:${col},{L}!$B:$B,$A{r},{L}!$C:$C,"{tipo}")'
    for r in range(2, n + 1):
        formula(ws, r, 1, f"=Cadastro!A{r}")
        formula(ws, r, 2, f"=Cadastro!B{r}")
        formula(ws, r, 3, f"=Cadastro!F{r}", MOEDA)
        formula(ws, r, 4, "=" + soma(r, "HE 50%"))
        formula(ws, r, 5, "=" + soma(r, "HE 100%"))
        formula(ws, r, 6, "=" + soma(r, "Falta"))
        formula(ws, r, 7, "=" + soma(r, "Atraso"))
        formula(ws, r, 8, "=" + soma(r, "Adiantamento"), MOEDA)
        formula(ws, r, 9, f"=D{r}*C{r}/{T}!$F$5*1.5+E{r}*C{r}/{T}!$F$5*2", MOEDA)
        formula(ws, r, 10, f"=I{r}*{T}!$F$7/{T}!$F$6", MOEDA)
        formula(ws, r, 11, f"=F{r}*C{r}/30+G{r}*C{r}/{T}!$F$5", MOEDA)
        formula(ws, r, 12, f"=C{r}+I{r}+J{r}-K{r}", MOEDA)
        formula(ws, r, 13, "=" + inss(f"L{r}"), MOEDA)
        formula(ws, r, 14, f"=MAX(0,L{r}-MAX(M{r}+Cadastro!G{r}*{T}!$F$3,{T}!$F$4))", MOEDA)
        formula(ws, r, 15, "=" + irrf(f"N{r}"), MOEDA)
        formula(ws, r, 16, f"=IF(Cadastro!H{r}>0,ROUND(MIN(C{r}*{T}!$F$9,Cadastro!H{r}),2),0)", MOEDA)
        formula(ws, r, 17, f"=L{r}-M{r}-O{r}-P{r}-H{r}", MOEDA)
        formula(ws, r, 18, f"=ROUND(L{r}*{T}!$F$8,2)", MOEDA)
    total = n + 2
    ws.cell(row=total, column=2, value="TOTAL").font = Font(bold=True)
    for col in range(3, 19):
        letra = ws.cell(row=1, column=col).column_letter
        formula(ws, total, col, f"=SUM({letra}2:{letra}{n})", MOEDA if col >= 8 or col == 3 else None).font = Font(bold=True)
    ws.conditional_formatting.add(f"O2:O{n}", FormulaRule(formula=["$O2>0"], fill=VERDE))
    ws.protection.sheet = True

    ws = wb.create_sheet("Holerite")
    ws.column_dimensions["A"].width = 24
    ws.column_dimensions["B"].width = 28
    ws["A1"] = "Digite a matrícula em B2"
    ws["A1"].font = Font(bold=True)
    ws.cell(row=2, column=1, value="Matrícula").font = Font(bold=True)
    campos = [("Nome", 2), ("Salário", 3), ("Horas extras + DSR", None), ("Faltas e atrasos", 11), ("Salário bruto", 12), ("INSS", 13),
              ("IRRF", 15), ("Vale-transporte", 16), ("Adiantamento", 8), ("Salário líquido", 17), ("FGTS do mês", 18)]
    for r, (rotulo, coluna) in enumerate(campos, start=3):
        ws.cell(row=r, column=1, value=rotulo).font = Font(bold=True)
        busca = lambda c: f"VLOOKUP($B$2,Folha!$A:$R,{c},FALSE)"
        texto = f'=IFERROR({busca(9)}+{busca(10)},"MATRÍCULA NÃO ENCONTRADA")' if coluna is None else f'=IFERROR({busca(coluna)},"MATRÍCULA NÃO ENCONTRADA")'
        formula(ws, r, 2, texto, None if coluna == 2 else MOEDA)
    ws["B2"] = d["funcionarios"][0]["matricula"]
    ws["B2"].protection = LIVRE
    ws.protection.sheet = True
    wb.save(saida / "folha-configurada-setembro.xlsx")
    return [saida / "folha-para-configurar.xlsx", saida / "folha-configurada-setembro.xlsx"]
