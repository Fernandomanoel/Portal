"""Gera as planilhas .xlsx das atividades de planilha em public/atividades/<área>/.

Uso: npm run planilhas  (exporta os dados com o Node e chama este script; precisa de openpyxl).
As fórmulas são gravadas em inglês, que é como o arquivo .xlsx guarda: o Excel em português
mostra PROCV, SOMASES, SE etc. Depois de gerar, rode `python3 scripts/planilhas/conferir.py <json>`
para recalcular as planilhas configuradas no LibreOffice e comparar com os números das atividades.
"""
import json
import sys

import caixa
import cobranca
import estoque
import folha
import vendas

dados = json.load(open(sys.argv[1], encoding="utf-8"))
for modulo, chave in [(estoque, "estoque"), (folha, "folha"), (cobranca, "cobranca"), (caixa, "caixa"), (vendas, "vendas")]:
    for arquivo in modulo.gerar(dados[chave]):
        print("gerada:", arquivo)
