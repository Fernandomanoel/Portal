"""Gera as figuras (prints da própria planilha) das atividades de Contabilidade.

Cada figura é a planilha de verdade, no estado daquele passo (células preenchidas, linhas escondidas
para mostrar só o que importa) e com o anel laranja nas células onde o aluno mexe. O LibreOffice
(`soffice`) imprime a faixa em PDF, o `pdftoppm` vira PNG e o Pillow recorta.

Uso: python3 scripts/planilhas/prints_contabilidade.py <dados.json>   (o JSON vem de exportar.mjs)
Saída: src/assets/atividades/contabilidade/*.png
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from openpyxl.styles import Border, Side
from openpyxl.utils import range_boundaries
from openpyxl.worksheet.properties import PageSetupProperties
from PIL import Image, ImageChops

import contabilidade as ct

RAIZ = Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "src" / "assets" / "atividades" / "contabilidade"
LARANJA = Side(style="thick", color="FF7A00")


def anel(ws, intervalo):
    """Contorno laranja grosso em volta do intervalo (o «clique aqui» das atividades)."""
    c1, r1, c2, r2 = range_boundaries(intervalo)
    for r in range(r1, r2 + 1):
        for c in range(c1, c2 + 1):
            b = ws.cell(r, c).border
            ws.cell(r, c).border = Border(
                left=LARANJA if c == c1 else b.left,
                right=LARANJA if c == c2 else b.right,
                top=LARANJA if r == r1 else b.top,
                bottom=LARANJA if r == r2 else b.bottom,
            )


def lancar(ws, linha, l):
    ws[f"I{linha}"], ws[f"K{linha}"], ws[f"M{linha}"] = l["valor"], l["debito"], l["credito"]


def build(dados, quem):
    return {
        "plano": lambda g: ct.plano_para_classificar(dados, g),
        "a14": lambda g: ct.contabilidade(dados, 14, g),
        "a15": lambda g: ct.contabilidade(dados, 15, g),
        "a16": lambda g: ct.contabilidade(dados, 16, g),
        "bp": lambda g: ct.balanco_e_dre(dados, g),
        "simples": lambda g: ct.simples(dados, g),
    }[quem]


def figuras(d):
    plano = [tuple(p) for p in d["plano"]]
    L = {c: 3 + i for i, (c, _, _) in enumerate(plano)}
    a14, a15, a16 = d["aula14"], d["aula15"], d["aula16"]
    tipo = {c: t for c, _, t in plano}
    lista = []

    def f(nome, quem, aba, area, estado=None, aneis=(), linhas=None, cheio=False):
        lista.append(dict(nome=nome, quem=quem, aba=aba, area=area, estado=estado, aneis=aneis, linhas=linhas, cheio=cheio))

    def rows(*codes):
        return [1, 2] + [L[c] for c in codes]

    # ---- Plano de contas (Aula 13)
    f("plano-1-planilha", "plano", "Aula 13", "A1:H20", None, ["F3:F20"])

    def p2(ws):
        for c in ["1", "1.1", "1.1.1", "1.1.1.01", "1.1.1.02", "1.1.1.03", "1.1.2", "1.1.2.01"]:
            ws[f"F{L[c]}"] = tipo[c]
    f("plano-2-acerto", "plano", "Aula 13", "A1:H10", p2, ["F6:H6"])

    def p3(ws):
        for c, v in [("1", "S"), ("1.1", "S"), ("1.1.1", "A"), ("1.1.1.01", "A"), ("1.1.1.02", "S")]:
            ws[f"F{L[c]}"] = v
    f("plano-3-erro", "plano", "Aula 13", "A1:H8", p3, ["F5:H5", "F7:H7"])
    f("plano-4-cores", "plano", "Aula 13", "A36:H50")

    def p5(ws):
        for c in list(L)[:20]:
            ws[f"F{L[c]}"] = tipo[c]
    f("plano-5-placar", "plano", "Aula 13", "E1:M10", p5, ["L1:M8"])

    # ---- Aula 14
    f("a14-1-lancamentos", "a14", "Aula 14", "H1:N9", None, ["I3", "K3", "M3"])

    def s2(ws):
        lancar(ws, 3, a14[0])
    f("a14-2-primeiro", "a14", "Aula 14", "H1:N4", s2, ["I3:N3"])

    f("a14-3-saldo-estoque", "a14", "Aula 14", "E1:F40", s2, ["F" + str(L["1.1.3.02"]), "F" + str(L["2.1.1.01"])],
      rows("1", "1.1.3.02", "2", "2.1.1.01"))

    def s4(ws):
        for i in range(4):
            lancar(ws, 3 + i, a14[i])
    f("a14-4-venda", "a14", "Aula 14", "H1:N7", s4, ["I4:N5"])

    def s5(ws):
        lancar(ws, 3, a14[0])
        lancar(ws, 4, a14[1])
        l = a14[2]
        ws["I5"], ws["K5"], ws["M5"] = l["valor"], l["credito"], l["debito"]
    f("a14-4b-cartao", "a14", "Aula 14", "H1:N8", lambda ws: [lancar(ws, 3 + i, a14[i]) for i in range(5)], ["I6:N7"])
    f("a14-4c-tarifa", "a14", "Aula 14", "H1:N10", lambda ws: [lancar(ws, 3 + i, a14[i]) for i in range(7)], ["I8:N9"])
    f("a14-5-erro", "a14", "Aula 14", "H1:N6", s5, ["K5:N5"])
    f("a14-6-conferencia", "a14", "Aula 14", "H1:N13", None, ["H11:I13"], cheio=True)
    f("a14-7-saldos-finais", "a14", "Aula 14", "E1:F110", None, [],
      rows("1", "1.1.1.02", "1.1.2.01", "1.1.3.02", "2", "2.1.1.01", "3", "3.1.1.01", "3.2.1.01", "3.2.3.02"), cheio=True)

    # ---- Aula 15
    def t1(ws):
        lancar(ws, 10, a15[0])
    f("a15-1-historico", "a15", "Aula 15", "H1:N11", t1, ["H3:N9"])

    def t2(ws):
        for i in range(3):
            lancar(ws, 10 + i, a15[i])
    f("a15-1b-icms", "a15", "Aula 15", "H7:N11", t1, ["I10:N10"])
    f("a15-2-cheque", "a15", "Aula 15", "H1:N12", t2, ["I12:N12"])

    def t3(ws):
        for i in range(2):
            lancar(ws, 10 + i, a15[i])
    f("a15-3-banco-negativo", "a15", "Aula 15", "E1:F110", t3, ["F" + str(L["1.1.1.02"])], rows("1", "1.1.1", "1.1.1.02", "2", "2.1.1.01"))
    f("a15-4-banco-zerado", "a15", "Aula 15", "E1:F110", t2, ["F" + str(L["1.1.1.02"]), "F" + str(L["2.1.2.02"])],
      rows("1", "1.1.1", "1.1.1.02", "2", "2.1.2.02"))

    f("a15-5-venda-grande", "a15", "Aula 15", "H9:N16", lambda ws: [lancar(ws, 10 + i, a15[i]) for i in range(6)], ["I13:N15"])
    f("a15-6a-quitacoes", "a15", "Aula 15", "H11:N19", lambda ws: [lancar(ws, 10 + i, a15[i]) for i in range(9)], ["I16:N18"])
    f("a15-6-final", "a15", "Aula 15", "H1:N22", None, ["H20:I22"], cheio=True)
    f("a15-7-saldos-finais", "a15", "Aula 15", "E1:F110", None, [],
      rows("1", "1.1.1.02", "1.1.3.02", "2", "3", "3.1.1.01", "3.1.1.03", "3.2.1.01", "3.2.3.01", "3.2.3.02"), cheio=True)

    # ---- Balanço e DRE
    f("bp-1-saldo-ativo", "bp", "Aula 15", "E1:F13", None, ["F3"], cheio=True)
    f("bp-2-modelo", "bp", "Aula 15 - BP e DRE", "A1:F33")

    def b3(ws):
        ws["B5"] = "='Aula 15'!F3"
    f("bp-3-primeira", "bp", "Aula 15 - BP e DRE", "A1:F10", b3, ["B5"])

    def b4(ws):
        for linha, col_r, rotulo, col_v, ref in ct.BP:
            if col_v == "B":
                ws[f"B{linha}"] = ref
    f("bp-4-ativo", "bp", "Aula 15 - BP e DRE", "A4:D23", b4, ["B5:B15"])
    def b4b(ws):
        for linha, col_r, rotulo, col_v, ref in ct.BP:
            if col_v == "D":
                ws[f"D{linha}"] = ref
    f("bp-4b-passivo", "bp", "Aula 15 - BP e DRE", "C4:D23", b4b, ["D5:D21"])
    f("bp-5-dre", "bp", "Aula 15 - BP e DRE", "E4:F23", lambda ws: [ws.__setitem__(f"F{l}", r) for l, _, r in ct.DRE], ["F5:F23"])
    f("bp-6-conferido", "bp", "Aula 15 - BP e DRE", "A1:F37", None, ["A36:B37"], cheio=True)

    # ---- Aula 16
    def ate(n):
        return lambda ws: [lancar(ws, 3 + i, a16[i]) for i in range(n)]
    f("a16-1-comecar", "a16", "Aula 16", "H1:N15", None, ["I3", "K3", "M3"])
    f("a16-2-capital", "a16", "Aula 16", "H1:N5", ate(3), ["I3:N5"])
    f("a16-3-servicos", "a16", "Aula 16", "H1:N8", ate(6), ["I6:N8"])
    f("a16-4-despesas", "a16", "Aula 16", "H1:N11", ate(9), ["I9:N11"])
    f("a16-5-pagamentos", "a16", "Aula 16", "H1:N15", ate(13), ["I12:N15"])
    f("a16-6-conferencia", "a16", "Aula 16", "H1:N19", None, ["H17:I19"], cheio=True)
    f("a16-7-saldos", "a16", "Aula 16", "E1:F110", None, [],
      rows("1", "1.1.1.02", "1.2.3.03", "2", "2.1.3.03", "2.3.1.01", "3", "3.1.1.02", "3.1.1.03", "3.2.1.02"), cheio=True)

    # ---- Simples Nacional
    f("simples-1-tabelas", "simples", "Tabelas", "A1:E9", None, ["A3:E9"])
    f("simples-2-consulta", "simples", "Consulta Imposto Simples", "A1:G10", None, ["B1:B2", "B5:F7"])

    def e3(ws):
        r = 5
        ini = 3
        tab = f"Tabelas!$A${ini}:$E${ini + 5}"
        ws["B5"] = f"=MATCH($B$2,Tabelas!$A${ini}:$A${ini + 5},1)"
        ws["C5"] = f"=VLOOKUP($B$2,{tab},4,TRUE)"
        ws["D5"] = f"=VLOOKUP($B$2,{tab},5,TRUE)"
        ws["E5"] = "=($B$2*C5-D5)/$B$2"
        ws["F5"] = "=$B$1*E5"
    f("simples-3-primeira-linha", "simples", "Consulta Imposto Simples", "A1:G7", e3, ["B5:F5"])
    f("simples-4-resultado", "simples", "Consulta Imposto Simples", "A1:G10", None, ["G5:G7", "B9:B10"], cheio=True)

    def e5(ws):
        ws["B2"] = 1200000
    f("simples-5-simulacao", "simples", "Consulta Imposto Simples", "A1:G10", e5, ["B2"], cheio=True)
    return lista


def preparar(dados, fig, destino):
    wb = build(dados, fig["quem"])(fig["cheio"])
    ws = wb[fig["aba"]]
    if fig["estado"]:
        fig["estado"](ws)
    for a in fig["aneis"]:
        anel(ws, a)
    for outra in wb.worksheets:
        if outra.title != fig["aba"]:
            outra.sheet_state = "hidden"
    wb.active = wb.worksheets.index(ws)
    if fig["linhas"]:
        mostrar = set(fig["linhas"])
        for r in range(1, ws.max_row + 1):
            if r not in mostrar:
                ws.row_dimensions[r].hidden = True
    if fig["area"].startswith("H"):
        # Só na figura: coluna do fato mais estreita, para o texto sair maior na tela do portal.
        ws.column_dimensions["H"].width = 40
        for r in range(3, ws.max_row + 1):
            if isinstance(ws[f"H{r}"].value, str) and not ws.row_dimensions[r].hidden:
                ws.row_dimensions[r].height = max(30, 15 * -(-len(ws[f"H{r}"].value) // 37))
    ws.print_area = fig["area"]
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 1
    ws.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)
    ws.page_margins.left = ws.page_margins.right = ws.page_margins.top = ws.page_margins.bottom = 0.2
    ws.oddHeader.center.text = ""
    ws.oddFooter.center.text = ""
    ws.freeze_panes = None
    wb.save(destino)


def aparar(png, destino, margem=10, largura_max=1180):
    im = Image.open(png).convert("RGB")
    fundo = Image.new("RGB", im.size, (255, 255, 255))
    caixa = ImageChops.difference(im, fundo).getbbox()
    if caixa:
        x0, y0, x1, y1 = caixa
        im = im.crop((max(0, x0 - margem), max(0, y0 - margem), min(im.width, x1 + margem), min(im.height, y1 + margem)))
    if im.width > largura_max:
        im = im.resize((largura_max, round(im.height * largura_max / im.width)), Image.LANCZOS)
    im.quantize(colors=96, method=Image.MEDIANCUT).save(destino, optimize=True)


def main(json_path):
    dados = json.load(open(json_path, encoding="utf-8"))["contabilidade"]
    SAIDA.mkdir(parents=True, exist_ok=True)
    lista = figuras(dados)
    filtro = sys.argv[2:] or None
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        feitos = []
        for fig in lista:
            if filtro and not any(x in fig["nome"] for x in filtro):
                continue
            preparar(dados, fig, tmp / f"{fig['nome']}.xlsx")
            feitos.append(fig["nome"])
        arquivos = [str(tmp / f"{n}.xlsx") for n in feitos]
        for i in range(0, len(arquivos), 8):
            subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(tmp)] + arquivos[i:i + 8],
                           check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=600)
        for nome in feitos:
            subprocess.run(["pdftoppm", "-r", "170", "-png", "-f", "1", "-l", "1", "-singlefile", str(tmp / f"{nome}.pdf"), str(tmp / nome)], check=True)
            aparar(tmp / f"{nome}.png", SAIDA / f"{nome}.png")
            print("figura:", nome)


if __name__ == "__main__":
    main(sys.argv[1])
