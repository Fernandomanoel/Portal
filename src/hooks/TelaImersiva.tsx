import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Valor {
  imersiva: boolean;
  entrar: () => void;
  sair: () => void;
}

const Contexto = createContext<Valor | null>(null);

/**
 * Telas imersivas (os jogos de digitação, por exemplo) escondem o menu e o
 * rodapé do portal para ocupar a tela inteira — diferente da prova em
 * andamento, aqui não há aviso de saída, é só uma questão de layout.
 */
export function ProvedorTelaImersiva({ children }: { children: ReactNode }) {
  const [imersiva, definirImersiva] = useState(false);

  const entrar = useCallback(() => definirImersiva(true), []);
  const sair = useCallback(() => definirImersiva(false), []);

  return (
    <Contexto.Provider value={{ imersiva, entrar, sair }}>
      {children}
    </Contexto.Provider>
  );
}

export function useTelaImersiva(): Valor {
  const valor = useContext(Contexto);
  if (!valor) {
    throw new Error("useTelaImersiva precisa estar dentro de <ProvedorTelaImersiva>");
  }
  return valor;
}

/** Ativa a tela imersiva enquanto o componente estiver montado. */
export function useEntrarEmTelaImersiva() {
  const { entrar, sair } = useTelaImersiva();
  useEffect(() => {
    entrar();
    return () => sair();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
