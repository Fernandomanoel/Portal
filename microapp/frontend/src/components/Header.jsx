import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header({ usuario, onLogout, menuAberto, onToggleMenu }) {
  return (
    <div className="flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={onToggleMenu}
        >
          {menuAberto ? <X size={18} /> : <Menu size={18} />}
        </button>
        <h1 className="truncate text-base font-bold tracking-tight text-navy-700 dark:text-navy-300">
          Área do professor
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <p className="hidden min-w-0 text-right text-sm leading-tight sm:block">
          <span className="block truncate font-semibold text-slate-900 dark:text-white">{usuario.nome}</span>
          <span className="block text-xs capitalize text-slate-500 dark:text-slate-400">
            {usuario.cargo.toLowerCase()}
          </span>
        </p>
        <ThemeToggle />
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </div>
  );
}
