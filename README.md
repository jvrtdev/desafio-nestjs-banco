# Sistema Bancário com Domain-Driven Design (DDD)

Este projeto implementa um sistema bancário backend utilizando **NestJS** e **Domain-Driven Design (DDD)**. A aplicação gerencia **clientes**, **contas bancárias** e **movimentações financeiras**, seguindo uma arquitetura organizada em camadas de domínio, aplicação e infraestrutura.

## **Requisitos Implementados**

- Implementei JWT para autenticação no sistema
- Implementei um sistema de cache na rota ``GET /auth`` para aumentar a performance

### **Clientes**
- Atributos:
  - Nome completo.
  - CPF (único).
  - Data de nascimento.
  - Senha
- Regras de negócio:
  - O CPF é validado.
  - Um cliente pode possuir várias contas bancárias.

### **Contas Bancárias**
- Atributos:
  - Número da conta (gerado automaticamente).
  - Saldo inicial (opcional, padrão: zero).
  - Status (ativa/inativa).
- Regras de negócio:
  - Apenas contas ativas podem realizar movimentações.
  - Uma conta pertence a um único cliente.

### **Movimentações Financeiras**
- Tipos:
  - Depósito.
  - Saque.
  - Transferência entre contas.
- Regras de negócio:
  - O saldo não pode ser negativo.
  - Transferências só podem ocorrer entre contas ativas.
  - Cada movimentação registra:
    - Data/hora.
    - Tipo de movimentação.
    - Valor.
    - Contas envolvidas (origem e destino).
    

---

## **Endpoints**

### **1. Clientes**
- `POST /clientes`: Criação de um novo cliente.
- `GET /clientes/:id`: Obter informações de um cliente, incluindo suas contas.

### **2. Contas Bancárias**
- `POST /contas`: Criar uma nova conta para um cliente.
- `PATCH /contas/:id`: Atualizar o status de uma conta (ativa/inativa).
- `GET /contas/:id`: Obter informações de uma conta, incluindo movimentações.

### **3. Movimentações**
- `POST /movimentacoes/deposito`: Realizar um depósito.
- `POST /movimentacoes/saque`: Realizar um saque.
- `POST /movimentacoes/transferencia`: Realizar uma transferência entre contas.
  
### **4. Logs**
- `GET /log`: Buscar todos os logs.

### **5. Autenticação**
- `POST /auth`: Fazer login para dar acesso as rotas através de um Bearer Token.
  
---

## **Banco de Dados**

- **Tipo**: Relacional (PostgreSQL).
- **ORM**: Sequelize.
- Modelagem:
  - Tabelas para `Clientes`, `Contas Bancárias`, `Movimentações`, `Contas Envolvidas Em Uma Movimentação`, `Logs`.
  - Relacionamentos definidos:
    - Um cliente pode possuir várias contas.
    - Movimentações referenciam as contas envolvidas.
    - Cada movimentação é registrada na tabela de Logs.

---

## **Validações**

- Utilização de `class-validator` para validação de entradas:
  - Exemplo: Verificação de CPF válido.
- Tratamento de regras de negócio:
  - Implementado nos Serviços de Domínio, não nos controladores.

---

## **Como Executar**

### **Requisitos**
- Node.js v16+
- Docker

### **Passos**
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-bancario-ddd.git
   cd sistema-bancario-ddd
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Suba o container Docker com o Banco de Dados:
   - Abra o terminal e digite docker compose up -d.
   - (É necessário ter o Docker instalado na sua maquina)
   - Exemplo:
     ```bash
     docker compose up -d
     ```

4. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

6. Acesse a API em:
   ```
   http://localhost:3000
   ```
- **Documentação com Swagger**:
  - Disponível em: `http://localhost:3000/api`.


## **Estrutura de pastas**

![image](https://github.com/user-attachments/assets/2093b895-2523-4138-9169-155c3696569d)

- Domain: Parte que contém a regra de negócios da aplicação, entidades, DTO'S e Etc...
- Common: Nas minhas arquiteturas uso essa pasta para armazenar trechos de códigos que podem ser reutilizados por toda a aplicação como Enums, Utils, Abstract Patterns e Etc...
- Repositories: Pasta que gerencia o acesso a informações do banco de dados, separei do resto dos módulos para furutamente implementar testes unitários.
- Modules: Aqui contém os módulos da aplicação como ``Customer``, ``Account``, ``Transactions``. Dentro de cada módulo deixo os controllers, use-cases, providers, tudo que é referente ao módulo.

**Como eu penso em DDD ao Arquitetar um Sistema**
- DDD é uma filosofia de código que pode ser aplicada em qualquer tipo de arquitetura. Existem tipos de arquitetura que favorecem a implementação do DDD, mas nada adianta se quebrar os princípios do DDD.
- Segui os princípios de DDD usando uma linguagem ubíqua para descrever os conceitos e contextos de cada domínio.
- Segui o princípio de Bounded Context, na minha aplicação cada domínio tem suas tarefas, nenhum domínio faz o papel de outro. Ou seja, todos os contextos e funções foram delimitados.

  ![image](https://github.com/user-attachments/assets/54646cf7-70f3-44b1-9fe9-b6b880cc1780)





## **Tecnologias Utilizadas**

- **NestJS**: Framework backend.
- **TypeScript**: Linguagem principal.
- **PostgreSQL**: Banco de dados relacional.
- **Sequelize**: ORM para modelagem de dados.
- **Swagger**: Documentação de API.
- **class-validator**: Validação de dados.
  

---

## **Autores**

Desenvolvido por [João Vitor Romano](https://github.com/jvrtdev).
