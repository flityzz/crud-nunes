## Instalação

Certifique-se de ter os seguintes programas:

portas utilizadas: 4000, 3000 e 5432(banco de dados)

```bash
Node.js >= v18.17.0
Docker >= Docker version 24.0.6, build ed223bc
Docker-compose >= Docker Compose version v2.23.0-desktop.1
```

Clone o repo: https://github.com/flityzz/crud-nunes.git

Em seguida rode esses comandos para baixar as dependências:

```bash
npm install (na pasta backend e frontend)
```

Certifique-se que ja esteja com o docker inicializado, pois sera necessário para rodar o comando abaixo:

```bash
docker compose up -d (na pasta raiz do projeto)
```

IMPORTANTE: rode os comandos abaixo na pasta backend para estabelecer a conexao com o banco

```bash
npx prisma generate

depois

npx prisma migrate dev (cria o banco)
```

Agora para iniciar a aplicação rode esses comandos nas pastas backend e frontend

```bash
npm run dev
```

Para verificar o banco de dados em tempo real rode o commando na pasta backend

```bash
npx prisma studio
```
