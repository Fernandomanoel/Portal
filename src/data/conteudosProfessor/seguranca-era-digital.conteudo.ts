import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "O curso ensina a se proteger no mundo digital: senhas e autenticação, golpes e e-mails falsos (phishing), segurança em redes e dispositivos, privacidade, uso responsável de IA e consciência de segurança no dia a dia. A regra de ouro é desconfiar e conferir antes de clicar, informar ou pagar.",
  topicos: [
    {
      titulo: "Senhas e autenticação",
      texto: [
        "Uma senha forte é longa (de preferência uma frase de 12 ou mais caracteres), única para cada serviço e não tem dados pessoais óbvios. Gerenciadores de senhas guardam todas com segurança. A autenticação em dois fatores (2FA) pede, além da senha, um segundo comprovante (código no celular, aplicativo autenticador, chave de segurança) e bloqueia a maioria dos invasores. Nunca compartilhe códigos recebidos por SMS ou aplicativo.",
      ],
      pontos: ["Criar uma senha forte.", "Ativar a autenticação em dois fatores em uma conta."],
      erros: ["Usar a mesma senha em vários sites.", "Passar o código de verificação a quem ligou «do banco»."],
      atividades: ["seguranca-atividade-basica", "seguranca-ciberseguranca-fundamentos"],
    },
    {
      titulo: "Phishing e golpes por mensagem",
      texto: [
        "Phishing é a tentativa de enganar a pessoa para que ela entregue dados ou clique em algo perigoso, passando-se por banco, loja ou conhecido. Sinais: urgência e ameaça, erros de escrita, remetente estranho (confira o endereço real), links que levam a um endereço diferente do exibido (passe o mouse para ver) e anexos inesperados. Na dúvida, não clique: acesse o site digitando o endereço ou ligue para o número oficial.",
        "Outros golpes: falso atendente, falsa central, Pix para um «parente com número novo», ofertas milagrosas, e promoções que pedem cadastro.",
      ],
      pontos: ["Reconhecer três sinais de um e-mail falso.", "Dizer o que fazer ao receber uma mensagem suspeita."],
      atividades: ["seguranca-emails-suspeitos", "seguranca-defesa-cibernetica"],
    },
    {
      titulo: "Dispositivos, redes e malware",
      texto: [
        "Malware é software mal-intencionado: vírus, trojans (disfarçados de programas úteis), ransomware (sequestra os arquivos pedindo resgate), spyware (espiona). Proteção: manter o sistema e os aplicativos atualizados, instalar programas só de fontes oficiais, usar antivírus, fazer cópias de segurança (backups) e evitar redes Wi-Fi públicas para operações sensíveis (ou usar uma VPN).",
      ],
      pontos: ["Explicar o que é ransomware.", "Citar por que backup protege contra perda de dados."],
      atividades: ["seguranca-ciberseguranca-fundamentos", "seguranca-defesa-cibernetica"],
    },
    {
      titulo: "Privacidade, rastros e anonimato",
      texto: [
        "Tudo o que se publica e navega deixa rastros: cookies, histórico, localização, metadados das fotos. Configurações de privacidade das redes sociais limitam quem vê as informações. A navegação anônima não torna a pessoa invisível na internet. A rede Tor encaminha o tráfego por vários pontos para esconder a origem; tem usos legítimos de privacidade, mas também é usada para atividades ilegais, e a velocidade é menor. A LGPD protege os dados pessoais no Brasil.",
      ],
      pontos: ["Ajustar a privacidade de uma rede social.", "Explicar o que a navegação anônima não faz."],
      atividades: ["seguranca-privacidade-avancada-tor"],
    },
    {
      titulo: "IA, produtividade e consciência situacional",
      texto: [
        "O uso de IA exige cuidado com dados pessoais e conferência de resultados. Fora da tela, a consciência situacional é estar atento ao ambiente, às pessoas e às rotas para antecipar riscos no dia a dia (olhar ao redor, evitar distrações com o celular em locais de risco, combinar locais de encontro e avisar alguém). Segurança digital e física se somam.",
      ],
      pontos: ["Explicar a ideia de consciência situacional.", "Dar um cuidado ao usar IA."],
      atividades: ["seguranca-ia-produtividade-digital", "seguranca-defesa-pessoal-consciencia-situacional"],
    },
  ],
  glossario: [
    { termo: "Phishing", definicao: "Golpe que usa mensagens falsas para roubar dados." },
    { termo: "2FA", definicao: "Autenticação em dois fatores: senha mais um segundo comprovante." },
    { termo: "Ransomware", definicao: "Programa que bloqueia os arquivos e pede resgate." },
    { termo: "VPN", definicao: "Conexão que protege o tráfego em redes inseguras." },
    { termo: "Backup", definicao: "Cópia de segurança dos arquivos." },
    { termo: "Engenharia social", definicao: "Enganar pessoas, e não máquinas, para obter acesso ou dados." },
  ],
  dicas: [
    "Use exemplos reais de mensagens falsas (com dados apagados) e peça que a turma aponte os sinais.",
    "Não peça que os alunos acessem links suspeitos: trabalhe com imagens ou textos.",
    "Peça que cada aluno ative o 2FA em uma conta durante a aula.",
  ],
};

export default conteudo;
