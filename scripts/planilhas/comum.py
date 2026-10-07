"""Estilos e utilitários comuns às planilhas das atividades (ver gerar.py)."""
from datetime import datetime
from pathlib import Path

from openpyxl.styles import Alignment, Font, PatternFill, Protection

PUBLICO = Path(__file__).resolve().parents[2] / "public" / "atividades"

TITULO = Font(bold=True, color="FFFFFF")
FUNDO_TITULO = PatternFill("solid", fgColor="217346")
FORMULA = PatternFill("solid", fgColor="E5E7EB")
VERMELHO = PatternFill("solid", fgColor="FECACA")
VERDE = PatternFill("solid", fgColor="BBF7D0")
FONTE_VERMELHA = Font(color="991B1B", bold=True)
MOEDA = '"R$" #,##0.00'
DATA = "DD/MM/YYYY"
PORCENTO = "0.0%"
LIVRE = Protection(locked=False)


def pasta(area):
    p = PUBLICO / area
    p.mkdir(parents=True, exist_ok=True)
    return p


def data(texto):
    return datetime.strptime(texto, "%d/%m/%Y")


def cabecalho(ws, nomes, larguras, linha=1):
    for i, (nome, largura) in enumerate(zip(nomes, larguras), start=1):
        c = ws.cell(row=linha, column=i, value=nome)
        c.font, c.fill, c.alignment = TITULO, FUNDO_TITULO, Alignment(vertical="center", wrap_text=True)
        ws.column_dimensions[c.column_letter].width = largura
    ws.freeze_panes = ws.cell(row=linha + 1, column=1).coordinate


def titulo_extra(ws, coluna, nome, largura):
    c = ws.cell(row=1, column=coluna, value=nome)
    c.font, c.fill, c.alignment = TITULO, FUNDO_TITULO, Alignment(vertical="center", wrap_text=True)
    ws.column_dimensions[c.column_letter].width = largura


def leia_me(wb, linhas):
    ws = wb.active
    ws.title = "Leia-me"
    ws.column_dimensions["A"].width = 110
    for i, texto in enumerate(linhas, start=1):
        c = ws.cell(row=i, column=1, value=texto)
        c.alignment = Alignment(wrap_text=True, vertical="top")
        if i == 1:
            c.font = Font(bold=True, size=14)


def linhas(ws, valores, formatos=None, inicio=2):
    """Escreve as linhas a partir de `inicio`; `formatos` = {coluna: number_format}."""
    for r, linha in enumerate(valores, start=inicio):
        for col, v in enumerate(linha, start=1):
            c = ws.cell(row=r, column=col, value=v)
            if formatos and col in formatos and v is not None:
                c.number_format = formatos[col]


def formula(ws, linha, coluna, texto, formato=None):
    c = ws.cell(row=linha, column=coluna, value=texto)
    c.fill = FORMULA
    if formato:
        c.number_format = formato
    return c


def livres(ws, colunas, ate):
    for r in range(2, ate + 1):
        for col in colunas:
            ws.cell(row=r, column=col).protection = LIVRE
