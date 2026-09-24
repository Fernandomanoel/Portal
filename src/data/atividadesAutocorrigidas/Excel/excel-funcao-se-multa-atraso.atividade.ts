import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/excel-funcao-se-multa-atraso.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Função SE — Multa por Atraso",
  introducao: "Excel Básico",
  itens: [
    {
      id: "funcao-se-com-calculo-automatico",
      titulo: "Função SE com Cálculo Automático",
      blocos: [
        {
          tipo: "texto",
          texto: "Utilizar a função SE no Excel para calcular automaticamente o valor final de um pagamento, aplicando multa de 2% quando houver atraso.",
        },
        {
          tipo: "subtitulo",
          texto: "Como entender?",
        },
        {
          tipo: "texto",
          texto: "Uma empresa aplica uma multa de 2% sobre o valor da conta quando o pagamento é realizado após a data de vencimento. Caso o pagamento seja feito em dia, não há acréscimo.",
        },
        {
          tipo: "texto",
          texto: "Você deverá usar a função SE para calcular o valor final a pagar.",
        },
        {
          tipo: "texto",
          texto: "Preencha a planilha conforme a tabela:",
        },
        {
          tipo: "tabela",
          colunas: ["","A","B","C","D"],
          linhas: [
            ["1","MULTA DE 2%","","",""],
            ["2","CLIENTE","VALOR DA CONTA (R$)","SITUAÇÃO DO PAGAMENTO","VALOR FINAL (R$)"],
            ["3","Ana","R$ 500,00","Em dia",""],
            ["4","Bruno","R$ 300,00","Atrasado",""],
            ["5","Carla","R$ 800,00","Em dia",""],
            ["6","Diego","R$ 1.000,00","Atrasado",""],
            ["7","João","R$ 400,00","Atrasado",""],
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Inserir a fórmula",
        },
        {
          tipo: "texto",
          texto: "Clique na célula D2 (na linha do primeiro cliente, \"Ana\" — que na planilha acima está na linha 3).",
        },
        {
          tipo: "texto",
          texto: "Digite a fórmula abaixo:",
        },
        {
          tipo: "codigo",
          conteudo: "SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)",
        },
        {
          tipo: "subtitulo",
          texto: "Entendendo o início da fórmula",
        },
        {
          tipo: "lista",
          itens: [
            "O sinal = indica ao Excel que será feita uma fórmula.",
            "A palavra SE informa que o Excel irá realizar um teste lógico.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Verificando a condição",
        },
        {
          tipo: "codigo",
          conteudo: "=SE(C2=\"Atrasado\";",
        },
        {
          tipo: "lista",
          itens: [
            "O Excel verifica o conteúdo da célula C2.",
            "Ele confere se o texto digitado é \"Atrasado\".",
            "Se for verdadeiro, a condição é atendida.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Valor se verdadeiro",
        },
        {
          tipo: "codigo",
          conteudo: "B2*1,02",
        },
        {
          tipo: "lista",
          itens: [
            "Se o pagamento estiver atrasado, o Excel pega o valor da conta da célula B2.",
            "Em seguida, aplica 2% de multa, multiplicando o valor por 1,02.",
            "Exemplo:",
          ],
        },
        {
          tipo: "codigo",
          conteudo: "R$ 300 × 1,02 = R$ 306",
        },
        {
          tipo: "subtitulo",
          texto: "Valor se falso",
        },
        {
          tipo: "codigo",
          conteudo: "B2",
        },
        {
          tipo: "lista",
          itens: [
            "Se o pagamento não estiver atrasado (ou seja, estiver \"Em dia\"),",
            "O Excel mantém o valor original da conta, sem acréscimo.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Funcionamento completo da fórmula",
        },
        {
          tipo: "texto",
          texto: "O Excel executa a seguinte lógica:",
        },
        {
          tipo: "lista",
          itens: [
            "Se C2 for igual a \"Atrasado\" → aplica multa de 2%",
            "Se não → mantém o valor original",
          ],
        },
        {
          tipo: "texto",
          texto: "Usando a linha do Bruno (linha 4 na planilha, que está atrasado) como exemplo:",
        },
        {
          tipo: "texto",
          texto: "C4=\"Atrasado\"",
        },
        {
          tipo: "texto",
          texto: "B4*1,02",
        },
        {
          tipo: "texto",
          texto: "B4",
        },
        {
          tipo: "lista",
          itens: [
            "Teste lógico: verifica se a Situação do Pagamento (C4) é \"Atrasado\".",
            "Valor se verdadeiro: multiplica o Valor da Conta (B4) por 1,02, aplicando os 2% de multa. Para o Bruno: R$ 300,00 × 1,02 = R$ 306,00.",
            "Valor se falso: mantém o valor da conta (B4) sem alteração.",
          ],
        },
        {
          tipo: "subtitulo",
          texto: "Resultado Final",
        },
        {
          tipo: "lista",
          itens: ["Pagamento Em dia → valor normal","Pagamento Atrasado → valor com multa"],
        },
        {
          tipo: "nota",
          variante: "aviso",
          rotulo: "Importante",
          texto: "",
        },
      ],
    },
  ],
};

export default atividade;
