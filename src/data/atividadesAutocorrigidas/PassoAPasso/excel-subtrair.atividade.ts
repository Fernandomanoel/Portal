import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { contaNoExcel } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Tirar com o sinal de menos",
  introducao: "Você vai pedir para o Excel tirar um número do outro: 10 menos 3.",
  itens: contaNoExcel({
    prefixo: "excel-sub",
    a: "10",
    b: "3",
    sinal: "-",
    resultado: "7",
    sinalFalado: "menos",
    nomeDoSinal: "menos",
    tecla: {
      texto: "Agora o sinal de menos. Aperte a tecla do risquinho, do lado direito do número 0.",
      desenho: "tecla-menos",
      alt: "A tecla do sinal de menos, desenhada grande",
    },
  }),
};

export default atividade;
