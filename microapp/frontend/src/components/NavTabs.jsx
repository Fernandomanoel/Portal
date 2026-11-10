import React from 'react';
import {
  Bell,
  BookMarked,
  ClipboardList,
  FileSearch,
  FileSpreadsheet,
  GraduationCap,
  Package,
  QrCode,
  ScrollText,
  UserPlus,
} from 'lucide-react';

const OPERACAO = ['ADM', 'DIRETOR', 'PROFESSOR', 'ASSISTENTE'];
const GESTAO = ['ADM', 'DIRETOR'];

// Nome do sistema no menu; trocar aqui muda em um lugar só.
const NOME_APP = 'Analisador de pacotes';

// "Ferramentas" são telas independentes; o restante é o sistema, agrupado por assunto.
const GRUPOS = [
  {
    titulo: 'Ferramentas',
    itens: [{ id: 'modulos', label: 'Analisador de contratos', icon: FileSearch }],
  },
  {
    secao: NOME_APP,
    titulo: 'WhatsApp',
    itens: [
      { id: 'conectar', label: 'Conexão', icon: QrCode },
      { id: 'planilha', label: 'Avisos de falta', icon: FileSpreadsheet, cargos: OPERACAO },
      { id: 'lembretes', label: 'Lembretes', icon: Bell, cargos: OPERACAO },
    ],
  },
  {
    titulo: 'Acadêmico',
    itens: [
      { id: 'alunos', label: 'Alunos', icon: GraduationCap },
      { id: 'provas', label: 'Provas', icon: ClipboardList, cargos: OPERACAO },
      { id: 'pacotes', label: 'Pacotes', icon: Package, cargos: OPERACAO },
    ],
  },
  {
    titulo: 'Administração',
    itens: [
      { id: 'materias', label: 'Matérias', icon: BookMarked, cargos: GESTAO },
      { id: 'usuarios', label: 'Acessos', icon: UserPlus, cargos: GESTAO },
      { id: 'auditoria', label: 'Auditoria', icon: ScrollText, cargos: ['ADM'] },
    ],
  },
];

export function NavTabs({ cargoUsuario, abaAtiva, onNavigate, menuAberto, whatsappConectado }) {
  const grupos = GRUPOS.map((grupo) => ({
    ...grupo,
    itens: grupo.itens.filter((item) => !item.cargos || item.cargos.includes(cargoUsuario)),
  })).filter((grupo) => grupo.itens.length > 0);

  return (
    <nav
      aria-label="Área do professor"
      className={`${
        menuAberto ? 'block' : 'hidden'
      } w-full shrink-0 border-b border-slate-200 bg-white px-3 py-4 md:sticky md:top-14 md:block md:h-[calc(100svh-3.5rem)] md:w-60 md:overflow-y-auto md:border-b-0 md:border-r dark:border-slate-800 dark:bg-slate-900`}
    >
      {grupos.map((grupo) => (
        <div key={grupo.titulo} className="mb-5 last:mb-0">
          {grupo.secao ? (
            <p className="mb-3 border-t border-slate-200 px-3 pt-4 text-sm font-bold text-slate-900 dark:border-slate-800 dark:text-white">
              {grupo.secao}
            </p>
          ) : null}
          <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {grupo.titulo}
          </p>
          <ul className="space-y-0.5">
            {grupo.itens.map(({ id, label, icon: Icon }) => {
              const ativa = abaAtiva === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    aria-current={ativa ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-700 ${
                      ativa
                        ? 'bg-navy-50 text-navy-700 dark:bg-navy-900/60 dark:text-navy-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate">{label}</span>
                    {id === 'conectar' ? (
                      <span
                        className={`ml-auto h-2 w-2 shrink-0 rounded-full ${
                          whatsappConectado ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        title={whatsappConectado ? 'Conectado' : 'Desconectado'}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
