# 📚 Base de Conhecimento GesOper

Este repositório contém o código-fonte do **Portal GesOper**, um site estático com estrutura de **documentação interna** e **base de conhecimento** sobre os módulos do sistema corporativo **GesOper**.

---

## ✅ Funcionalidades

- 📁 Menu lateral com **módulos e submódulos organizados**
- 🌓 Suporte a **modo claro/escuro**
- 🔍 Campo de **busca** interno
- 🖼️ Logotipos personalizáveis no topo (esquerda e direita)
- 📦 Estrutura pronta para **deploy via GitHub Pages**

---

## 🧭 Estrutura de Módulos

### ▶️ Operacional
- Escala
- Cadastro de Jornada

### 💰 Financeiro
- Tesouraria
  - Lançamento de Caixa
  - Conciliação Bancária
  - Relatórios

### 🎁 Benefícios
- Geração de Vale Alimentação
- Geração de Vale Transporte

---

## 🗂️ Estrutura de Pastas

```
.
├── index.html
├── css/
│   └── style.css
├── img/
│   ├── GesoperCorporate.png
│   └── LogoSolucao.png
├── operacional/
│   ├── index.html
│   ├── escala/index.html
│   └── jornada/index.html
├── financeiro/
│   ├── index.html
│   └── tesouraria/
│       ├── index.html
│       ├── caixa/index.html
│       ├── conciliacao/index.html
│       └── relatorios/index.html
└── beneficios/
    ├── index.html
    ├── vale-alimentacao/index.html
    └── vale-transporte/index.html
```

---

## 🚀 Como Publicar no GitHub Pages

1. Faça o upload de todos os arquivos no seu repositório.
2. Acesse as configurações do repositório no GitHub.
3. Vá até a seção **"Pages"**.
4. Em **"Source"**, selecione a branch (ex: `main`) e a pasta `/root`.
5. Clique em **"Save"**.
6. Seu site estará disponível em:  
   `https://<seu-usuario>.github.io/<nome-repositorio>/`

---

## ✏️ Customização

- Para editar o conteúdo de qualquer seção, modifique o respectivo arquivo `.html`.
- As logos estão localizadas na pasta `img/`.
- O CSS geral pode ser ajustado em `css/style.css`.

---

## 👨‍💻 Desenvolvido por

Robson Mauro, com suporte técnico gerado por inteligência artificial.  
Sistema interno: **GesOper**  
Ambiente: HTML + CSS puro
