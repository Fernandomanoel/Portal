import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

const OPCOES_INTERNO_EXTERNO = [
  { valor: "interno", texto: "Recrutamento Interno" },
  { valor: "externo", texto: "Recrutamento Externo" },
];

const OPCOES_ORDEM = [
  { valor: "1", texto: "1" },
  { valor: "2", texto: "2" },
  { valor: "3", texto: "3" },
  { valor: "4", texto: "4" },
  { valor: "5", texto: "5" },
];

const OPCOES_DOCUMENTO_ADMISSIONAL = [
  { valor: "obrigatorio", texto: "Documento admissional obrigatório" },
  { valor: "nao", texto: "Não é documento admissional" },
];

const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade Prática: Gestão de Pessoas I — Recrutamento, Seleção e Onboarding",
  introducao:
    "Fundamentos de RH: descrição de cargo, recrutamento interno x externo, etapas do processo seletivo, documentação admissional obrigatória e integração (onboarding) do novo colaborador. Preencha os campos diretamente na página e use o botão \"Corrigir atividade\" para conferir: campos com resposta objetiva são conferidos de verdade, e os demais são checados quanto ao preenchimento real (digitação aleatória é identificada e invalidada).",
  itens: [
    {
      id: "descricao-cargo",
      titulo: "Abertura de Vaga e Descrição do Cargo",
      cenario:
        "O gestor da área de vendas pediu a abertura de uma vaga para Analista de Vendas Pleno, pois um colaborador pediu demissão. Antes de divulgar a vaga, o RH precisa redigir a descrição do cargo.",
      campos: [
        {
          id: "descricao-cargo",
          placeholder:
            "Descreva os principais requisitos (hard e soft skills) e as responsabilidades do cargo de Analista de Vendas Pleno...",
          regra: { tipo: "texto", minPalavras: 4, minCaracteres: 20, palavrasChave: /requisit|responsab|habilidad|compet|experi|conhecim|funç/i },
          mensagemErrada: "Descreva os requisitos (habilidades/experiência) e as responsabilidades do cargo.",
        },
      ],
    },
    {
      id: "recrutamento-interno-externo",
      titulo: "Recrutamento Interno vs. Recrutamento Externo",
      instrucao: "A empresa tem duas vagas abertas ao mesmo tempo. Escolha, para cada uma, a estratégia de recrutamento mais adequada.",
      campos: [
        {
          id: "recrutamento-coordenador-ti",
          rotulo: "Coordenador de TI: a empresa quer aproveitar quem já conhece os sistemas internos e reter um talento que já está se destacando.",
          regra: { tipo: "selecao", esperado: "interno", opcoes: OPCOES_INTERNO_EXTERNO },
          mensagemCerta: "Correto! Reter e aproveitar quem já conhece a empresa pede recrutamento interno; buscar ideias novas pede recrutamento externo.",
          mensagemErrada: "Incorreto. Revise qual situação pede recrutamento interno e qual pede externo.",
        },
        {
          id: "recrutamento-analista-marketing",
          rotulo: "Analista de Marketing Digital: a empresa quer trazer ideias novas e experiências que a equipe atual ainda não tem.",
          regra: { tipo: "selecao", esperado: "externo", opcoes: OPCOES_INTERNO_EXTERNO },
          mensagemCerta: "Correto! Reter e aproveitar quem já conhece a empresa pede recrutamento interno; buscar ideias novas pede recrutamento externo.",
          mensagemErrada: "Incorreto. Revise qual situação pede recrutamento interno e qual pede externo.",
        },
      ],
    },
    {
      id: "ordem-processo-seletivo",
      titulo: "Ordem das Etapas do Processo Seletivo",
      instrucao: "Numere de 1 a 5 a ordem correta em que essas etapas normalmente acontecem em um processo seletivo.",
      campos: [
        {
          id: "ordem-divulgacao",
          rotulo: "Divulgação da vaga (site de empregos, LinkedIn, mural interno)",
          regra: { tipo: "selecao", esperado: "1", opcoes: OPCOES_ORDEM },
          mensagemCerta: "Ordem correta: divulgação, triagem, entrevista com RH, entrevista técnica e, por fim, exame admissional.",
          mensagemErrada: "Ordem incorreta. Revise a sequência do processo seletivo.",
        },
        {
          id: "ordem-triagem",
          rotulo: "Triagem de currículos recebidos",
          regra: { tipo: "selecao", esperado: "2", opcoes: OPCOES_ORDEM },
          mensagemCerta: "Ordem correta: divulgação, triagem, entrevista com RH, entrevista técnica e, por fim, exame admissional.",
          mensagemErrada: "Ordem incorreta. Revise a sequência do processo seletivo.",
        },
        {
          id: "ordem-entrevista-rh",
          rotulo: "Entrevista inicial com o RH",
          regra: { tipo: "selecao", esperado: "3", opcoes: OPCOES_ORDEM },
          mensagemCerta: "Ordem correta: divulgação, triagem, entrevista com RH, entrevista técnica e, por fim, exame admissional.",
          mensagemErrada: "Ordem incorreta. Revise a sequência do processo seletivo.",
        },
        {
          id: "ordem-entrevista-tecnica",
          rotulo: "Entrevista técnica com o gestor da área",
          regra: { tipo: "selecao", esperado: "4", opcoes: OPCOES_ORDEM },
          mensagemCerta: "Ordem correta: divulgação, triagem, entrevista com RH, entrevista técnica e, por fim, exame admissional.",
          mensagemErrada: "Ordem incorreta. Revise a sequência do processo seletivo.",
        },
        {
          id: "ordem-admissional",
          rotulo: "Exame admissional e contratação",
          regra: { tipo: "selecao", esperado: "5", opcoes: OPCOES_ORDEM },
          mensagemCerta: "Ordem correta: divulgação, triagem, entrevista com RH, entrevista técnica e, por fim, exame admissional.",
          mensagemErrada: "Ordem incorreta. Revise a sequência do processo seletivo.",
        },
      ],
    },
    {
      id: "documentacao-admissional",
      titulo: "Documentação Admissional Obrigatória",
      instrucao: "Antes do primeiro dia do novo colaborador, o RH monta o checklist de documentos. Classifique cada item abaixo.",
      campos: [
        {
          id: "documento-ctps",
          rotulo: "Carteira de Trabalho (CTPS)",
          regra: { tipo: "selecao", esperado: "obrigatorio", opcoes: OPCOES_DOCUMENTO_ADMISSIONAL },
          mensagemCerta: "Correto! CTPS, ASO, RG e CPF são documentos admissionais; o currículo é usado só na seleção.",
          mensagemErrada: "Incorreto. Revise quais itens são realmente documentos admissionais.",
        },
        {
          id: "documento-aso",
          rotulo: "Exame médico admissional (ASO)",
          regra: { tipo: "selecao", esperado: "obrigatorio", opcoes: OPCOES_DOCUMENTO_ADMISSIONAL },
          mensagemCerta: "Correto! CTPS, ASO, RG e CPF são documentos admissionais; o currículo é usado só na seleção.",
          mensagemErrada: "Incorreto. Revise quais itens são realmente documentos admissionais.",
        },
        {
          id: "documento-curriculo",
          rotulo: "Currículo do candidato, usado durante a seleção",
          regra: { tipo: "selecao", esperado: "nao", opcoes: OPCOES_DOCUMENTO_ADMISSIONAL },
          mensagemCerta: "Correto! CTPS, ASO, RG e CPF são documentos admissionais; o currículo é usado só na seleção.",
          mensagemErrada: "Incorreto. Revise quais itens são realmente documentos admissionais.",
        },
        {
          id: "documento-rg-cpf",
          rotulo: "RG e CPF",
          regra: { tipo: "selecao", esperado: "obrigatorio", opcoes: OPCOES_DOCUMENTO_ADMISSIONAL },
          mensagemCerta: "Correto! CTPS, ASO, RG e CPF são documentos admissionais; o currículo é usado só na seleção.",
          mensagemErrada: "Incorreto. Revise quais itens são realmente documentos admissionais.",
        },
      ],
    },
    {
      id: "onboarding-primeira-semana",
      titulo: "Onboarding Estruturado nos Primeiros Dias",
      cenario: "O novo Analista de Vendas Pleno começa na próxima segunda-feira. Descreva como deve ser a integração (onboarding) dele na primeira semana.",
      campos: [
        {
          id: "onboarding-primeira-semana",
          placeholder:
            "Descreva pontos como apresentação da empresa e da equipe, liberação de acessos e sistemas, treinamento inicial e acompanhamento do gestor nos primeiros dias...",
          regra: { tipo: "texto", minPalavras: 5, minCaracteres: 25, palavrasChave: /apresentaç|acesso|treinament|acompanhament|gestor|equipe|integraç|sistema/i },
          mensagemErrada: "Mencione apresentação da equipe, liberação de acessos, treinamento inicial e acompanhamento do gestor.",
        },
      ],
    },
  ],
};

export default atividade;
