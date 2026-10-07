"""Planilhas das atividades de pedidos e comissões (Vendas): para configurar e já configurada."""
from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Font
from openpyxl.worksheet.datavalidation import DataValidation

from comum import DATA, FONTE_VERMELHA, MOEDA, PORCENTO, VERDE, VERMELHO, cabecalho, data, formula, leia_me, linhas, livres, pasta

L = "'Lançamentos'"


def aba_produtos(wb, d):
    ws = wb.create_sheet("Produtos")
    cabecalho(ws, ["Código", "Descrição", "Categoria", "Preço de tabela (R$)", "Desconto máximo"], [10, 32, 22, 18, 16])
    linhas(ws, [[p["codigo"], p["descricao"], p["categoria"], p["preco"], p["descontoMaximo"] / 100] for p in d["produtos"]], {4: MOEDA, 5: PORCENTO})
    return ws


def aba_regras(wb):
    ws = wb.create_sheet("Regras")
    ws.column_dimensions["A"].width = 26
    ws.column_dimensions["B"].width = 14
    ws["A1"] = "Comissão por atingimento da meta"
    ws["A1"].font = Font(bold=True)
    ws["A2"], ws["B2"] = "Atingimento a partir de", "Comissão"
    for r, (de, pct) in enumerate([(0, 0.02), (0.8, 0.03), (1, 0.05)], start=3):
        ws.cell(row=r, column=1, value=de).number_format = "0%"
        ws.cell(row=r, column=2, value=pct).number_format = PORCENTO
    ws["A7"] = "A comissão incide sobre o faturamento líquido (com desconto) dos itens com Alerta OK."
    return ws


def aba_vendedores(wb, d):
    ws = wb.create_sheet("Vendedores")
    cabecalho(ws, ["Código", "Vendedor", "Meta do mês (R$)"], [9, 20, 16])
    linhas(ws, [[v["codigo"], v["nome"], v["meta"]] for v in d["vendedores"]], {3: MOEDA})
    return ws


def gerar(d):
    saida = pasta("vendas")

    # --------------------------------------------------------------- 1) para configurar
    wb = Workbook()
    leia_me(wb, [
        "Pedidos e Comissões — planilha para CONFIGURAR (agosto/2025)",
        "Esta planilha vem com a tabela de preços, os vendedores, as regras de comissão e os pedidos de agosto. Siga as etapas da atividade no portal:",
        "Etapa 1: confira as abas e transforme Pedidos em Tabela (Ctrl + T).",
        "Etapa 2: em Pedidos, crie H = Descrição e I = Preço (PROCV pelo código), J = Valor bruto e K = Valor líquido.",
        "Etapa 3: crie L = Desconto máximo (PROCV) e M = Alerta (ACIMA DA ALÇADA quando o desconto passa do máximo).",
        "Etapa 4: em Vendedores, crie D = Faturamento (SOMASES só com Alerta OK), E = Atingimento, F = % de comissão (PROCV aproximado) e G = Comissão.",
        "Etapa 5: Formatação Condicional (meta batida em verde, alerta em vermelho) e Validação de Dados no código do vendedor.",
        "Etapa 6: ranking com ORDEM e proteção das fórmulas.",
        "Os produtos, preços e vendedores são fictícios, feitos para o treino.",
    ])
    aba_produtos(wb, d)
    aba_vendedores(wb, d)
    aba_regras(wb)
    ws = wb.create_sheet("Pedidos")
    cabecalho(ws, ["Pedido", "Data", "Vendedor", "Cliente", "Código", "Qtd", "Desconto %"], [10, 12, 10, 26, 10, 7, 11])
    linhas(ws, [[i["pedido"], data(i["data"]), i["vendedor"], i["cliente"], i["codigo"], i["quantidade"], i["desconto"]] for i in d["agosto"]], {2: DATA})
    wb.save(saida / "vendas-para-configurar.xlsx")

    # --------------------------------------------------------------- 2) já configurada
    wb = Workbook()
    leia_me(wb, [
        "Pedidos e Comissões — planilha JÁ CONFIGURADA (setembro/2025)",
        "Não altere as colunas cinza: são fórmulas e estão protegidas (proteção sem senha, apenas para evitar acidentes).",
        "1. A aba «Pedidos de setembro» traz o que veio do CRM e dos pedidos em papel, na ordem de chegada.",
        "2. Lance na aba Lançamentos cada item, menos os de pedido CANCELADO: Pedido, Data, Vendedor (lista), Código, Qtd, Desconto %",
        "   e, só quando a observação disser «Desconto aprovado pelo gerente», escolha «Gerente» na coluna Aprovação.",
        "3. A coluna Alerta mostra: CORRIGIR CÓDIGO, DUPLICADO, BLOQUEADO — SEM APROVAÇÃO ou OK. Só o que está OK entra no faturamento e na comissão.",
        "4. A aba Vendedores calcula sozinha faturamento, atingimento da meta, faixa e valor da comissão.",
        "Regras completas no briefing da atividade, no portal. Os produtos, preços e vendedores são fictícios, feitos para o treino.",
    ])
    aba_produtos(wb, d).protection.sheet = True
    ws = aba_vendedores(wb, d)
    for col, (nome, larg) in enumerate([("Faturamento (R$)", 16), ("Atingimento", 12), ("Comissão %", 11), ("Comissão (R$)", 14), ("Itens OK", 9), ("Ranking", 9)], start=4):
        c = ws.cell(row=1, column=col, value=nome)
        c.font, c.fill = ws["A1"].font.copy(), ws["A1"].fill.copy()
        ws.column_dimensions[c.column_letter].width = larg
    nv = len(d["vendedores"]) + 1
    for r in range(2, nv + 1):
        formula(ws, r, 4, f'=SUMIFS({L}!$J:$J,{L}!$C:$C,$A{r},{L}!$K:$K,"OK")', MOEDA)
        formula(ws, r, 5, f"=D{r}/C{r}", PORCENTO)
        formula(ws, r, 6, f"=VLOOKUP(E{r},Regras!$A$3:$B$5,2,TRUE)", PORCENTO)
        formula(ws, r, 7, f"=D{r}*F{r}", MOEDA)
        formula(ws, r, 8, f'=COUNTIFS({L}!$C:$C,$A{r},{L}!$K:$K,"OK")')
        formula(ws, r, 9, f"=RANK(D{r},$D$2:$D${nv})")
    ws.conditional_formatting.add(f"E2:E{nv}", FormulaRule(formula=["$E2>=1"], fill=VERDE))
    ws.protection.sheet = True
    aba_regras(wb).protection.sheet = True

    ws = wb.create_sheet("Pedidos de setembro")
    cabecalho(ws, ["Pedido", "Data", "Vendedor", "Cliente", "Código", "Qtd", "Desconto %", "Status", "Observação"], [10, 12, 10, 26, 10, 7, 11, 11, 32])
    linhas(ws, [[i["pedido"], data(i["data"]), i["vendedor"], i["cliente"], i["codigo"], i["quantidade"], i["desconto"], i["status"], i["obs"]] for i in d["setembro"]], {2: DATA})
    ws.conditional_formatting.add(f"A2:I{len(d['setembro']) + 1}", FormulaRule(formula=['$H2="Cancelado"'], font=Font(color="9CA3AF", strike=True)))

    ws = wb.create_sheet("Lançamentos")
    cabecalho(ws, ["Pedido", "Data", "Vendedor", "Código", "Qtd", "Desconto %", "Aprovação", "Descrição", "Preço (R$)", "Valor líquido (R$)", "Alerta"],
              [10, 12, 10, 10, 7, 11, 11, 30, 12, 16, 26])
    LIN = 300
    livres(ws, range(1, 8), LIN)
    for r in range(2, LIN + 1):
        ws.cell(row=r, column=2).number_format = DATA
        formula(ws, r, 8, f'=IF(D{r}="","",IFERROR(VLOOKUP(D{r},Produtos!$A:$E,2,FALSE),"CÓDIGO NÃO ENCONTRADO"))')
        formula(ws, r, 9, f'=IF(D{r}="","",IFERROR(VLOOKUP(D{r},Produtos!$A:$E,4,FALSE),0))', MOEDA)
        formula(ws, r, 10, f'=IF(D{r}="","",E{r}*I{r}*(1-F{r}/100))', MOEDA)
        formula(ws, r, 11, (f'=IF(D{r}="","",IF(H{r}="CÓDIGO NÃO ENCONTRADO","CORRIGIR CÓDIGO",IF(COUNTIFS(A$2:A{r},A{r},D$2:D{r},D{r})>1,"DUPLICADO",'
                            f'IF(AND(F{r}/100>VLOOKUP(D{r},Produtos!$A:$E,5,FALSE),G{r}<>"Gerente"),"BLOQUEADO — SEM APROVAÇÃO","OK"))))'))
    vend = DataValidation(type="list", formula1="=Vendedores!$A$2:$A$" + str(nv), allow_blank=True, showErrorMessage=True, errorTitle="Vendedor inválido", error="Escolha um código de vendedor da lista.")
    apr = DataValidation(type="list", formula1='"Gerente"', allow_blank=True, showErrorMessage=True, errorTitle="Aprovação", error="Deixe em branco ou escolha Gerente.")
    for dv, faixa in ((vend, f"C2:C{LIN}"), (apr, f"G2:G{LIN}")):
        ws.add_data_validation(dv)
        dv.add(faixa)
    ws.conditional_formatting.add(f"K2:K{LIN}", FormulaRule(formula=['AND($K2<>"",$K2<>"OK")'], fill=VERMELHO, font=FONTE_VERMELHA))
    ws.protection.sheet = True
    wb.save(saida / "vendas-configurada-setembro.xlsx")
    return [saida / "vendas-para-configurar.xlsx", saida / "vendas-configurada-setembro.xlsx"]
