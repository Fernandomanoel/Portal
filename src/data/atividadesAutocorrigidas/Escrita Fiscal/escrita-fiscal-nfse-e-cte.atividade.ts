import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, calculos, dissertativa, planilha, somar } from "../ajudantes";
import { CIDADES, dataBR, decimal, inteiro, sortear, sorteio } from "../dadosFicticios";

const r = sorteio(2606);
const CTES = Array.from({ length: 20 }, (_, i) => {
  const origem = sortear(r, CIDADES);
  let destino = sortear(r, CIDADES);
  while (destino === origem) destino = sortear(r, CIDADES);
  const km = inteiro(r, 40, 520);
  const peso = inteiro(r, 3, 28) * 100;
  const frete = Math.round(km * peso * decimal(r, 0.0035, 0.0062, 4) * 100) / 100;
  return [`CT-e ${7001 + i}`, dataBR(inteiro(r, 1, 28), 7), origem, destino, km, peso, frete];
});
const ICMS = 12;
const FRETE = somar(CTES.map((l) => l[6] as number));
const KM = somar(CTES.map((l) => l[4] as number));
const PESO = somar(CTES.map((l) => l[5] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Escrita Fiscal — Nota Fiscal Eletrônica de Serviço e Conhecimento de Transporte Eletrônico (CT-e)",
  introducao:
    "Um dia de trabalho com dois documentos eletrônicos: o CT-e de uma transportadora, com frete e ICMS por conhecimento, e a NFS-e de um prestador de serviços com retenções na fonte. A planilha vem dentro da atividade: use o botão para copiá-la, resolva no Excel ou nos Planilhas Google e digite os resultados. As questões dissertativas pedem argumentação com os seus números.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "Dois documentos, dois portais",
      remetente: "Fábio Medeiros, supervisor fiscal",
      assunto: "Fechamento de julho — Transportes Rota Leste e Consultoria Prisma",
      paragrafos: [
        "Hoje você atende dois clientes. A Transportes Rota Leste emitiu 20 Conhecimentos de Transporte Eletrônico (CT-e) em julho; precisamos conferir frete, peso, distância e o ICMS destacado. A Consultoria Prisma vai emitir uma NFS-e para um cliente que é retentor de tributos, e o valor líquido a receber precisa estar certo antes de a nota ser emitida.",
        "Para este treino, o ICMS do frete usa alíquota de 12% (valor de exemplo: a alíquota real depende dos estados de origem e destino). As retenções da NFS-e são ISS de 3% e 4,65% de PIS, COFINS e CSLL retidos pelo tomador pessoa jurídica.",
      ],
      entregas: [
        "A conferência dos 20 CT-e: totais, ICMS, frete por km e por quilo (etapa 2).",
        "O cálculo do valor líquido da NFS-e da Consultoria Prisma (etapa 3).",
        "Um roteiro por escrito, passo a passo, de como emitir e como corrigir uma NFS-e no portal do município (etapa 4).",
      ],
    }),
    planilha({
      id: "cte-de-julho",
      titulo: "Etapa 2 — Planilha: os 20 CT-e emitidos em julho",
      cenario: "Cole a planilha no Excel. Crie as colunas ICMS (=frete × 12%), Frete por km e Frete por kg.",
      colunas: ["Documento", "Data", "Origem", "Destino", "Distância (km)", "Peso (kg)", "Valor do frete (R$)"],
      linhas: CTES,
      instrucao: "Calcule:",
      tarefas: [
        { id: "frete", rotulo: "Total de frete faturado (R$)", valor: FRETE, explicacao: "Soma da coluna Valor do frete." },
        { id: "icms", rotulo: "ICMS total destacado nos CT-e (R$)", valor: (FRETE * ICMS) / 100, explicacao: "Total de frete × 12%." },
        { id: "km", rotulo: "Distância total percorrida (km)", valor: KM, explicacao: "Soma da coluna Distância.", tolerancia: 0 },
        { id: "frete-km", rotulo: "Frete médio por km (R$)", valor: FRETE / KM, explicacao: "Frete total ÷ quilômetros totais." },
        { id: "frete-kg", rotulo: "Frete médio por quilo transportado (R$)", valor: FRETE / PESO, explicacao: "Frete total ÷ peso total." },
        { id: "maior", rotulo: "Maior valor de frete de um único CT-e (R$)", valor: Math.max(...CTES.map((l) => l[6] as number)), explicacao: "Use MÁXIMO na coluna Valor do frete." },
        { id: "peso", rotulo: "Peso total transportado (kg)", valor: PESO, explicacao: "Soma da coluna Peso.", tolerancia: 0 },
      ],
    }),
    calculos({
      id: "nfse-retencoes",
      titulo: "Etapa 3 — NFS-e com retenções: valor líquido a receber",
      cenario: "A Consultoria Prisma presta um serviço de R$ 8.400,00 a uma empresa que reterá na fonte ISS de 3% e 4,65% de PIS, COFINS e CSLL (0,65% + 3% + 1%). Antes de emitir a nota, a Consultoria precisa saber quanto vai receber.",
      instrucao: "Calcule:",
      campos: [
        { id: "iss", rotulo: "ISS retido (R$)", esperado: 252, explicacao: "8.400 × 3% = 252." },
        { id: "federais", rotulo: "PIS, COFINS e CSLL retidos (R$)", esperado: 390.6, explicacao: "8.400 × 4,65% = 390,60." },
        { id: "liquido", rotulo: "Valor líquido a receber (R$)", esperado: 7757.4, explicacao: "8.400 − 252 − 390,60 = 7.757,40." },
        { id: "percentual", rotulo: "Retenções como % do valor da nota", esperado: 7.65, explicacao: "(252 + 390,60) ÷ 8.400 = 7,65%." },
      ],
    }),
    dissertativa({
      id: "roteiro-nfse",
      titulo: "Etapa 4 — Roteiro de emissão e correção da NFS-e",
      cenario: "A Consultoria Prisma vai contratar um estagiário que nunca emitiu nota fiscal de serviço. Você preparou um roteiro para o primeiro uso do portal.",
      instrucao: "Escreva o roteiro.",
      deve: [
        "Liste, na ordem, os dados que o estagiário precisa ter em mãos antes de abrir o portal (CNPJ do tomador, descrição e código do serviço, valor, retenções).",
        "Explique como conferir a alíquota e as retenções antes de confirmar a emissão.",
        "Descreva o que fazer se a nota sair com erro: quando se cancela e quando se substitui, e por que não basta «emitir outra e esquecer a errada».",
        "Diga onde guardar o XML e o PDF e quem precisa receber uma cópia.",
      ],
      chave: /(cnpj|c[oó]digo|servi[cç]o|reten[cç][aã]o|cancel|substitu|xml|pdf|al[ií]quota|portal)/i,
      minPalavras: 60,
    }),
    dissertativa({
      id: "cte-na-pratica",
      titulo: "Etapa 5 — Conferindo o CT-e",
      instrucao: "Descreva como você conferiria os CT-e da transportadora antes de lançar o ICMS.",
      deve: [
        "Cite os campos do CT-e que você confere (partes envolvidas, origem e destino, carga, valor da prestação, ICMS destacado).",
        "Explique como a distância e o peso ajudam a detectar um frete fora do padrão.",
        "Diga o que fazer ao encontrar um CT-e com alíquota de ICMS diferente da esperada.",
      ],
      chave: /(origem|destino|carga|valor|icms|al[ií]quota|peso|dist[aâ]ncia|confer)/i,
    }),
  ],
};

export default atividade;
