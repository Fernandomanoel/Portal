import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Windows 11/avaliacao-ferramentas-e-sistema.prova.html):
 * mesma sequência de tarefas e nomes de arquivo de print, só reorganizada
 * como lista linear para o molde de prova prática.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Windows 11 — Avaliação de Ferramentas e Sistema",
  instrucoes: [
    "Nesta avaliação você vai usar ferramentas do sistema, gerenciamento de recursos e produtividade no Windows 11. A cada tarefa concluída, tire uma captura de tela com Windows + Shift + S e salve temporariamente na Área de Trabalho, nomeando o arquivo exatamente como pedido.",
    "Tarefa 1 — Informações do sistema: abra as Configurações (Windows + I), fique na aba Sistema, role até o final e clique em Sobre.",
    "Tire um print mostrando as \"Especificações do Windows\" e salve como Print1_Sobre.png.",
    "Tarefa 2 — Gerenciador de Tarefas e Desempenho: pressione Ctrl + Shift + Esc para abrir o Gerenciador de Tarefas (clique em \"Mais detalhes\" se ele abrir pequeno), vá em Desempenho e clique em Memória para ver o gráfico de RAM.",
    "Tire um print do Gerenciador de Tarefas mostrando o gráfico de Memória e salve como Print2_Desempenho.png.",
    "Tarefa 3 — Sensor de Armazenamento: em Configurações → Sistema → Armazenamento, procure \"Gerenciamento de armazenamento\" e ative a chave do Sensor de Armazenamento.",
    "Tire um print garantindo que o Sensor de Armazenamento apareça ativado e salve como Print3_Armazenamento.png.",
    "Tarefa 4 — Áreas de Trabalho Virtuais: abra a Visão de Tarefas (Windows + Tab) e clique em \"+ Nova área de trabalho\" para criar a Área de trabalho 2, deixando a Visão de Tarefas aberta.",
    "Com a Visão de Tarefas aberta mostrando as duas áreas de trabalho, tire um print e salve como Print4_AreasVirtuais.png.",
    "Tarefa 5 — Organização do Menu Iniciar: pelo Iniciar, pesquise \"Painel de Controle\", fixe-o (botão direito → Fixar no Iniciar), apague a pesquisa e arraste o Painel de Controle recém-fixado para a primeira linha do menu.",
    "Tire um print do Menu Iniciar aberto mostrando o Painel de Controle fixado na primeira linha e salve como Print5_MenuIniciar.png.",
    "Tarefa 6 — Organização e entrega: no Explorador de Arquivos (Windows + E), dentro de Documentos, crie a pasta Avaliacao_Ferramentas_Win11 e, dentro dela, a subpasta Capturas_De_Tela.",
    "Recorte os 5 prints da Área de Trabalho (Ctrl + X) e cole dentro de Capturas_De_Tela (Ctrl + V).",
    "Volte para Documentos, clique com o botão direito na pasta Avaliacao_Ferramentas_Win11 e escolha \"Comprimir para arquivo ZIP\".",
    "Envie o arquivo Avaliacao_Ferramentas_Win11.zip gerado, no campo abaixo.",
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".zip"],
    rotulo: "Envie o arquivo .zip com as 5 capturas de tela desta prova",
  },
};

export default prova;
