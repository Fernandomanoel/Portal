import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { contaNoExcel } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Somar com o sinal de mais",
  introducao: "Você vai pedir para o Excel somar dois números: 7 mais 5.",
  itens: contaNoExcel({
    prefixo: "excel-soma",
    a: "7",
    b: "5",
    sinal: "+",
    resultado: "12",
    sinalFalado: "mais",
    nomeDoSinal: "mais",
    tecla: {
      texto: "Agora o sinal de mais. Segure a tecla Shift e aperte a tecla do sinal de igual.",
      desenho: "tecla-mais",
      alt: "Tecla Shift e tecla do sinal de igual desenhadas grandes: juntas dão o sinal de mais",
    },
  }),
};

export default atividade;
