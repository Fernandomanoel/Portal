/**
 * Gerador de dados fictícios para as atividades de «dia de trabalho»: com a mesma
 * semente sai sempre a mesma tabela, então a planilha que o aluno vê e o
 * gabarito calculado no arquivo da atividade nunca se separam.
 */
export function sorteio(semente: number) {
  let s = semente >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Sorteio = ReturnType<typeof sorteio>;

export const inteiro = (r: Sorteio, minimo: number, maximo: number) => Math.floor(r() * (maximo - minimo + 1)) + minimo;
export const decimal = (r: Sorteio, minimo: number, maximo: number, casas = 2) =>
  Math.round((minimo + r() * (maximo - minimo)) * 10 ** casas) / 10 ** casas;
export const sortear = <T>(r: Sorteio, lista: readonly T[]): T => lista[Math.floor(r() * lista.length)];

export const dataBR = (dia: number, mes: number, ano = 2025) =>
  `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${ano}`;

export const FORNECEDORES = ["Alfa Distribuidora", "Beta Suprimentos", "Gama Papéis", "Delta Industrial", "Ômega Atacado", "Sigma Logística", "Kappa Materiais", "Lambda Comercial"];
export const CLIENTES = ["Mercado Boa Compra", "Clínica Vida Plena", "Construtora Horizonte", "Escola Novo Saber", "Restaurante Sabor Caseiro", "Oficina Ponto Certo", "Farmácia Bem Estar", "Hotel Recanto", "Padaria Pão Quente", "Loja Estilo Urbano"];
export const PRODUTOS = ["Papel A4 (resma)", "Caneta esferográfica (cx)", "Toner preto", "Cartucho colorido", "Pasta suspensa (cx)", "Grampeador", "Clips (cx)", "Etiqueta adesiva (rolo)", "Caderno 96 fls", "Marcador de texto (cx)", "Fita adesiva", "Envelope A4 (cx)"];
export const CIDADES = ["Campinas", "Sorocaba", "Ribeirão Preto", "Bauru", "Santos", "Jundiaí"];
