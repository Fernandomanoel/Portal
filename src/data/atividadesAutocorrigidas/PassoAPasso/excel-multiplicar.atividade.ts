import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";
import { contaNoExcel } from "./passosComuns";

const atividade: AtividadeAutocorrigida = {
  titulo: "Multiplicar com o asterisco",
  introducao: "Você vai pedir para o Excel fazer uma conta de vezes: 4 vezes 3. No computador, o sinal de vezes é uma estrelinha chamada asterisco.",
  itens: contaNoExcel({
    prefixo: "excel-mult",
    a: "4",
    b: "3",
    sinal: "*",
    resultado: "12",
    sinalFalado: "vezes",
    nomeDoSinal: "vezes",
    tecla: {
      texto: "Agora o sinal de vezes. Segure a tecla Shift e aperte o número 8. Sai o asterisco.",
      desenho: "tecla-vezes",
      alt: "Tecla Shift e tecla do número 8 desenhadas grandes: juntas dão o asterisco",
    },
  }),
};

export default atividade;
