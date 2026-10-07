import imgErro from "@/assets/atividades/compras-estoque/estoque-erro-codigo.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { CADASTRO, MINIMO_APROVACAO, MOVIMENTOS, RESULTADO } from "../dadosEstoque";

const L = RESULTADO.lancamentos;
const conta = (s: string) => L.filter((l) => l.situacao === s).length;
const saldo = (c: string) => RESULTADO.saldoFinal.get(c) ?? 0;
const vendas = L.filter((l) => l.situacao === "OK" && l.tipo === "Saída");
const ABAIXO = CADASTRO.filter((c) => saldo(c.codigo) <= c.minimo);
const CODIGOS = ["EST-014", "EST-031", "EST-052"];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Preenchendo a Planilha de Estoque Já Configurada",
  introducao:
    "Situação de trabalho real: a planilha do almoxarifado já está pronta, com fórmulas protegidas, e o seu trabalho é PREENCHER o mês: 89 documentos de papel (notas de entrada, requisições de venda, baixas e devoluções), com erros de digitação, documento repetido, venda sem saldo e desconto acima da alçada. Baixe a planilha pela própria atividade, lance tudo e responda o fechamento.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "Seu primeiro fechamento de mês",
      remetente: "Roberta Lima, almoxarife sênior da Distribuidora Horizonte",
      assunto: "Lançar setembro na planilha e fechar o estoque",
      paragrafos: [
        "A planilha Controle de Estoque já está configurada: não mexa nas colunas cinza, que são fórmulas. Você só preenche as colunas brancas da aba Movimentos, a partir da aba «Documentos de setembro», que traz o que veio no papel.",
        `Regras da empresa: (1) código que não existe no cadastro não é lançado: anote para corrigir com quem emitiu o documento; (2) o mesmo documento, para o mesmo código e tipo, só entra uma vez; (3) saída ou baixa maior que o saldo daquele momento NÃO é lançada (a venda fica pendente); (4) desconto acima de ${MINIMO_APROVACAO}% entra, mas precisa da aprovação do gerente; (5) devolução de cliente volta ao estoque e estorna o valor da venda; baixa sai pelo custo e vira perda.`,
        "Lance os documentos em ordem de data, como chegaram. O saldo de cada item muda a cada linha, e é ele que decide se uma saída cabe ou não.",
      ],
      entregas: [
        "A conferência dos documentos com problema (etapa 2).",
        "O resultado financeiro do mês (etapa 3) e o estoque final (etapa 4).",
        "O registro de ocorrências para o gerente (etapa 5).",
      ],
    }),
    {
      id: "conheca",
      titulo: "Etapa 1 — Conheça a planilha antes de digitar",
      imagem: { url: imgErro, alt: "Aba Movimentos com uma linha em que o código EST-O17 mostra CÓDIGO NÃO ENCONTRADO e o alerta CORRIGIR.", legenda: "Ilustração do portal: a tela real do Excel pode ter pequenas diferenças." },
      download: {
        url: "/atividades/compras-estoque/estoque-configurado-setembro.xlsx",
        nome: "estoque-configurado-setembro.xlsx",
        rotulo: "Baixar planilha",
        descricao: "Planilha já configurada e protegida: Cadastro, Documentos de setembro (89 linhas), Movimentos (para lançar) e Consulta.",
      },
      passos: [
        "Clique em «Baixar planilha», abra no Excel e clique em Habilitar Edição se aparecer a faixa amarela.",
        "Na aba Movimentos, lance cada linha de «Documentos de setembro» nas colunas A a G: Data, Documento, Código, Tipo (escolha na lista), Qtd, Desconto % e Custo NF.",
        "Olhe a coluna K (Alerta) a cada linha: CORRIGIR CÓDIGO, DUPLICADO ou APROVAR DESCONTO dizem o que fazer com aquele documento.",
        "Antes de lançar uma Saída ou Baixa, digite o código em B2 da aba Consulta e confira se o saldo comporta a quantidade.",
      ],
      blocos: [
        { tipo: "lista", itens: [
          "Aba Cadastro: os 60 itens com saldo inicial, mínimo, custo e preço, e as colunas de saldo atual e situação (fórmulas).",
          "Aba Documentos de setembro: o que chegou no papel. Você lê daqui.",
          "Aba Movimentos: onde você lança. Brancas: Data, Documento, Código, Tipo (lista), Qtd, Desconto %, Custo NF. Cinza: Descrição, Preço, Valor líquido e Alerta, que se preenchem sozinhas.",
          "Aba Consulta: digite um código em B2 para ver o saldo daquele momento antes de lançar uma saída.",
        ] },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Ler a estrutura antes evita o erro mais comum de quem chega: digitar por cima de uma fórmula. As colunas de alerta existem para mostrar o problema na hora do lançamento, não no fim do mês." },
      ],
    },
    consulta({
      id: "conferencia",
      titulo: "Etapa 2 — Documentos com problema",
      cenario: "Depois de lançar (ou deixar de lançar) os 89 documentos seguindo as regras, conte as ocorrências. A tabela abaixo é a mesma da aba «Documentos de setembro».",
      instrucao: "Use a coluna Alerta e o seu controle de lançamentos para responder.",
      formato: "planilha",
      tabelas: [{ nome: "Documentos de setembro (89 linhas)", colunas: ["Data", "Documento", "Código", "Tipo", "Qtd", "Desconto %", "Custo NF", "Observação"], linhas: MOVIMENTOS.map((m) => [m.data, m.documento, m.codigo, m.tipo, m.quantidade, m.desconto, m.custoNf, m.obs]) }],
      comandos: [],
      resultados: [
        { id: "invalidos", rotulo: "Documentos com código inexistente", valor: conta("CÓDIGO INVÁLIDO"), explicacao: "Códigos com letra no lugar de número, espaço ou fora do cadastro.", tolerancia: 0 },
        { id: "duplicados", rotulo: "Documentos repetidos (lançados só uma vez)", valor: conta("DUPLICADO"), explicacao: "Mesmo documento, código e tipo aparecendo de novo.", tolerancia: 0 },
        { id: "sem-saldo", rotulo: "Saídas ou baixas recusadas por falta de saldo", valor: conta("SEM SALDO"), explicacao: "Quantidade maior que o saldo daquele momento.", tolerancia: 0 },
        { id: "aprovar", rotulo: `Vendas lançadas com desconto acima de ${MINIMO_APROVACAO}% (precisam de aprovação)`, valor: L.filter((l) => l.aprovar).length, explicacao: "Saídas lançadas com desconto maior que a alçada.", tolerancia: 0 },
        { id: "lancados", rotulo: "Total de linhas efetivamente lançadas", valor: conta("OK"), explicacao: "89 menos as recusadas e as repetidas.", tolerancia: 0 },
      ],
    }),
    consulta({
      id: "financeiro",
      titulo: "Etapa 3 — Resultado financeiro do mês",
      cenario: "Use a coluna Valor líquido e as somas por tipo (SOMASE) da aba Movimentos, considerando só o que foi lançado.",
      instrucao: "Informe os valores em reais.",
      tabelas: [],
      comandos: [],
      resultados: [
        { id: "receita", rotulo: "Receita líquida das vendas lançadas (R$)", valor: somar(vendas.map((l) => l.valor)), explicacao: "Soma de qtd × preço × (1 − desconto) das saídas lançadas.", tolerancia: 0.5 },
        { id: "descontos", rotulo: "Total de descontos concedidos (R$)", valor: somar(vendas.map((l) => l.descontoReais)), explicacao: "Soma de qtd × preço × desconto.", tolerancia: 0.5 },
        { id: "estornos", rotulo: "Valor estornado pelas devoluções (R$, positivo)", valor: -somar(L.filter((l) => l.situacao === "OK" && l.tipo === "Devolução").map((l) => l.valor)), explicacao: "Soma de qtd × preço × (1 − desconto) das devoluções.", tolerancia: 0.5 },
        { id: "perdas", rotulo: "Perdas com baixas, pelo custo (R$)", valor: somar(L.map((l) => l.perda)), explicacao: "Soma de qtd × custo das baixas lançadas.", tolerancia: 0.5 },
        { id: "compras", rotulo: "Valor das entradas pelo custo da nota (R$)", valor: somar(L.map((l) => l.compra)), explicacao: "Soma de qtd × custo NF das entradas lançadas.", tolerancia: 0.5 },
      ],
    }),
    consulta({
      id: "estoque-final",
      titulo: "Etapa 4 — Estoque final de setembro",
      cenario: "Na aba Cadastro, a coluna Saldo atual mostra o fechamento. Confira os itens pedidos.",
      instrucao: "Informe os números.",
      tabelas: [],
      comandos: [],
      resultados: [
        ...CODIGOS.map((c, i) => ({ id: `saldo-${i}`, rotulo: `Saldo final de ${c}`, valor: saldo(c), explicacao: "Saldo inicial mais e menos os lançamentos aceitos.", tolerancia: 0 })),
        { id: "abaixo", rotulo: "Itens em REPOR no fechamento (saldo menor ou igual ao mínimo)", valor: ABAIXO.length, explicacao: "Conte REPOR na coluna Situação.", tolerancia: 0 },
        { id: "valor", rotulo: "Valor total do estoque final, pelo custo (R$)", valor: somar(CADASTRO.map((c) => saldo(c.codigo) * c.custo)), explicacao: "Soma de saldo final × custo.", tolerancia: 1 },
      ],
    }),
    dissertativa({
      id: "ocorrencias",
      titulo: "Etapa 5 — Registro de ocorrências para o gerente",
      instrucao: "Escreva o relatório de fechamento que vai junto com a planilha.",
      deve: [
        "Resuma o mês: receita líquida, descontos, perdas e valor do estoque final, com os seus números.",
        "Liste cada tipo de problema encontrado (código inválido, documento repetido, falta de saldo, desconto acima da alçada) com a quantidade e o que deve ser feito.",
        "Indique quem precisa agir em cada caso (vendas, compras, gerente) e o prazo.",
        "Proponha uma mudança de rotina que reduza esses erros no mês seguinte.",
      ],
      chave: /(c[oó]digo|duplicad|repetid|saldo|desconto|aprova|perda|receita|estoque)/i,
      minPalavras: 90,
    }),
  ],
};

export default atividade;
