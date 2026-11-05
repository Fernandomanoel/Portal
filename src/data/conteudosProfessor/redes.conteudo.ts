import type { ConteudoCurso } from "@/types/conteudoProfessor";

const conteudo: ConteudoCurso = {
  resumo:
    "Redes de computadores conectam dispositivos para compartilhar informações e recursos. O curso apresenta conceitos, tipos de rede, modelo em camadas, endereçamento IP, equipamentos, cabeamento e configuração básica.",
  topicos: [
    {
      titulo: "O que é uma rede e tipos de rede",
      texto: [
        "Rede é um conjunto de dispositivos conectados para trocar dados. Por alcance: PAN (pessoal, como o Bluetooth), LAN (local, uma casa ou escritório), MAN (metropolitana) e WAN (ampla; a internet é a maior). Por arquitetura: cliente-servidor (um servidor atende vários clientes) e ponto a ponto (todos compartilham). Topologias descrevem o desenho: estrela (a mais comum, com um switch no centro), barramento e anel.",
      ],
      pontos: ["Diferenciar LAN e WAN.", "Descrever a topologia em estrela."],
    },
    {
      titulo: "Equipamentos de rede",
      texto: [
        "Placa de rede liga o computador à rede. Switch conecta vários dispositivos em uma LAN e encaminha os dados só ao destino certo. Roteador liga redes diferentes (como a rede da casa à internet) e escolhe o caminho dos dados. Ponto de acesso e roteador Wi-Fi atendem os dispositivos sem fio. Modem converte o sinal da operadora. O hub, ultrapassado, repete os dados a todos.",
      ],
      pontos: ["Diferenciar switch e roteador.", "Dizer o que faz um ponto de acesso."],
    },
    {
      titulo: "Modelo em camadas e protocolos",
      texto: [
        "Protocolo é um conjunto de regras de comunicação. O modelo OSI tem 7 camadas (física, enlace, rede, transporte, sessão, apresentação e aplicação); o TCP/IP, usado na prática, tem 4 (acesso à rede, internet, transporte e aplicação). Exemplos: HTTP/HTTPS (web), DNS (traduz nomes em endereços), DHCP (entrega endereços IP automaticamente), FTP (arquivos), SMTP/IMAP (e-mail), TCP (confiável) e UDP (rápido).",
      ],
      pontos: ["Citar as camadas do modelo.", "Explicar o que fazem DNS e DHCP."],
    },
    {
      titulo: "Endereçamento IP e máscara",
      texto: [
        "Cada dispositivo precisa de um endereço IP. O IPv4 tem 4 números de 0 a 255 (192.168.0.10); o IPv6 é mais longo. A máscara de sub-rede indica quais bits identificam a rede e quais, o dispositivo (255.255.255.0 equivale a /24). Faixas privadas, usadas dentro das redes locais, são 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16. O gateway é o endereço do roteador. Dois dispositivos com o mesmo IP geram conflito.",
      ],
      pontos: ["Ler um endereço IP e a máscara.", "Reconhecer endereços privados."],
      exemplo: "192.168.0.10 com máscara 255.255.255.0: a rede é 192.168.0.x, e há 254 endereços utilizáveis.",
      erros: ["Configurar IPs em redes diferentes e achar que devem se comunicar."],
    },
    {
      titulo: "Cabeamento, Wi-Fi e testes",
      texto: [
        "Cabos de par trançado (UTP) usam conectores RJ-45 e seguem a padronização T568A ou T568B (a mesma em ambas as pontas para um cabo direto). Categorias (Cat5e, Cat6) indicam o desempenho. O comprimento máximo de um lance é de cerca de 100 metros. A fibra óptica serve a longas distâncias e altas velocidades. No Wi-Fi, a frequência de 2,4 GHz alcança mais longe, e a de 5 GHz é mais rápida; use WPA2 ou WPA3 para a segurança.",
        "Testes básicos: ping (a máquina alcança outra?), ipconfig (ou ifconfig/ip a) para ver o IP e tracert (o caminho dos pacotes).",
      ],
      pontos: ["Montar e testar um cabo de rede.", "Usar ping e ipconfig."],
    },
  ],
  glossario: [
    { termo: "LAN / WAN", definicao: "Rede local / rede de longa distância." },
    { termo: "Switch", definicao: "Equipamento que liga dispositivos de uma rede local." },
    { termo: "Roteador", definicao: "Equipamento que liga redes diferentes." },
    { termo: "IP", definicao: "Endereço que identifica um dispositivo na rede." },
    { termo: "DNS", definicao: "Serviço que traduz nomes de sites em endereços IP." },
    { termo: "DHCP", definicao: "Serviço que atribui endereços IP automaticamente." },
    { termo: "RJ-45", definicao: "Conector dos cabos de rede." },
  ],
  dicas: [
    "Leve cabos, conectores e um alicate de crimpagem para a aula: montar um cabo é o momento mais marcante.",
    "Use o comando ping e o ipconfig o tempo todo: diagnóstico é o dia a dia de quem trabalha com redes.",
    "Desenhe a rede da escola no quadro, com switch, roteador e pontos de acesso.",
  ],
};

export default conteudo;
