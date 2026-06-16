# EcoFit 🥗

Plataforma de assinatura e e-commerce de **marmitas saudáveis** com suporte a planos nutricionais personalizados.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Java 21, Spring Boot 4.0, Spring Security, Spring Data JPA |
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind CSS 4 |
| Banco | PostgreSQL |
| Autenticação | JWT (jjwt 0.12.6) + OAuth (Google) |
| Pagamento | Criptografia AES-256 |

---

## Estrutura

```
C:\EcoFit
├── apl/                  # Backend (Spring Boot / Maven)
│   ├── .env              # Variáveis de ambiente (não versionar)
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd   # Maven wrapper
│   ├── testar-api.ps1    # Script de testes manuais da API
│   └── src/
│       ├── main/java/com/ecofit/apl/
│       │   ├── api/controller/   # REST controllers
│       │   ├── api/dto/          # Data Transfer Objects
│       │   ├── domain/model/     # Entidades JPA
│       │   ├── domain/repository/# Repositórios
│       │   ├── domain/service/   # Lógica de negócio
│       │   └── infrastructure/security/ # JWT + criptografia
│       └── test/
│
└── ecofit-frontend/      # Frontend (React + Vite)
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── api/          # Chamadas HTTP (Axios)
        ├── components/   # Componentes reutilizáveis
        ├── context/      # AuthContext (JWT)
        ├── pages/        # Páginas (rotas)
        └── types/        # Interfaces TypeScript
```

---

## Pré-requisitos

- **Java 21** JDK
- **Node.js** 18+
- **PostgreSQL** 15+ rodando em `localhost:5432`
- Banco de dados `banco_ecofit` criado no PostgreSQL

---

## 1. Backend (`apl/`)

### Configuração

1. Entre na pasta `apl/`
2. Copie o arquivo de exemplo (opcional, o `.env` já existe):
   ```bash
   cp src/main/resources/application-example.properties src/main/resources/application.properties
   ```
3. Revise o arquivo `.env` com as credenciais do seu PostgreSQL:
   ```env
   DB_URL=jdbc:postgresql://localhost:5432/banco_ecofit
   DB_USER=postgres
   DB_PASSWORD=postgres
   JWT_SECRET=ecofit-chave-secreta-jwt-2024-muito-segura-minimo-32-caracteres
   JWT_EXPIRATION=86400000
   SERVER_PORT=65009
   SHOW_SQL=true
   ```
4. Crie o banco no PostgreSQL:
   ```sql
   CREATE DATABASE banco_ecofit;
   ```

### Executar

```powershell
cd apl
.\mvnw.cmd spring-boot:run
```

A API estará disponível em `http://localhost:65009/api`

### Build

```powershell
.\mvnw.cmd clean package -DskipTests
java -jar target/apl-0.0.1-SNAPSHOT.jar
```

### Testes unitários

```powershell
.\mvnw.cmd test
```

### Teste manual da API

Com o backend rodando, execute:

```powershell
.\testar-api.ps1
```

O script testa: registro → login → OAuth → criação de itens → criação de box → listagem → pedido → atualização de status.

> ⚠️ O script usa a URL `http://localhost:8080/api`. Se seu backend estiver em outra porta (ex.: `65009`), edite a variável `$BASE` no script.

---

## 2. Frontend (`ecofit-frontend/`)

### Configuração

```powershell
cd ecofit-frontend
npm install
```

### Executar (desenvolvimento)

```powershell
npm run dev
```

Acesse `http://localhost:5173`

O Vite faz proxy de `/api` para o backend. Verifique o alvo em `vite.config.ts`:

```ts
proxy: {
  '/api': {
    target: 'http://localhost:8080',  // ← ajuste para a porta do seu backend
    changeOrigin: true,
  },
}
```

> ⚠️ Se o backend estiver rodando em `65009`, altere o `target` para `http://localhost:65009`.

### Build produção

```powershell
npm run build     # gera em dist/
npm run preview   # pré-visualiza o build
```

### Lint

```powershell
npm run lint
```

---

## Endpoints principais

### Públicos
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Registrar usuário |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/oauth` | Login OAuth (Google) |
| GET | `/api/boxes` | Listar boxes |
| GET | `/api/boxes/{id}` | Detalhes da box |
| GET | `/api/itens` | Listar itens |

### Autenticados (Bearer Token)
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/pedidos` | Criar pedido |
| POST | `/api/pedidos/checkout` | Checkout completo |
| GET | `/api/pedidos/usuario/{id}` | Histórico do usuário |
| POST | `/api/assinaturas` | Criar assinatura |
| POST | `/api/planos-nutricionais` | Criar plano nutricional |
| POST | `/api/pagamento/criar` | Criar pagamento |

---

## Funcionalidades

- **Landing page** com apresentação do projeto
- **Cadastro e login** com senha ou Google (OAuth)
- **Dashboard** com boxes mais pedidas e situação da assinatura
- **Boxes personalizadas** — monte sua própria combinação de itens
- **Checkout** com endereço de entrega e forma de pagamento
- **Assinatura semanal/mensal** com renovação automática
- **Plano nutricional** com metas, restrições e macronutrientes
- **Avaliação** de pedidos entregues
- **Painel admin** para gestão de itens, boxes e grupos/permissões
- **Controle de acesso** baseado em grupos e permissões (RBAC)

---

## Discrepância de porta

O backend por padrão roda na porta **65009**, mas o `testar-api.ps1` e o `vite.config.ts` apontam para **8080**. Ajuste conforme sua preferência:

- Para usar **65009**: altere `$BASE` no script e o `target` no `vite.config.ts`
- Para usar **8080**: altere `SERVER_PORT=8080` no `.env`

---

## Credenciais padrão

Para testar, registre um novo usuário via `/api/auth/register` ou pela tela de cadastro do frontend.

---

## Projeto acadêmico

EcoFit é um projeto desenvolvido por:
- Carine de Oliveira
- Emili Lorenzetti
- Emily Tognon
- Leticia Silvestre Marin

Orientação: Rogiane Panisson
