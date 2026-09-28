import type { ProvaInterativa } from "@/types/quiz";

/**
 * Portada de Portal-Atividades (provas/Windows 11/avaliacao-windows11-completa.prova.html):
 * mesma sequência de tarefas, nomes de arquivo de print e de pasta, só
 * reorganizada como lista linear para o molde de prova prática.
 */
const prova: ProvaInterativa = {
  tipo: "pratica",
  titulo: "Windows 11 — Avaliação Completa",
  instrucoes: [
    "Nesta avaliação você vai executar tarefas de personalização, organização de arquivos e uso de ferramentas nativas do Windows 11. A cada tarefa concluída, tire uma captura de tela com Windows + Shift + S e salve temporariamente na Área de Trabalho, nomeando o arquivo exatamente como pedido.",
    "Tarefa 1 — Tema e Plano de Fundo: em Configurações → Personalização → Cores, mude \"Escolha seu modo\" para Escuro; depois em Personalização → Tela de Fundo, mude de Imagem para Cor Sólida e escolha Azul ou Cinza.",
    "Tire um print da tela inteira mostrando a janela de Configurações no modo escuro com a cor sólida selecionada e salve como Print1_Tema.png.",
    "Tarefa 2 — Cores de Destaque: ainda em Personalização → Cores, mude \"Cor de destaque\" de Automático para Manual, escolha uma cor vibrante (Verde, Laranja ou Amarelo) e ative \"Mostrar a cor de destaque nas barras de título e nas bordas das janelas\".",
    "Tire um print evidenciando que a nova cor foi aplicada às bordas ou botões da janela de configurações e salve como Print2_CorDestaque.png.",
    "Tarefa 3 — Comportamento da Barra de Tarefas: em Personalização → Barra de Tarefas → Comportamentos da barra de tarefas, mude o Alinhamento da barra de tarefas de Centro para Esquerda (ou o contrário, conforme o estado atual).",
    "Tire um print mostrando a janela de configurações e a barra de tarefas já na nova posição e salve como Print3_BarraTarefas.png.",
    "Tarefa 4 — Configurações do Mouse: em Acessibilidade → Ponteiro do mouse e toque, escolha o estilo Personalizado, mude a cor do cursor para uma diferente da usada na Tarefa 2 e ajuste o Tamanho para o número 4.",
    "Tire um print garantindo que o cursor grande e colorido apareça na captura e salve como Print4_Mouse.png.",
    "Tarefa 5 — Multitarefas (Snap Layouts): abra a Calculadora e o Bloco de Notas; passe o mouse sobre o botão Maximizar do Bloco de Notas, escolha o layout de tela dividida em dois e selecione a Calculadora para o outro lado.",
    "Tire um print de tela cheia mostrando os dois aplicativos divididos meio a meio e salve como Print5_Janelas.png.",
    "Tarefa 6 — Gerenciamento de Pastas e Arquivos: no Explorador de Arquivos (Windows + E), dentro de Documentos, crie a pasta Avaliacao_Pratica_Sistema com as subpastas Imagens_Sistema e Relatorios.",
    "Dentro de Relatorios, crie um Documento de Texto chamado Anotacoes_Sistema, escreva \"Avaliação do Windows 11 concluída com sucesso.\", salve (Ctrl+S) e feche.",
    "Tire um print do Explorador de Arquivos mostrando as duas subpastas (Imagens_Sistema e Relatorios) criadas e salve como Print6_Pastas.png.",
    "Tarefa 7 — Empacotamento e entrega: recorte os 6 prints da Área de Trabalho (Ctrl + X) e cole dentro de Documentos → Avaliacao_Pratica_Sistema → Imagens_Sistema (Ctrl + V).",
    "Confirme que os 6 prints estão em Imagens_Sistema e que o documento de texto está em Relatorios.",
    "Volte para Documentos, clique com o botão direito na pasta Avaliacao_Pratica_Sistema e escolha \"Comprimir para arquivo ZIP\".",
    "Envie o arquivo Avaliacao_Pratica_Sistema.zip gerado, no campo abaixo.",
  ],
  envioArquivo: {
    obrigatorio: true,
    extensoes: [".zip"],
    rotulo: "Envie o arquivo .zip com as 6 capturas de tela e o relatório desta prova",
  },
};

export default prova;
