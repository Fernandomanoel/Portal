import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { escolha, calculos, associar, resposta, planilha, dissertativa, somar } from "../ajudantes";

const PASTAS = [
  ["Financeiro", 18.5],
  ["Clientes e contratos", 24.2],
  ["Marketing (fotos e vídeos)", 41.8],
  ["Recursos Humanos", 6.3],
  ["Backups antigos", 12.7],
  ["Projetos concluídos", 9.5],
];
const USADO = somar(PASTAS.map((l) => l[1] as number));

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Internet — Ferramentas na Nuvem e Compartilhamento de Arquivos",
  introducao:
    "Documentos, planilhas e apresentações podem viver na nuvem e ser editados por várias pessoas ao mesmo tempo. Aprenda a organizar, compartilhar e controlar quem pode fazer o quê.",
  itens: [
    escolha({
      id: "o-que-e-nuvem",
      titulo: "O que é a nuvem",
      instrucao: "O que significa guardar um arquivo «na nuvem»?",
      opcoes: [
        "Salvar o arquivo somente no pen drive.",
        "Guardá-lo em servidores na internet, acessíveis de qualquer dispositivo com login.",
        "Apagar o arquivo do computador sem backup.",
        "Imprimi-lo em papel especial.",
      ],
      correta: 1,
      explicacao: "Na nuvem o arquivo fica em servidores do provedor, o que permite acessar de vários aparelhos e trabalhar em conjunto.",
    }),
    associar({
      id: "permissoes",
      titulo: "Permissões de compartilhamento",
      instrucao: "Escolha a permissão mais adequada para cada pessoa.",
      opcoes: ["Leitor (só visualiza)", "Comentarista (comenta, não edita)", "Editor (altera o conteúdo)"],
      linhas: [
        { id: "cliente", rotulo: "Um cliente que só precisa ver a proposta final.", correta: 0 },
        { id: "revisor", rotulo: "Um revisor que vai sugerir ajustes sem mexer no texto.", correta: 1 },
        { id: "colega", rotulo: "Um colega que escreve a seção 3 do documento junto com você.", correta: 2 },
      ],
      explicacao: "Dê sempre a menor permissão necessária: reduz o risco de alterações e exclusões acidentais.",
    }),
    calculos({
      id: "espaco",
      titulo: "Espaço de armazenamento",
      cenario: "A conta tem 15 GB de espaço. Já foram usados 9,6 GB, e você vai enviar uma pasta de 3,8 GB.",
      instrucao: "Calcule o espaço livre hoje e o que sobrará depois do envio.",
      campos: [
        { id: "livre", rotulo: "Espaço livre agora (GB)", esperado: 5.4, explicacao: "15 − 9,6 = 5,4 GB." },
        { id: "sobra", rotulo: "Sobra após o envio (GB)", esperado: 1.6, explicacao: "5,4 − 3,8 = 1,6 GB." },
      ],
    }),
    resposta({
      id: "organizar",
      titulo: "Organize as pastas",
      instrucao: "Descreva como você organizaria as pastas na nuvem de um pequeno escritório (mínimo de 3 pastas e o que vai em cada uma).",
      rotulo: "Sua estrutura",
      placeholder: "Ex.: Financeiro (notas e contratos), Clientes (propostas), RH (documentos dos colaboradores)...",
      minPalavras: 15,
    }),
    planilha({
      id: "inventario",
      titulo: "Planilha: inventário do armazenamento na nuvem",
      cenario: "A empresa tem uma conta de nuvem com cota de 150 GB. O levantamento do espaço ocupado por pasta está abaixo. Cole a planilha no Excel e resolva.",
      colunas: ["Pasta", "Tamanho (GB)"],
      linhas: PASTAS,
      instrucao: "Calcule:",
      tarefas: [
        { id: "usado", rotulo: "Espaço total usado (GB)", valor: USADO, explicacao: "Soma da coluna Tamanho." },
        { id: "livre", rotulo: "Espaço livre da cota de 150 GB (GB)", valor: 150 - USADO, explicacao: "150 menos o espaço usado." },
        { id: "percentual", rotulo: "Percentual da cota já ocupado (%)", valor: (USADO / 150) * 100, explicacao: "Usado ÷ 150 × 100." },
        { id: "liberar", rotulo: "Quanto liberar para ficar com 60% da cota ocupada (GB)", valor: USADO - 150 * 0.6, explicacao: "60% de 150 = 90 GB; usado menos 90." },
      ],
    }),
    dissertativa({
      id: "organizar-nuvem",
      titulo: "Plano de organização e permissões",
      instrucao: "Escreva o plano para organizar a nuvem da empresa e liberar espaço, a partir do inventário.",
      deve: [
        "Diga quais pastas você revisaria primeiro para liberar espaço e o que faria com cada uma (arquivar, compactar, excluir).",
        "Explique quem deve ter acesso a cada pasta e com qual permissão (leitor, comentarista, editor).",
        "Cite uma regra de nomes ou de versões que evite arquivos duplicados.",
      ],
      chave: /(permiss|editor|leitor|arquiv|exclu|compact|backup|nome|vers[aã]o|acesso)/i,
    }),
  ],
};

export default atividade;
