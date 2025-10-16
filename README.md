---
Title: "Backends para APIs de Pagamentos M-Pesa"
---

A integração com **APIs de pagamento**, especialmente a do **M-Pesa**, é uma das etapas mais desafiadoras para muitos programadores iniciantes em Moçambique. Embora a documentação do serviço ofereça uma visão geral, a implementação prática muitas vezes se transforma num verdadeiro teste de paciência — entre certificados SSL, chaves públicas e privadas, endpoints inconsistentes e autenticações complexas.

Neste artigo, partilho uma análise sincera sobre essas dificuldades e apresento uma **solução prática**: um **backend M-Pesa já pronto para uso**, que qualquer desenvolvedor pode clonar do GitHub e fazer deploy em minutos, utilizando apenas as suas próprias variáveis de ambiente obtidas no portal do desenvolvedor da M-Pesa.

---

## As Principais Dificuldades dos Iniciantes

### 1. Documentação Incompleta ou Confusa

Muitos desenvolvedores relatam que a **documentação oficial da API M-Pesa** (fornecida pela Vodacom Moçambique) é pouco detalhada, principalmente em relação a exemplos de código prático.  
Isso leva os iniciantes a cometer erros simples, como formatar mal as requisições ou usar endpoints incorretos.

> “Passei dias a tentar entender porque minha requisição devolvia *403 Forbidden*, e o problema era apenas o cabeçalho mal formatado.” — Desenvolvedor júnior de Maputo

### 2. Dificuldade em Configurar o SSL

Embora o ambiente **sandbox** permita testes sem SSL, o ambiente de produção exige certificados válidos.  
Para quem está a trabalhar localmente ou num ambiente gratuito, como o **Vercel**, configurar HTTPS pode ser uma dor de cabeça.

### 3. Autenticação e Chaves Criptográficas

O M-Pesa utiliza **autenticação baseada em chaves públicas e privadas**, o que exige que o programador entenda bem conceitos de **criptografia RSA**, **assinaturas digitais** e **segurança de API**.  
Esses temas são raramente abordados nos cursos iniciais de programação disponíveis em Moçambique, o que gera frustração.

### 4. Ausência de Exemplos em TypeScript/Node.js

Grande parte dos exemplos disponíveis online está em **PHP ou Java**, linguagens mais antigas no ecossistema local.  
Entretanto, o novo mercado — dominado por **Node.js, React, Next.js e Vite** — exige soluções modernas e fáceis de integrar ao frontend.

---

## A Solução: Backend M-Pesa Pronto para Deploy

Pensando nesses desafios, preparei um **backend completo e funcional**, pronto para ser usado por qualquer desenvolvedor que queira integrar pagamentos via M-Pesa com rapidez e segurança.

Esse projeto foi criado com **NextJS**, e pode ser **implantado gratuitamente na Vercel** com apenas alguns cliques.  
O código está hospedado no GitHub, e basta clonar o repositório e definir as variáveis de ambiente.

---
--- 

# Passos para criar seu próprio backend

## 1. Clonar o Repositório

Acesse o repositório no GitHub e clone-o para o seu computador:

```bash
git clone https://github.com/calbedev/mpesa-api-starter.git
cd mpesa-backend-ready
```
Se preferir, pode também fazer o fork e trabalhar na sua própria versão.

## 2. Instalar Dependências

No diretório do projeto, instale as dependências necessárias:

```bash
pnpm install
```

## 3. Definir as variáveis de ambiente

Crie um ficheiro `.env` e defina as seguintes variáveis, obtidas no [portal do desenvolvedor M-Pesa](https://developer.mpesa.vm.co.mz/).


```bash
# M-Pesa API Configuration (OBRIGATÓRIO)
MPESA_API_KEY="sua api key"
MPESA_PUBLIC_KEY= "Sua public key"
MPESA_API_URL=api.sandbox.vm.co.mz 
MPESA_USE_SSL=false

# API Security (OBRIGATÓRIO)
# Defina uma chave secreta forte para proteger suas APIs
# Esta chave será usada para autenticar requisições do frontend
API_SECRET_KEY="defina uma chave secreta"

# Service Provider Configuration (OPCIONAL mas recomendado)
# Necessário para operações B2B, B2C e Reversal
MPESA_SERVICE_PROVIDER_CODE=171717
MPESA_INITIATOR_IDENTIFIER=MPesa2018
MPESA_SECURITY_CREDENTIAL=Mpesa2019
```

## 4. Testar localmente

Antes de fazer o deploy, teste o projeto no seu ambiente local:

```bash
pnpm run dev
```
Acesse http://localhost:3000, se tudo estiver configurado corretamente, o status da api estará ok, como na imagem abaixo:
![Status da API](/status.jpeg)

Acesse as página de testes para fazer os testes de todas as funcionalidades com formulários intuitivos e visualização de respostas em tempo real.

Acesse a página da documentação para aprender como integrar as APIs no seu frontend com exemplos práticos e detalhados.

## 5. Fazer Deploy na Vercel

1. Crie uma conta em vercel.com

Clique em “Add New Project” → “Import Git Repository”.

2. Escolha o repositório clonado no GitHub.

3. Configure as variáveis de ambiente na aba Environment Variables:

  - MPESA_API_KEY

  - MPESA_PUBLIC_KEY

  - MPESA_API_URL

  - MPESA_USE_SSL

  - API_SECRET_KEY

  - MPESA_SERVICE_PROVIDER_CODE
  - MPESA_INITIATOR_IDENTIFIER 
  - MPESA_SECURITY_CREDENTIAL

5. Clique em Deploy.

Em menos de 2 minutos, a Vercel compila e coloca o seu backend online com um domínio gratuito como:
https://mpesa-backend-ready.vercel.app

# Minha conclusão

Criar um backend M-Pesa do zero pode parecer uma tarefa impossível no início, mas com as ferramentas certas, torna-se um processo acessível e educativo.
Com este projeto pronto para deploy, qualquer iniciante pode colocar a sua API no ar em minutos — aprendendo, testando e evoluindo com segurança.

O futuro do desenvolvimento em Moçambique depende de acesso, partilha de conhecimento e colaboração.
E este é apenas o primeiro passo para transformar ideias locais em soluções digitais reais.

<p align="right" style="font-size: 12px;"><i> texto aprimorado por IA</i>🤖</p>
