import imgFormatacao from "@/assets/atividades/compras-estoque/estoque-formatacao.svg";
import imgPronta from "@/assets/atividades/compras-estoque/estoque-planilha-pronta.svg";
import imgProcv from "@/assets/atividades/compras-estoque/estoque-procv.svg";
import imgValidacao from "@/assets/atividades/compras-estoque/estoque-validacao.svg";
import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { briefing, consulta, dissertativa, somar } from "../ajudantes";
import { CADASTRO, RESULTADO, porCodigo } from "../dadosEstoque";

const AVISO = "Ilustração do portal: a tela real do Excel pode ter pequenas diferenças de cor e posição.";
const LINHAS = CADASTRO.map((c) => [c.codigo, c.descricao, c.grupo, c.unidade, c.saldoInicial, c.minimo, c.custo, c.preco]);
const REPOR = CADASTRO.filter((c) => c.saldoInicial <= c.minimo);
const VALOR = somar(CADASTRO.map((c) => c.saldoInicial * c.custo));
const REPOSICAO = somar(REPOR.map((c) => (c.minimo * 2 - c.saldoInicial) * c.custo));
const AMOSTRA = RESULTADO.lancamentos.filter((l) => l.situacao === "OK").slice(0, 40);
const saldoAmostra = (codigo: string) =>
  porCodigo(codigo)!.saldoInicial +
  somar(AMOSTRA.filter((l) => l.codigo === codigo).map((l) => (l.tipo === "Entrada" || l.tipo === "Devolução" ? l.quantidade : -l.quantidade)));
const comMov = [...new Set(AMOSTRA.map((l) => l.codigo))].slice(0, 3);

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Compras e Estoque — Configurando a Planilha de Controle de Estoque",
  introducao:
    "Situação de trabalho real: você acabou de chegar ao almoxarifado e a empresa não tem controle. Sua tarefa é CONFIGURAR a planilha que todos vão usar: cadastro com 60 itens, colunas calculadas, alerta de reposição, lista de tipos de movimento, busca por código e cálculo de saldo. A planilha de trabalho é baixada aqui mesmo, na etapa 1, e cada etapa mostra onde clicar no Excel e por quê.",
  itens: [
    briefing({
      id: "briefing",
      titulo: "O pedido do supervisor",
      remetente: "Paulo Henrique, supervisor de suprimentos da Distribuidora Horizonte",
      assunto: "Precisamos de uma planilha de estoque que qualquer um consiga usar",
      paragrafos: [
        "Hoje cada pessoa anota o estoque de um jeito e ninguém sabe o saldo real. Quero uma planilha com três abas: Cadastro (os 60 itens), Movimentos (onde a equipe lança entradas, saídas, baixas e devoluções) e Consulta (digita o código e aparecem descrição, saldo e custo).",
        "Quem vai preencher não entende de fórmulas. Por isso a planilha precisa fazer as contas sozinha, avisar em vermelho o que precisa ser reposto, só aceitar tipos de movimento válidos e ter as fórmulas protegidas para ninguém apagar sem querer.",
      ],
      entregas: [
        "A aba Cadastro com as colunas Valor em estoque e Situação calculadas (etapa 2).",
        "Validação de dados, formatação condicional e a aba Consulta com PROCV (etapas 3 a 5).",
        "O cálculo de saldo com SOMASES e o manual de uso para a equipe (etapas 6 e 7).",
      ],
    }),
    {
      id: "estrutura",
      titulo: "Etapa 1 — Montar a estrutura da pasta de trabalho",
      imagem: { url: imgPronta, alt: "Aba Cadastro do Excel com títulos congelados, colunas calculadas em azul e REPOR em vermelho.", legenda: AVISO },
      download: {
        url: "/atividades/compras-estoque/estoque-para-configurar.xlsx",
        nome: "estoque-para-configurar.xlsx",
        rotulo: "Baixar planilha",
        descricao: "Abas Leia-me, Cadastro (60 itens, só dados), Movimentos (40 lançamentos de exemplo) e Consulta (em branco). As fórmulas são você quem monta.",
      },
      passos: [
        "Clique em «Baixar planilha» acima, abra o arquivo no Excel e, se aparecer a faixa amarela «Modo de Exibição Protegido», clique em Habilitar Edição.",
        "Salve uma cópia com o nome Controle de Estoque.xlsx (Arquivo > Salvar como) para guardar o original intacto.",
        "Leia a aba Leia-me e confira as abas Cadastro, Movimentos e Consulta (clique nos nomes na parte de baixo da tela).",
        "Na aba Cadastro, clique numa célula da tabela, aperte Ctrl + T (Formatar como Tabela) e confirme «Minha tabela tem cabeçalhos».",
        "Vá em Exibir > Congelar Painéis > Congelar Linha Superior.",
        "Formate as colunas de custo e preço como moeda (Página Inicial > grupo Número > Moeda).",
      ],
      blocos: [
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Separar em abas evita que alguém digite movimento em cima do cadastro. A Tabela (Ctrl + T) estende as fórmulas sozinha quando entra uma linha nova, e congelar a linha de títulos deixa você saber que coluna está lendo mesmo no item 60." },
      ],
    },
    consulta({
      id: "colunas-calculadas",
      titulo: "Etapa 2 — Colunas calculadas: valor em estoque e situação",
      cenario: "Na aba Cadastro, crie duas colunas novas: I = Valor em estoque e J = Situação. Regra da empresa: o item está em REPOR quando o saldo é menor ou igual ao estoque mínimo. A compra de reposição leva cada item em REPOR até o DOBRO do mínimo.",
      instrucao: "Escreva as fórmulas da linha 2, arraste (ou deixe a Tabela estender) e responda.",
      formato: "planilha",
      tabelas: [{ nome: "Cadastro de 60 itens (cole na aba Cadastro, célula A1)", colunas: ["Código", "Descrição", "Grupo", "Unidade", "Saldo", "Mínimo", "Custo (R$)", "Preço (R$)"], linhas: LINHAS }],
      comandos: [
        { id: "valor", rotulo: "Sua fórmula de Valor em estoque (linha 2)", padrao: /^=\s*\$?[A-Z]{1,2}\$?\d+\s*\*\s*\$?[A-Z]{1,2}\$?\d+\s*$|^=.*\[@?\w/i, placeholder: "Ex.: =E2*G2", dica: "Multiplique a célula do saldo pela do custo, por exemplo =E2*G2." },
        { id: "situacao", rotulo: "Sua fórmula de Situação (linha 2)", padrao: /^=\s*SE\s*\([\s\S]*<=[\s\S]*REPOR[\s\S]*\)/i, placeholder: "Ex.: =SE(E2<=F2;\"REPOR\";\"OK\")", dica: "Use SE comparando saldo <= mínimo, com \"REPOR\" e \"OK\"." },
      ],
      resultados: [
        { id: "valor-total", rotulo: "Valor total em estoque (R$)", valor: VALOR, explicacao: "Soma da coluna Valor em estoque (saldo × custo).", tolerancia: 0.1 },
        { id: "repor", rotulo: "Quantos itens ficam em REPOR", valor: REPOR.length, explicacao: "Use =CONT.SE(J:J;\"REPOR\").", tolerancia: 0 },
        { id: "reposicao", rotulo: "Custo da compra de reposição, levando cada item em REPOR até o dobro do mínimo (R$)", valor: REPOSICAO, explicacao: "Para cada REPOR: (2 × mínimo − saldo) × custo, somado.", tolerancia: 0.5 },
        { id: "maior", rotulo: "Maior valor em estoque de um único item (R$)", valor: Math.max(...CADASTRO.map((c) => c.saldoInicial * c.custo)), explicacao: "Use MÁXIMO na coluna Valor em estoque.", tolerancia: 0.05 },
      ],
    }),
    {
      id: "validacao",
      titulo: "Etapa 3 — Validação de dados: só aceitar tipos válidos",
      imagem: { url: imgValidacao, alt: "Caixa Validação de dados com Permitir: Lista e Fonte: Entrada;Saída;Baixa;Devolução.", legenda: AVISO },
      passos: [
        "Na aba Movimentos, crie os títulos: Data, Documento, Código, Descrição, Tipo, Qtd, Desconto %, Custo NF.",
        "Selecione a coluna Tipo (da linha 2 até a 500).",
        "Vá em Dados > Validação de Dados. Em Permitir, escolha Lista. Em Fonte, digite Entrada;Saída;Baixa;Devolução.",
        "Na aba Alerta de erro, escreva a mensagem «Escolha um tipo da lista». Clique em OK e teste digitando «saida» sem acento: o Excel deve recusar.",
      ],
      campos: [
        { id: "fonte", rotulo: "O que você digitou no campo Fonte", placeholder: "Entrada;Saída;...", regra: { tipo: "padrao", padrao: /entrada\s*[;,]\s*sa[ií]da\s*[;,]\s*baixa\s*[;,]\s*devolu[cç][aã]o/i }, mensagemCerta: "Isso: os quatro tipos, separados por ponto e vírgula.", mensagemErrada: "Escreva os quatro tipos na ordem, separados por ponto e vírgula: Entrada;Saída;Baixa;Devolução." },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Se cada pessoa escrever o tipo de um jeito (saida, SAÍDA, venda), o SOMASES não reconhece e o saldo fica errado sem ninguém perceber. A lista obriga todos a usarem exatamente as mesmas palavras." }],
    },
    {
      id: "formatacao",
      titulo: "Etapa 4 — Formatação condicional: o alerta em vermelho",
      imagem: { url: imgFormatacao, alt: "Caixa Texto que Contém com REPOR e preenchimento vermelho claro.", legenda: AVISO },
      passos: [
        "Na aba Cadastro, selecione a coluna Situação.",
        "Página Inicial > Formatação Condicional > Realçar Regras das Células > Texto que Contém.",
        "Digite REPOR e escolha «Preenchimento vermelho claro e texto vermelho escuro». OK.",
        "Teste: troque o saldo de um item OK para um valor abaixo do mínimo e veja a célula ficar vermelha sozinha. Depois desfaça (Ctrl + Z).",
      ],
      campos: [
        { id: "vermelhas", rotulo: "Quantas células da coluna Situação ficaram vermelhas?", placeholder: "Número", regra: { tipo: "numero", esperado: REPOR.length, tolerancia: 0 }, mensagemCerta: "Certo: uma por item em REPOR.", mensagemErrada: "Confira se a regra pegou a coluna toda e se a fórmula de Situação foi arrastada até o item 60." },
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Ninguém lê 60 linhas toda manhã. A cor faz o problema saltar aos olhos, e como a regra olha o resultado da fórmula, o alerta acompanha o estoque sem ninguém precisar pintar nada." }],
    },
    consulta({
      id: "consulta-procv",
      titulo: "Etapa 5 — Aba Consulta: buscar o item pelo código (PROCV)",
      cenario: "Na aba Consulta, escreva «Código» em A2 e deixe B2 para digitar. Nas linhas de baixo, use PROCV para trazer descrição, saldo, custo e preço da aba Cadastro. Teste com os códigos pedidos.",
      instrucao: "Escreva a fórmula da descrição e responda o que a consulta mostra para cada código.",
      tabelas: [],
      comandos: [{ id: "procv", rotulo: "Sua fórmula de busca da descrição", padrao: /^=\s*(PROCV|PROCX|VLOOKUP|XLOOKUP|SEERRO\s*\(\s*PROCV)\s*\(/i, placeholder: "Ex.: =PROCV($B$2;Cadastro!$A:$H;2;FALSO)", dica: "Use PROCV (ou PROCX) com o código de B2, o intervalo da aba Cadastro, o número da coluna e FALSO." }],
      resultados: [
        { id: "saldo-017", rotulo: "Saldo do item EST-017", valor: porCodigo("EST-017")!.saldoInicial, explicacao: "Coluna 5 (Saldo) da aba Cadastro.", tolerancia: 0 },
        { id: "custo-042", rotulo: "Custo do item EST-042 (R$)", valor: porCodigo("EST-042")!.custo, explicacao: "Coluna 7 (Custo)." },
        { id: "preco-033", rotulo: "Preço do item EST-033 (R$)", valor: porCodigo("EST-033")!.preco, explicacao: "Coluna 8 (Preço)." },
      ],
    }),
    {
      id: "procv-imagem",
      titulo: "Como o PROCV encontra o item",
      imagem: { url: imgProcv, alt: "Aba Consulta com o código EST-002 em B2 e fórmulas PROCV trazendo descrição, saldo e custo.", legenda: AVISO },
      blocos: [
        { tipo: "lista", itens: ["1º argumento: o que procurar ($B$2, com $ para não mudar ao copiar).", "2º: onde procurar (Cadastro!$A:$H, a primeira coluna precisa ser o código).", "3º: o número da coluna a devolver (2 = descrição, 5 = saldo).", "4º: FALSO, para exigir o código exato."] },
        { tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Sem FALSO, o Excel aceita um código «parecido» e devolve o item errado sem avisar. Com SEERRO(PROCV(...);\"CÓDIGO NÃO ENCONTRADO\") o erro #N/D vira uma mensagem que qualquer pessoa entende." },
      ],
    },
    consulta({
      id: "saldo-somases",
      titulo: "Etapa 6 — Saldo atual com SOMASES",
      cenario: "Cole os 40 primeiros movimentos do mês na aba Movimentos. No Cadastro, crie a coluna Saldo atual = saldo + entradas + devoluções − saídas − baixas, somando cada tipo com SOMASES pelo código.",
      instrucao: "Escreva a fórmula e informe o saldo atual dos itens pedidos.",
      formato: "planilha",
      tabelas: [{ nome: "40 movimentos (cole na aba Movimentos, célula A1)", colunas: ["Data", "Documento", "Código", "Tipo", "Qtd", "Desconto %", "Custo NF"], linhas: AMOSTRA.map((l) => [l.data, l.documento, l.codigo, l.tipo, l.quantidade, l.desconto, l.custoNf]) }],
      comandos: [{ id: "somases", rotulo: "Sua fórmula de Saldo atual (linha 2)", padrao: /^=[\s\S]*SOMASES?\s*\([\s\S]*(entrada|sa[ií]da)/i, placeholder: "=E2+SOMASES(Movimentos!E:E;Movimentos!C:C;A2;Movimentos!D:D;\"Entrada\")+...", dica: "Some o saldo com SOMASES de cada tipo, filtrando pelo código (A2) e pelo tipo." }],
      resultados: comMov.map((codigo, i) => ({ id: `saldo-${i}`, rotulo: `Saldo atual de ${codigo}`, valor: saldoAmostra(codigo), explicacao: "Saldo do cadastro + entradas + devoluções − saídas − baixas desses 40 movimentos.", tolerancia: 0 })),
    }),
    {
      id: "protecao",
      titulo: "Etapa 7 — Proteger as fórmulas",
      passos: [
        "Selecione as células que a equipe VAI preencher (aba Movimentos, linhas 2 a 500) > botão direito > Formatar Células > Proteção > desmarque «Bloqueada».",
        "Faça o mesmo com a célula B2 da aba Consulta.",
        "Em cada aba, vá em Revisão > Proteger Planilha, defina uma senha e guarde-a com o supervisor.",
        "Teste: tente apagar uma fórmula do Cadastro. O Excel deve recusar.",
      ],
      blocos: [{ tipo: "nota", variante: "dica", rotulo: "Por quê?", texto: "Por padrão todas as células são «bloqueadas», mas isso só vale depois de proteger a planilha. Desbloquear antes as células de digitação deixa a equipe trabalhar e impede que uma fórmula seja apagada por engano." }],
    },
    dissertativa({
      id: "manual",
      titulo: "Entrega — Manual de uso da planilha para a equipe",
      instrucao: "Escreva o manual curto que ficará na primeira aba da planilha.",
      deve: [
        "Explique para que serve cada aba e quais células a equipe pode preencher.",
        "Ensine como lançar um movimento (data, documento, código, tipo pela lista, quantidade).",
        "Explique o que significa REPOR em vermelho e o que fazer quando aparecer «CÓDIGO NÃO ENCONTRADO».",
        "Cite o valor em estoque e quantos itens estão em REPOR hoje, com os números que você calculou.",
      ],
      chave: /(cadastro|movimentos|consulta|repor|c[oó]digo|procv|lista|proteg|saldo)/i,
      minPalavras: 80,
    }),
  ],
};

export default atividade;
