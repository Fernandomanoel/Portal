import type { AtividadeAutocorrigida } from "@/types/atividadeAutocorrigida";

// Conteúdo de Portal-Atividades/atividades/paginas/site-atividade2-portfolio-python.html, sem cortes.
const atividade: AtividadeAutocorrigida = {
  titulo: "Atividade 2 — Site Pessoal com Python",
  introducao: "Um site sobre você (portfólio), agora com um cérebro em Python por trás usando o Flask",
  itens: [
    {
      id: "o-que-voce-vai-construir",
      titulo: "O que você vai construir",
      blocos: [
        {
          tipo: "texto",
          texto: "Na Atividade 1 você fez um site só com HTML, CSS e JavaScript — tudo acontecia no navegador. Agora você vai construir o seu site pessoal (um portfólio: uma página que fala de você, mostra seus projetos e deixa as pessoas entrarem em contato) e vai dar a ele um back-end em Python.",
        },
        {
          tipo: "texto",
          texto: "Ou seja: além da parte visual, vai existir um programa em Python rodando \"por trás\" do site — é ele que vai entregar as páginas, montar a lista de projetos a partir de dados, receber as mensagens do formulário de contato e até contar quantas visitas o site teve.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "Tema livre, mas sobre você",
          texto: "O conteúdo é você: seu nome, uma foto (ou um avatar), o que você gosta de fazer, os projetos que já criou (inclusive o site da Atividade 1!), e um jeito de te encontrar. As cores, o estilo e a organização ficam por sua conta — capriche, é a sua cara na internet.",
        },
      ],
    },
    {
      id: "front-end-e-back-end-qual-a-diferenca",
      titulo: "Front-end e back-end — qual a diferença?",
      blocos: [
        {
          tipo: "texto",
          texto: "Até agora você só mexeu no front-end: a parte que roda no navegador do visitante (HTML, CSS, JavaScript). O back-end é a parte que roda num servidor, longe do visitante — é onde entra o Python.",
        },
        {
          tipo: "texto",
          texto: "Visitante (navegador)",
        },
        {
          tipo: "texto",
          texto: "→ pede a página →",
        },
        {
          tipo: "texto",
          texto: "Python / Flask (servidor)",
        },
        {
          tipo: "texto",
          texto: "→ devolve o HTML →",
        },
        {
          tipo: "texto",
          texto: "Visitante vê o site",
        },
        {
          tipo: "texto",
          texto: "Por que colocar Python no meio disso? Porque o back-end consegue fazer coisas que o HTML sozinho não faz:",
        },
        {
          tipo: "lista",
          itens: [
            "Guardar informação — salvar as mensagens que as pessoas mandam pelo formulário;",
            "Montar páginas dinâmicas — gerar a lista de projetos a partir de uma lista em Python, sem você reescrever o HTML de cada card na mão;",
            "Reagir a ações — contar visitas, mostrar conteúdo diferente, processar dados.",
          ],
        },
        {
          tipo: "texto",
          texto: "A ferramenta que vamos usar para isso se chama Flask — um \"microframework\" de Python feito exatamente para criar sites e pequenos servidores web com pouca configuração.",
        },
      ],
    },
    {
      id: "instalando-o-python-e-o-flask",
      titulo: "Instalando o Python e o Flask",
      blocos: [
        {
          tipo: "texto",
          texto: "Antes de tudo, o Python precisa estar instalado no computador. No laboratório provavelmente já está — confira abrindo o terminal (Prompt de Comando no Windows) e digitando:",
        },
        {
          tipo: "codigo",
          conteudo: "python --version",
          rotulo: "terminal",
        },
        {
          tipo: "texto",
          texto: "Se aparecer algo como Python 3.12.0, está tudo certo. Se der erro, baixe o Python em python.org/downloads e, no Windows, marque a caixinha \"Add Python to PATH\" durante a instalação.",
        },
        {
          tipo: "texto",
          texto: "Com o Python funcionando, instale o Flask usando o pip (o instalador de pacotes do Python):",
        },
        {
          tipo: "codigo",
          conteudo: `# instala o Flask no computador
pip install flask`,
          rotulo: "terminal",
        },
        {
          tipo: "texto",
          texto: "Dica profissional (opcional):",
        },
        {
          tipo: "texto",
          texto: "venv",
        },
        {
          tipo: "texto",
          texto: "python -m venv venv",
        },
        {
          tipo: "texto",
          texto: "venv\\Scripts\\activate",
        },
        {
          tipo: "texto",
          texto: "source venv/bin/activate",
        },
        {
          tipo: "texto",
          texto: "pip install",
        },
      ],
    },
    {
      id: "planejamento-de-pastas",
      titulo: "Planejamento de pastas",
      blocos: [
        {
          tipo: "texto",
          texto: "Um projeto Flask tem uma organização própria: o Python fica na raiz, os HTML vão numa pasta templates/ e o CSS/imagens numa pasta static/. O Flask procura os arquivos nesses lugares automaticamente. Mantenha simples:",
        },
        {
          tipo: "codigo",
          conteudo: `meu-portfolio/
├── app.py                # o programa Python (o back-end)
├── requirements.txt       # lista o que precisa instalar (flask)
├── templates/             # aqui vão os arquivos .html
│   ├── index.html          # sua página principal
│   └── obrigado.html        # página de "mensagem enviada"
└── static/                 # CSS, imagens, js
    ├── style.css
    └── imagens/
        └── foto.jpg`,
          rotulo: "estrutura do projeto",
        },
        {
          tipo: "texto",
          texto: "Por que essa divisão?",
        },
        {
          tipo: "texto",
          texto: "templates/",
        },
        {
          tipo: "texto",
          texto: "static/",
        },
        {
          tipo: "texto",
          texto: "templates",
        },
        {
          tipo: "texto",
          texto: "static",
        },
        {
          tipo: "texto",
          texto: "Continuamos com a regra da atividade anterior: no máximo 3 páginas HTML. Aqui já usamos duas (index.html e obrigado.html) — sobra espaço para no máximo mais uma, se você quiser.",
        },
      ],
    },
    {
      id: "primeiro-ola-com-flask",
      titulo: "Primeiro \"Olá\" com Flask",
      blocos: [
        {
          tipo: "texto",
          texto: "Vamos começar pelo menor site Flask possível, só para ver o Python servindo uma página. Crie o arquivo app.py na raiz do projeto:",
        },
        {
          tipo: "codigo",
          conteudo: `# importa as ferramentas do Flask que vamos usar
from flask import Flask, render_template

# cria a aplicação
app = Flask(__name__)

# "quando alguém acessar a página inicial (/), rode esta função"
@app.route("/")
def inicio():
    return "Olá! Meu site em Python está no ar."

# liga o servidor quando você roda "python app.py"
if __name__ == "__main__":
    app.run(debug=True)`,
          rotulo: "app.py",
        },
        {
          tipo: "texto",
          texto: "Agora rode no terminal, dentro da pasta do projeto:",
        },
        {
          tipo: "codigo",
          conteudo: "python app.py",
          rotulo: "terminal",
        },
        {
          tipo: "texto",
          texto: "O Flask vai mostrar um endereço, geralmente http://127.0.0.1:5000. Abra esse endereço no navegador — está no ar! O 127.0.0.1 quer dizer \"este próprio computador\"; o site só existe na sua máquina por enquanto, o que é perfeito para desenvolver.",
        },
        {
          tipo: "nota",
          variante: "dica",
          rotulo: "O que é o debug=True?",
          texto: "Com o modo debug ligado, toda vez que você salvar o app.py o servidor se reinicia sozinho, e os erros aparecem detalhados na tela. É o modo ideal para aprender. Para parar o servidor, volte ao terminal e aperte Ctrl + C.",
        },
      ],
    },
    {
      id: "servindo-a-sua-pagina-de-verdade",
      titulo: "Servindo a sua página de verdade",
      blocos: [
        {
          tipo: "texto",
          texto: "Devolver texto puro não é lá muito bonito. Vamos fazer o Python entregar um arquivo HTML completo. Coloque seu HTML em templates/index.html e troque a função para usar render_template:",
        },
        {
          tipo: "codigo",
          conteudo: `@app.route("/")
def inicio():
    # procura templates/index.html e devolve pronto
    return render_template("index.html")`,
          rotulo: "app.py",
        },
        {
          tipo: "texto",
          texto: "E o templates/index.html é um HTML normal, igual aos que você já sabe fazer. Só muda uma coisa: para linkar o CSS e as imagens da pasta static/, use url_for em vez do caminho direto:",
        },
        {
          tipo: "codigo",
          conteudo: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Portfólio da(o) SeuNome</title>
  <!-- o Flask monta o caminho certo para static/style.css -->
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <h1>Oi, eu sou a(o) SeuNome</h1>
  <img src="{{ url_for('static', filename='imagens/foto.jpg') }}" alt="Minha foto">
</body>
</html>`,
          rotulo: "templates/index.html",
        },
        {
          tipo: "texto",
          texto: "Aqueles {{ ... }} são do Jinja, a linguagem de template do Flask: pedaços que o Python preenche antes de mandar a página para o navegador. Guarde essa ideia — ela é a chave da próxima seção.",
        },
      ],
    },
    {
      id: "conteudo-dinamico-a-lista-de-projetos",
      titulo: "Conteúdo dinâmico — a lista de projetos",
      blocos: [
        {
          tipo: "texto",
          texto: "Aqui o Python começa a brilhar. Em vez de escrever na mão o HTML de cada projeto do seu portfólio, você guarda os projetos numa lista em Python e deixa o Jinja repetir o card para cada um. Adicionar um projeto novo passa a ser só acrescentar uma linha na lista.",
        },
        {
          tipo: "codigo",
          conteudo: `# uma lista de projetos — cada um é um "dicionário" (nome: valor)
projetos = [
    {"nome": "Meu site SaaS", "desc": "Landing page feita na Atividade 1.", "link": "#"},
    {"nome": "Jogo da forca", "desc": "Um joguinho em JavaScript.", "link": "#"},
]

@app.route("/")
def inicio():
    # manda a lista para o template com o nome "projetos"
    return render_template("index.html", projetos=projetos)`,
          rotulo: "app.py",
        },
        {
          tipo: "texto",
          texto: "E no template você usa um laço for do Jinja para gerar um card por projeto. Repare que o HTML do card é escrito uma vez só:",
        },
        {
          tipo: "texto",
          texto: "Modelo · o Python repete pra cada projeto da lista",
        },
        {
          tipo: "codigo",
          conteudo: `<section class="projetos">
  <h2>Meus projetos</h2>

  {% for projeto in projetos %}
    <div class="card">
      <h3>{{ projeto.nome }}</h3>
      <p>{{ projeto.desc }}</p>
      <a href="{{ projeto.link }}">Ver projeto</a>
    </div>
  {% endfor %}
</section>`,
          rotulo: "templates/index.html",
        },
        {
          tipo: "texto",
          texto: "O {% for projeto in projetos %} ... {% endfor %} repete tudo que está no meio para cada item da lista. Adicione, tire ou mude projetos só na lista do app.py — o HTML não precisa ser tocado. Bote quantos projetos quiser, é o seu portfólio.",
        },
      ],
    },
    {
      id: "formulario-de-contato-que-o-python-recebe",
      titulo: "Formulário de contato que o Python recebe",
      blocos: [
        {
          tipo: "texto",
          texto: "Na Atividade 1, o formulário só mostrava um alerta no navegador — não ia a lugar nenhum. Agora o Python vai receber os dados de verdade e salvar num arquivo. Primeiro, o formulário no HTML precisa dizer para onde enviar (action) e como (method=\"post\"):",
        },
        {
          tipo: "codigo",
          conteudo: `<form action="/contato" method="post">
  <input type="text"  name="nome"     placeholder="Seu nome" required>
  <input type="email" name="email"    placeholder="Seu e-mail" required>
  <textarea name="mensagem" required></textarea>
  <button type="submit">Enviar</button>
</form>`,
          rotulo: "templates/index.html",
        },
        {
          tipo: "texto",
          texto: "O name de cada campo é o nome pelo qual o Python vai buscar o valor. Agora, no app.py, uma nova rota recebe esse envio:",
        },
        {
          tipo: "codigo",
          conteudo: `# importe também "request" e "redirect" lá em cima:
# from flask import Flask, render_template, request, redirect

@app.route("/contato", methods=["POST"])
def contato():
    # pega o que o visitante digitou (pelo name de cada campo)
    nome = request.form["nome"]
    email = request.form["email"]
    mensagem = request.form["mensagem"]

    # salva no fim do arquivo mensagens.txt (o "a" = append/acrescentar)
    with open("mensagens.txt", "a", encoding="utf-8") as arquivo:
        arquivo.write(f"{nome} ({email}): {mensagem}\\n")

    # manda o visitante para a página de agradecimento
    return redirect("/obrigado")


@app.route("/obrigado")
def obrigado():
    return render_template("obrigado.html")`,
          rotulo: "app.py",
        },
        {
          tipo: "texto",
          texto: "Pronto: quando alguém preenche e envia, o Python guarda a mensagem em mensagens.txt e leva a pessoa para a página obrigado.html (que pode ser bem simples: \"Recebi sua mensagem, obrigado!\"). Aquele f\"...\" é uma f-string — um jeito do Python montar texto colando o valor das variáveis dentro das chaves {}.",
        },
        {
          tipo: "nota",
          variante: "aviso",
          texto: "Cuidado com dados de verdade: mensagens.txt não suba esse arquivo para o GitHub .gitignore",
        },
      ],
    },
    {
      id: "bonus-um-contador-de-visitas",
      titulo: "Bônus — um contador de visitas",
      blocos: [
        {
          tipo: "texto",
          texto: "Para praticar mais Python, que tal contar quantas vezes a página foi aberta? A ideia: guardar o número num arquivo, ler, somar 1, salvar de volta e mandar para o template.",
        },
        {
          tipo: "codigo",
          conteudo: `def contar_visita():
    try:
        with open("visitas.txt") as f:
            n = int(f.read())      # lê o número que já estava salvo
    except FileNotFoundError:
        n = 0                      # primeira visita: ainda não existe o arquivo

    n = n + 1                      # conta mais esta visita
    with open("visitas.txt", "w") as f:
        f.write(str(n))            # salva o novo total
    return n

@app.route("/")
def inicio():
    total = contar_visita()
    return render_template("index.html", projetos=projetos, visitas=total)`,
          rotulo: "app.py",
        },
        {
          tipo: "texto",
          texto: "E no template, mostre onde quiser: <p>Esta página já foi vista {{ visitas }} vezes.</p>. Simples assim — leitura de arquivo, tratamento de erro com try/except e uma função, tudo em Python.",
        },
      ],
    },
    {
      id: "python-basico-que-voce-vai-usar",
      titulo: "Python básico que você vai usar",
      blocos: [
        {
          tipo: "texto",
          texto: "Você não precisa dominar Python inteiro para esta atividade — mas vale reconhecer estas peças, que aparecem em todos os exemplos acima:",
        },
        {
          tipo: "codigo",
          conteudo: `# variável: uma "caixa" com um valor
nome = "Ana"
idade = 17

# f-string: monta texto colando variáveis dentro de { }
frase = f"{nome} tem {idade} anos"

# lista: vários valores em ordem
linguagens = ["HTML", "CSS", "Python"]

# dicionário: pares nome -> valor
projeto = {"nome": "Portfólio", "ano": 2026}

# laço for: repete algo para cada item
for lang in linguagens:
    print(lang)

# condição: decide o que fazer
if idade >= 18:
    print("maior de idade")
else:
    print("menor de idade")

# função: um bloco de código com nome, que você chama quando quiser
def saudacao(pessoa):
    return f"Olá, {pessoa}!"`,
          rotulo: "python — miniguia",
        },
        {
          tipo: "texto",
          texto: "Se bater curiosidade de ir além, os links da lateral apontam a documentação oficial do Python e do Flask, e o guia de Git da aba continua valendo para salvar o progresso.",
        },
      ],
    },
    {
      id: "requisitos-tecnicos",
      titulo: "Requisitos técnicos",
      blocos: [
        {
          tipo: "texto",
          texto: "O visual e o conteúdo são livres, mas estes pontos valem para qualquer versão do seu portfólio:",
        },
        {
          tipo: "lista",
          itens: [
            "Roda com Flask — o site é servido por python app.py, não é só um HTML aberto direto no navegador;",
            "Pelo menos uma parte dinâmica — a lista de projetos montada por Jinja (o for) é o mínimo; o contador de visitas conta como extra;",
            "Formulário de contato funcionando — o Python recebe o envio e salva/reage a ele;",
            "HTML semântico e CSS seu — as boas práticas da Atividade 1 continuam valendo;",
            "Responsivo — precisa ficar bom no celular e no computador (use @media);",
            "Organização Flask — HTML em templates/, CSS e imagens em static/.",
          ],
        },
      ],
    },
    {
      id: "entrega-como-salvar-seu-progresso",
      titulo: "Entrega — como salvar seu progresso",
      blocos: [
        {
          tipo: "texto",
          texto: "Como nas outras atividades, não há data de entrega: você desenvolve com calma e vai salvando no Git. Uma diferença importante de projetos Python: existem arquivos que não devem ir para o repositório (o cache do Python, o ambiente virtual e os dados gerados). Crie um arquivo .gitignore na raiz com:",
        },
        {
          tipo: "codigo",
          conteudo: `# cache que o Python gera sozinho
__pycache__/
*.pyc

# ambiente virtual, se você criou um
venv/

# dados gerados pelo site (não são código)
mensagens.txt
visitas.txt`,
          rotulo: ".gitignore",
        },
        {
          tipo: "texto",
          texto: "É boa prática também anotar o que o projeto precisa para rodar, num requirements.txt:",
        },
        {
          tipo: "codigo",
          conteudo: "flask",
          rotulo: "requirements.txt",
        },
        {
          tipo: "texto",
          texto: "for",
        },
        {
          tipo: "texto",
          texto: "git push",
        },
        {
          tipo: "texto",
          texto: "Git e GitHub — Criando seu Repositório",
        },
        {
          tipo: "subtitulo",
          texto: "Sugestão de commits ao longo do projeto",
        },
        {
          tipo: "codigo",
          conteudo: `git commit -m "Subir servidor Flask com um Olá inicial"
git commit -m "Servir index.html pelo Flask com CSS em static/"
git commit -m "Montar a lista de projetos com um for do Jinja"
git commit -m "Receber e salvar o formulário de contato no Python"
git commit -m "Adicionar contador de visitas"`,
          rotulo: "terminal",
        },
      ],
    },
    {
      id: "checklist-antes-de-considerar-concluido",
      titulo: "Checklist antes de considerar concluído",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "O site sobe com python app.py e abre em http://127.0.0.1:5000;",
            "A página principal é servida pelo Flask com render_template, e o CSS vem de static/ via url_for;",
            "A seção de projetos é gerada por um for do Jinja a partir de uma lista no app.py;",
            "O formulário de contato envia por method=\"post\" e o Python recebe e salva a mensagem;",
            "O site é responsivo (funciona no celular e no computador);",
            "Existe um .gitignore ignorando __pycache__/, venv/ e os arquivos de dados;",
            "Existe um requirements.txt com flask;",
            "O repositório tem vários commits ao longo do tempo, não um único commit final;",
            "Os arquivos seguem a estrutura Flask: app.py, templates/, static/.",
          ],
        },
      ],
    },
  ],
};

export default atividade;
