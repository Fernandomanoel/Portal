# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Alunos de cursos profissionalizantes de informática, acessando principalmente nos
computadores do laboratório da escola durante a aula, para abrir a atividade do dia
(PDF, slide, planilha, link ou página de exercício) e para responder provas.

Instrutores são o segundo público: usam a área de Provas para distribuir provas e a
área do professor (com login) para ver quem enviou, baixar o arquivo anexado, ler as
respostas e lançar a nota.

Uma terceira frente é o público da seção "Passo a Passo": crianças e pessoas com
dificuldade de leitura ou de interpretação de texto, incluindo pessoas no espectro
autista. Precisam de tarefas bem pequenas dentro dos programas reais (Windows, Word,
Excel, PowerPoint) e de noções básicas de inteligência artificial e segurança
digital — narradas em voz, com imagem de onde clicar ou do que reconhecer, e
feedback positivo a cada passo concluído.

## Product Purpose

Centralizar o material de aula em um endereço único, para que o aluno chegue na
atividade certa sem depender de pendrive, e-mail ou do instrutor passar arquivo a
arquivo. O portal também hospeda as provas — desde arquivos para download até provas
interativas respondidas dentro do próprio site.

Sucesso é o aluno abrir o portal e chegar ao material do dia em poucos cliques, sem
precisar de explicação.

## Positioning

Conteúdo mora em arquivos de dados, nunca no HTML: adicionar um curso ou um PDF é
editar um catálogo, não criar páginas. Uma tela genérica serve todos os cursos
(antes havia ~20 HTMLs duplicados, um por curso). Isso mantém o custo de adicionar
conteúdo próximo de zero para quem não é programador.

## Operating Context

- Laboratório da escola é o cenário principal, mas o portal precisa funcionar bem
  também em celular e tablet — não apenas "não quebrar".
- O instrutor conduz a aula e aponta o aluno para a atividade; o aluno navega sozinho
  a partir dali.
- O aluno se identifica digitando o nome antes de começar; não existe login de aluno.
- Provas de múltipla escolha são corrigidas pelo servidor no envio e o aluno vê a nota
  na hora; o gabarito não chega ao navegador. Descritivas e práticas ficam "a corrigir"
  até o professor lançar a nota na área dele.
- Algumas provas pedem arquivo (a planilha do Excel), outras não; é regra de cada
  prova.

## Capabilities and Constraints

- Catálogo de atividades por curso, com materiais tipados: `pdf`, `doc`, `planilha`,
  `slides`, `link`.
- Área de Provas com listagem por categoria, busca por curso ou nome de arquivo, e
  três formatos de prova: arquivo comum (download), prova interativa dentro do portal
  (múltipla escolha ou descritiva) e página HTML autossuficiente.
- Durante uma prova em andamento a interface trava: menu, rodapé e botão de voltar
  desaparecem e o navegador avisa antes de fechar ou recarregar. A saída só volta
  depois do envio.
- Prova travada (o padrão; a de IA, por exemplo, desliga) abre em tela cheia e, se o
  aluno trocar de aba, de janela ou sair da tela cheia, bloqueia até um professor
  digitar usuário e senha. O navegador não impede a saída — a trava denuncia e
  bloqueia, e cada saída fica registrada no envio.
- Envios e arquivos são apagados sozinhos 7 dias depois do envio.
- Listas de acompanhamento na área do professor: planilha simples da equipe
  (colunas de texto, marca, Sim/Não e lista de opções; linhas com cor e
  negrito), compartilhada entre todos os professores, salva sozinha, guardada
  até alguém apagar e exportável em .xlsx. Substitui as listas do SharePoint,
  que derrubava a sessão por política de segurança.
- Aba «Conteúdos» na área do professor: a teoria de cada curso, na ordem das
  atividades (explicação, o que o aluno precisa saber, exemplos, erros comuns,
  glossário e dicas de como conduzir a aula), para quem ensina um assunto fora
  da sua área. Cobre todos os cursos, menos os do pacote Office. Um arquivo por
  curso em `src/data/conteudosProfessor/`, carregado só quando a página abre.
- Várias unidades usam o mesmo portal sem misturar os dados. Na aba Provas
  escolhe-se a unidade na lista e digita-se a senha dela: o servidor confere e devolve
  uma ficha assinada que o envio da prova leva junto, então as provas vão para a
  unidade escolhida. Cada professor (usuário e senha próprios, sessão por cookie) pertence a uma
  unidade e só vê envios, arquivos, notas e listas dela; a coordenação (`*`) vê todas
  e escolhe a unidade no topo. Envios e listas anteriores às unidades pertencem à
  unidade padrão.
- Modo claro e escuro são parte do produto, não um extra.
- Seção "Passo a Passo": tutoriais de um micro-passo por tela (indicador "passo X
  de Y", imagem por passo, narração por voz do navegador só quando a pessoa clica,
  recompensa leve a cada passo — só o texto "Muito bem!", sem som nem
  estrela, porque repetidos a cada passo cansam) e jogos de conceito básico de informática. Tem
  identidade visual própria — mais previsível e com menos estímulo que o resto do
  portal: "Voltar" sempre à esquerda e "Próximo" sempre à direita, com cor fixa
  por tipo de ação, e sem menu do portal na tela de execução. A escolha da
  atividade é uma vitrine em fileiras, no jeito de app de streaming. Sem correção
  automática e sem nota.
- **Nesta fase de reconstrução nenhum conteúdo de atividade ou prova é criado**: as
  telas nascem com catálogo vazio, então os estados vazios são o estado padrão e
  precisam ser tratados como tela de primeira classe.

## Brand Commitments

- Nome interno do projeto: MicroAtividades / Portal de Atividades.
- Paleta existente é vinculante como base (azul `#4f7cff`, azul escuro `#1e40af`,
  neutros claros e o par de feedback verde/vermelho das provas). O redesign pode
  ampliar o uso do azul escuro, mas não trocar as cores base.
- **Preferência permanente de direção visual: a convenção da categoria.** Diante de
  três direções (sinalização de escola técnica, apostila com abas indexadas, e o
  dashboard de curso online), o usuário escolheu deliberadamente o padrão da
  categoria. Isso é um compromisso, não uma falta de direção: o portal usa o
  vocabulário que todo portal de curso usa — navegação lateral ou superior
  persistente, grade de cards de curso, ícone por categoria, estados de progresso —
  executado com acabamento de primeira linha, sem ironia e sem excentricidade
  contrabandeada.
- **Régua de acabamento confirmada:** Google Classroom (densidade de informação
  limpa, tipografia de sistema bem resolvida, ornamento mínimo), Linear/Vercel
  (espaçamento preciso, estados bem desenhados, modo escuro de primeira classe) e
  Coursera/Udemy (vocabulário de card de curso com capa, metadados e progresso). O
  portal precisa poder sentar ao lado desses três sem parecer inferior.

## Evidence on Hand

- Catálogo atual em `js/data/atividades.js` e manifesto de provas gerado em
  `js/data/provas-data.js` (fonte para migração futura; **não** migrados nesta fase).
- Arquivos reais de conteúdo em `atividades/pdfs/`, `atividades/slides/` e
  `provas/<curso>/`, além de capas em `img/` e ícones em `images/cursos/`.
- Formato das provas interativas documentado em `COMO-CRIAR-PROVAS.md`.
- Existe um servidor só para as provas (`servidor/`, ver `docs/SERVIDOR.md`), com
  armazenamento no Vercel Blob ou em disco no servidor físico da escola. Não existe
  banco relacional nem login de aluno.

## Product Principles

1. Adicionar conteúdo é editar dados, nunca criar tela. Qualquer decisão de design que
   exija um arquivo novo por curso está errada.
2. O aluno chega pelo caminho mais curto até o material do dia; navegação é meio, não
   destino.
3. Prova em andamento é um estado protegido: nada na interface convida a sair dela.
4. Honestidade sobre o que o portal garante — a senha de provas e a correção no
   navegador são convenções de sala de aula, não mecanismos de segurança.
5. O laboratório é o cenário principal, mas nenhuma tela pode ser hostil no celular.

## Accessibility & Inclusion

Uso em laboratório com hardware e telas variadas; suporte a modo claro e escuro é
requisito de produto. Alvo de contraste WCAG AA nos dois temas.
