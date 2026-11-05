import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O assistente de saúde bucal apoia o dentista no consultório: recepciona o paciente, prepara o ambiente e os instrumentos, cuida da biossegurança e da esterilização, auxilia nos procedimentos e organiza os registros. As normas profissionais e sanitárias mudam: consulte as vigentes e as do conselho da categoria.",
  topicos: [
    {
      titulo: "A equipe odontológica e o papel do assistente",
      texto: [
        "A equipe é formada pelo cirurgião-dentista (responsável pelos diagnósticos e procedimentos), o técnico em saúde bucal (TSB), o auxiliar em saúde bucal (ASB) e a recepção. O assistente prepara, auxilia e organiza; não realiza procedimentos privativos do dentista. Postura ética, sigilo das informações e cuidado com o paciente são deveres.",
      ],
      pontos: ["Diferenciar as funções da equipe.", "Dizer o que não cabe ao assistente."],
    },
    {
      titulo: "Anatomia e saúde bucal básicas",
      texto: [
        "A boca é formada por dentes, gengiva, língua e mucosas. Os dentes têm coroa (a parte visível), colo e raiz, com esmalte, dentina e polpa. Os adultos têm 32 dentes (e as crianças, 20 de leite). As principais doenças são a cárie (destruição do dente por ácidos de bactérias) e a doença periodontal (inflamação da gengiva). A prevenção inclui escovação, fio dental, alimentação equilibrada, flúor e visitas regulares ao dentista.",
      ],
      pontos: ["Nomear partes do dente.", "Explicar como se previnem cárie e gengivite."],
    },
    {
      titulo: "Biossegurança e controle de infecção",
      texto: [
        "Biossegurança protege pacientes e profissionais. Inclui as precauções-padrão (tratar todo paciente como potencialmente infectante): lavagem das mãos, uso de equipamentos de proteção (luvas, máscara, óculos, avental e gorro), descarte correto de perfurocortantes em caixas próprias e vacinação do profissional. As superfícies são limpas e desinfetadas entre os pacientes.",
      ],
      pontos: ["Listar os EPIs do consultório.", "Descrever o descarte de perfurocortantes."],
      erros: ["Reencapar agulhas com as mãos.", "Usar a mesma luva entre pacientes."],
    },
    {
      titulo: "Instrumentais e esterilização",
      texto: [
        "O instrumental passa por etapas: lavagem (remoção da sujeira), secagem, embalagem, esterilização (autoclave, por vapor sob pressão) e armazenamento em local limpo. Os indicadores (fitas e testes) comprovam que o ciclo funcionou. O instrumental estéril só é aberto na hora do uso. Conheça os instrumentos básicos: espelho clínico, sonda, pinça e escavador.",
      ],
      pontos: ["Seguir as etapas do processamento do instrumental.", "Explicar para que servem os indicadores de esterilização."],
    },
    {
      titulo: "Auxílio ao dentista, atendimento e registros",
      texto: [
        "Na cadeira, o assistente prepara o campo e os materiais, passa o instrumento certo, faz a sucção, mantém a ergonomia (postura correta) e a comunicação com o dentista. Na recepção e no consultório: acolhe o paciente, confirma a agenda e cuida do prontuário (o registro do tratamento), que é sigiloso e deve ser guardado com segurança.",
      ],
      pontos: ["Explicar o papel do prontuário.", "Descrever a preparação da cadeira para um atendimento."],
    },
  ],
  glossario: [
    { termo: "Biossegurança", definicao: "Medidas que protegem pacientes e profissionais contra riscos." },
    { termo: "Autoclave", definicao: "Equipamento que esteriliza com vapor sob pressão." },
    { termo: "Perfurocortante", definicao: "Material que fura ou corta, como agulhas e lâminas." },
    { termo: "Prontuário", definicao: "Registro do histórico e do tratamento do paciente." },
    { termo: "Cárie", definicao: "Destruição do dente causada por ácidos de bactérias." },
  ],
  dicas: [
    "Dê muita ênfase à biossegurança: é o ponto em que o erro tem mais consequências.",
    "Treine a sequência de paramentação (colocar e tirar EPIs) na prática.",
    "Se houver um consultório parceiro, uma visita guiada vale mais do que muitas aulas.",
  ],
};

export default conteudo;
