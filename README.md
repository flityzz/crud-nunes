## Instalação

Certifique-se de ter os seguintes programas:

```bash
Node.js >= v18.17.0
Docker >= Docker version 24.0.6, build ed223bc
Docker-compose >= Docker Compose version v2.23.0-desktop.1
```

Clone o repo: https://github.com/flityzz/crud-nunes.git

Em seguida rode esses comandos para baixar as dependências:

```bash
npm install
# or
yarn install
```

Certifique-se que ja esteja com o docker inicializado, pois sera necessário para rodar o comando abaixo:

```bash
docker compose up -d
```

Agora para iniciar a aplicação rode esses comandos nas pastas backend e frontend

```bash
npm run dev
# or
yarn dev
```

Para verificar o banco de dados em tempo real rode o commando na pasta backend

```bash
npx prisma studio
```
