import type { SVGProps } from "react";

import type { FormaSvg } from "@/types/aulaIngles";

/**
 * Desenha uma forma guardada como dado. Cores em `var(--token)` não valem como atributo SVG, então vão para o `style`.
 */
export function FormaSvgEl({ forma }: { forma: FormaSvg }) {
  const atributos: Record<string, string | number> = {};
  const estilo: Record<string, string> = {};
  for (const [nome, valor] of Object.entries(forma.attrs)) {
    if (typeof valor === "string" && valor.startsWith("var(") && (nome === "stroke" || nome === "fill")) estilo[nome] = valor;
    else atributos[nome] = valor;
  }
  const props = { ...atributos, ...(Object.keys(estilo).length ? { style: estilo } : {}) };
  switch (forma.tag) {
    case "path":
      return <path {...(props as SVGProps<SVGPathElement>)} />;
    case "ellipse":
      return <ellipse {...(props as SVGProps<SVGEllipseElement>)} />;
    case "circle":
      return <circle {...(props as SVGProps<SVGCircleElement>)} />;
    case "rect":
      return <rect {...(props as SVGProps<SVGRectElement>)} />;
  }
}
