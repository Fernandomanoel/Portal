import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/logica-programacao-fundamentos.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Desvendando a Lógica de Programação!",
  introducao: "Lógica de Programação",
  itens: [
    {
      id: "antes-de-tudo-o-que-e-programar",
      titulo: "Antes de tudo: o que é programar?",
      blocos: [
        {
          tipo: "texto",
          texto: "Todo jogo, aplicativo ou site que você usa no celular ou no computador é, no fundo, uma sequência gigante de instruções que alguém escreveu para o computador seguir. O computador não tem \"bom senso\": ele não improvisa e não adivinha o que você quer. Ele só faz exatamente o que está escrito, na ordem em que está escrito.",
        },
        {
          tipo: "texto",
          texto: "Por isso, antes de aprender qualquer linguagem de programação (Python, Java, JavaScript...), a habilidade mais importante que você precisa desenvolver é a lógica de programação: a capacidade de quebrar um problema em passos pequenos, claros e na ordem certa. É exatamente isso que vamos treinar nesta atividade.",
        },
      ],
    },
    {
      id: "o-segredo-por-tras-dos-codigos-o-algoritmo",
      titulo: "O segredo por trás dos códigos: o algoritmo",
      blocos: [
        {
          tipo: "texto",
          texto: "Um algoritmo é uma sequência finita e ordenada de passos lógicos para resolver um problema ou realizar uma tarefa. A palavra parece complicada, mas você já segue algoritmos várias vezes por dia sem perceber. Vamos usar algumas analogias do dia a dia para deixar isso bem concreto.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Analogia 1 — Receita de bolo",
          texto: "Uma receita de bolo é um algoritmo perfeito: ela tem uma lista de ingredientes (os dados de entrada) e um passo a passo numerado que precisa ser seguido na ordem certa — misturar antes de assar, e não o contrário. Se você pular um passo ou trocar a ordem, o resultado não sai como esperado. Com um programa de computador é a mesma coisa: a ordem das instruções importa.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Analogia 2 — Fazendo um sanduíche",
          texto: "Pegar o pão, passar a manteiga, colocar o queijo, colocar o presunto, fechar o sanduíche. Cada uma dessas ações é um passo simples e objetivo. Sozinhas, elas não significam muita coisa — mas em sequência, elas resolvem um problema (matar a fome). É exatamente assim que o computador \"pensa\": ele não entende \"faça um sanduíche\", ele entende cada passo pequeno, um de cada vez.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Analogia 3 — O GPS traçando uma rota",
          texto: "Quando você pede uma rota no GPS, ele não te dá só o destino — ele te dá uma sequência de instruções: \"siga em frente por 500 metros\", \"vire à direita na próxima rua\", \"seu destino está à esquerda\". Isso é um algoritmo de navegação: passos claros, numerados, executados em ordem, que levam de um ponto de partida a um resultado final.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Analogia 4 — Manual de montagem de móvel",
          texto: "Quando você compra um móvel desmontado, ele vem com um manual numerado: passo 1, passo 2, passo 3... Se você tentar montar o móvel pulando etapas ou fora de ordem, ele simplesmente não vai fechar direito. Um algoritmo de computador segue a mesma regra: passos finitos (têm um fim), passos ordenados (têm uma sequência certa) e passos claros (sem ambiguidade, sem \"dá um jeito aí\").",
        },
        {
          tipo: "texto",
          texto: "Resumindo: um algoritmo bem escrito é claro (qualquer pessoa consegue entender e seguir), finito (tem começo, meio e fim — não fica repetindo para sempre sem motivo) e ordenado (a sequência dos passos importa). Quando escrevemos um algoritmo em código, o computador executa exatamente esses passos, na ordem, sem pular nada.",
        },
      ],
    },
    {
      id: "guardando-dados-as-variaveis",
      titulo: "Guardando dados: as variáveis",
      blocos: [
        {
          tipo: "texto",
          texto: "Todo programa precisa guardar informações temporariamente — a idade que o usuário digitou, o resultado de uma soma, o nome de alguém. Para isso usamos variáveis.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Caixas de memória com etiqueta",
          texto: "Imagine a memória do computador como um armário gigante cheio de caixas. Cada caixa tem uma etiqueta com um nome (o nome da variável) e guarda um valor dentro. Quando você escreve idade = 20, é como se você pegasse a caixa etiquetada \"idade\" e colocasse o número 20 dentro dela. Mais tarde, sempre que o programa precisar desse valor, ele só abre a caixa \"idade\" de novo.",
        },
        {
          tipo: "texto",
          texto: "O valor guardado dentro da caixa pode mudar ao longo do programa — por isso o nome \"variável\": o conteúdo varia, mas o nome da caixa continua o mesmo. E cada variável precisa de um nome único para que o programa saiba exatamente qual caixa abrir.",
        },
        {
          tipo: "subtitulo",
          texto: "Por que declarar o tipo da variável importa",
        },
        {
          tipo: "texto",
          texto: "Em Portugol (e na maioria das linguagens de programação \"de verdade\"), antes de usar uma caixa você precisa dizer que tipo de coisa vai guardar dentro dela. Isso se chama declarar o tipo da variável. Isso existe porque o computador trata número, texto e valor lógico de formas completamente diferentes por dentro — e declarar o tipo evita erros bobos, como tentar \"somar\" duas palavras ou comparar um número com um texto.",
        },
        {
          tipo: "texto",
          texto: "inteiro",
        },
        {
          tipo: "texto",
          texto: "inteiro idade",
        },
        {
          tipo: "texto",
          texto: "real",
        },
        {
          tipo: "texto",
          texto: "real preco",
        },
        {
          tipo: "texto",
          texto: "texto",
        },
        {
          tipo: "texto",
          texto: "texto nome",
        },
        {
          tipo: "texto",
          texto: "logico",
        },
        {
          tipo: "texto",
          texto: "verdadeiro",
        },
        {
          tipo: "texto",
          texto: "falso",
        },
        {
          tipo: "texto",
          texto: "logico aprovado",
        },
        {
          tipo: "texto",
          texto: "Dica:",
        },
        {
          tipo: "texto",
          texto: "inteiro",
        },
      ],
    },
    {
      id: "o-computador-fazendo-escolhas-se-senao",
      titulo: "O computador fazendo escolhas: SE / SENÃO",
      blocos: [
        {
          tipo: "texto",
          texto: "Programas raramente seguem um caminho único do início ao fim — na maioria das vezes eles precisam decidir o que fazer dependendo da situação. Essa decisão é feita com a estrutura se / senao: \"SE uma condição for verdadeira, faça isso; SENÃO, faça aquilo\".",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Exemplo do dia a dia",
          texto: "SE estiver chovendo, eu levo o guarda-chuva. SENÃO, eu vou de óculos de sol. Repare que só um dos dois caminhos é seguido — nunca os dois ao mesmo tempo, e nunca nenhum dos dois.",
        },
        {
          tipo: "texto",
          texto: "Em forma de fluxograma, a estrutura de decisão do exercício \"verificador de maioridade\" (que vamos programar mais abaixo) fica assim:",
        },
        {
          tipo: "texto",
          texto: "INÍCIO │ ▼ leia a idade │ ▼ ┌─────────────┐ │ idade >= 18 ?│ └──────┬──────┘ SIM │ NÃO ┌──────┘ └──────┐ ▼ ▼ \"Você já é \"Você ainda é maior de menor de idade!\" idade.\" │ │ └────────┬─────────┘ ▼ FIM",
        },
        {
          tipo: "texto",
          texto: "A mesma lógica pode ser resumida em uma tabela de casos — muito útil para organizar o raciocínio antes de escrever o código:",
        },
        {
          tipo: "tabela",
          colunas: ["Condição testada","Resultado (o que o programa faz)"],
          linhas: [
            ["SE (idade >= 18)","Exibe \"Maior de idade\""],
            ["SENÃO","Exibe \"Menor de idade\""],
          ],
        },
        {
          tipo: "texto",
          texto: "Em Portugol, a sintaxe é:",
        },
        {
          tipo: "codigo",
          conteudo: `se (condição) {
    // executado quando a condição é VERDADEIRA
} senao {
    // executado quando a condição é FALSA
}`,
        },
      ],
    },
    {
      id: "mao-na-massa-com-o-portugol",
      titulo: "Mão na massa com o Portugol",
      blocos: [
        {
          tipo: "texto",
          texto: "Para treinar lógica sem se preocupar com a sintaxe exata de uma linguagem real (como Python ou Java), vamos usar o Portugol: uma pseudolinguagem de programação escrita em português. Ele usa os mesmos conceitos de qualquer linguagem — variáveis, entrada e saída de dados, decisões — só que com palavras em português, o que ajuda a focar no raciocínio lógico em vez de decorar sintaxe.",
        },
        {
          tipo: "texto",
          texto: "Todo programa em Portugol segue esta estrutura básica:",
        },
        {
          tipo: "codigo",
          conteudo: `programa {
    funcao inicio() {
        // seu código vai aqui dentro
    }
}`,
        },
        {
          tipo: "texto",
          texto: "Os comandos mais usados são escreva(), que exibe uma mensagem ou valor na tela, e leia(), que lê um valor digitado pelo usuário e guarda dentro de uma variável.",
        },
      ],
    },
    {
      id: "atividades-praticas",
      titulo: "Atividades práticas",
      blocos: [
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Atividade 1 · Olá, Mundo! O primeiro passo de todo programador é fazer o computador \"falar\" alguma coisa na tela. Este é tradicionalmente o primeiro programa que qualquer pessoa escreve ao aprender a programar. programa { funcao inicio() { escreva(\"Olá, Mundo! Meu primeiro programa!\") } } O comando escreva é responsável por exibir mensagens na tela. Tudo o que estiver entre aspas é tratado como texto literal e aparece exatamente como foi escrito.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Atividade 2 · Somando dois números Aqui aprendemos o fluxo mais comum de qualquer programa: ler dados do usuário, processar esses dados e mostrar o resultado. inteiro n1, n2, soma escreva(\"Digite o primeiro número: \") leia(n1) escreva(\"Digite o segundo número: \") leia(n2) soma = n1 + n2 escreva(\"A soma é: \", soma) Primeiro declaramos três caixas do tipo inteiro: n1, n2 e soma. Depois pedimos e lemos os dois números digitados, guardamos o resultado da soma na variável soma, e por fim mostramos o resultado na tela.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Atividade 3 · Verificador de maioridade Agora juntamos leitura de dados com a estrutura de decisão se / senao explicada acima. inteiro idade escreva(\"Digite sua idade: \") leia(idade) se (idade >= 18) { escreva(\"Você já é maior de idade!\") } senao { escreva(\"Você ainda é menor de idade.\") } O programa lê a idade digitada e testa a condição idade >= 18. Se for verdadeira, executa o primeiro bloco; se for falsa, executa o bloco depois do senao. Nunca os dois ao mesmo tempo.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Atividade 4 (novo) · Par ou ímpar Um exercício clássico para praticar o operador de resto da divisão (também chamado de operador módulo, representado por %). O resto da divisão de um número por 2 só pode ser 0 (número par) ou 1 (número ímpar) — é exatamente essa propriedade que vamos usar. inteiro numero, resto escreva(\"Digite um número inteiro: \") leia(numero) resto = numero % 2 se (resto == 0) { escreva(numero, \" é um número PAR.\") } senao { escreva(numero, \" é um número ÍMPAR.\") } Lemos o número, calculamos o resto da divisão por 2 e guardamos em resto. Se resto for igual a 0, o número é par; caso contrário, é ímpar. Note o uso de == (dois sinais de igual) para comparar valores — diferente de um único =, que atribui um valor a uma variável.",
        },
        {
          tipo: "nota",
          variante: "desafio",
          texto: "Atividade 5 (novo) · Média de duas notas Um exercício que combina cálculo com números decimais (real) e uma decisão baseada no resultado — muito parecido com o que um sistema acadêmico faz de verdade. real nota1, nota2, media escreva(\"Digite a primeira nota: \") leia(nota1) escreva(\"Digite a segunda nota: \") leia(nota2) media = (nota1 + nota2) / 2 se (media >= 6) { escreva(\"Aprovado! Média: \", media) } senao { escreva(\"Reprovado. Média: \", media) } As notas são guardadas como real porque podem ter casas decimais (ex: 7,5). Calculamos a média somando as duas notas e dividindo por 2, e depois usamos se / senao para decidir a mensagem final, considerando 6 como nota mínima para aprovação.",
        },
        {
          tipo: "texto",
          texto: "Para praticar mais:",
        },
      ],
    },
  ],
};

export default atividade;
