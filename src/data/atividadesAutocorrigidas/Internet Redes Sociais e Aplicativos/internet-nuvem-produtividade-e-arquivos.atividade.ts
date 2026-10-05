import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { associar, calculos, escolha, resposta } from "../ajudantes";

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
    escolha({
      id: "link-publico",
      titulo: "Cuidado com o link",
      instrucao: "Um arquivo com dados de clientes foi compartilhado como «Qualquer pessoa com o link pode editar». O que está errado?",
      opcoes: [
        "Nada: é a configuração mais segura.",
        "Qualquer um que receba o link acessa e altera dados sensíveis; o certo é restringir a pessoas específicas.",
        "O arquivo ficou lento.",
        "O link não funciona.",
      ],
      correta: 1,
      explicacao: "Dados sensíveis pedem acesso restrito a pessoas nomeadas, com a permissão mínima necessária.",
    }),
    escolha({
      id: "versoes",
      titulo: "Trabalho em conjunto",
      instrucao: "Qual é a vantagem de editar um documento na nuvem em vez de enviar anexos por e-mail?",
      opcoes: [
        "Cada pessoa fica com uma versão diferente.",
        "Todos trabalham na mesma versão, com histórico de alterações.",
        "O documento fica sem proteção.",
        "É preciso instalar mais programas.",
      ],
      correta: 1,
      explicacao: "Uma única versão atualizada evita o clássico «relatório_final_v7_revisado_agora_vai.docx».",
    }),
    resposta({
      id: "organizar",
      titulo: "Organize as pastas",
      instrucao: "Descreva como você organizaria as pastas na nuvem de um pequeno escritório (mínimo de 3 pastas e o que vai em cada uma).",
      rotulo: "Sua estrutura",
      placeholder: "Ex.: Financeiro (notas e contratos), Clientes (propostas), RH (documentos dos colaboradores)...",
      minPalavras: 8,
    }),
  ],
};

export default atividade;
