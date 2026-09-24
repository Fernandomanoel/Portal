import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { contaNoExcel } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Dividir com a barra",
  introducao: "Você vai pedir para o Excel fazer uma conta de dividir: 20 dividido por 4. No computador, o sinal de dividir é uma barra inclinada: /.",
  itens: contaNoExcel({
    prefixo: "excel-div",
    a: "20",
    b: "4",
    sinal: "/",
    resultado: "5",
    sinalFalado: "dividido por",
    nomeDoSinal: "dividir",
    tecla: {
      texto: "Agora o sinal de dividir. Aperte a tecla da barra. Ela fica do lado esquerdo da tecla Shift da direita.",
      desenho: "tecla-dividir",
      alt: "A tecla da barra, desenhada grande",
    },
  }),
};

export default atividade;
