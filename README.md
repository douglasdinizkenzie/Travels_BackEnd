# Travels - BackEnd

---

# ATENÇÃO! 🔔
### Esse projeto ainda está sendo desenvolvido, porém caso queira dar uma olhadinha, basta mudar para branch developer e seguir as instruções mencionadas abaixo. 😉

---

## 1 - Sobre

Travels é um projeto que simula uma rede social para os amantes de viagens, onde podem trocar experiências, histórias e interagirem entre si.

---

## 2 - Tecnologias

Um pouco das tecnologias que foram utilizadas no projeto: 

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/docs)
- [Zod](https://zod.dev/?id=table-of-contents)

---

## 3 - Instalação e uso

### Requisitos:
- [NodeJS](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com) ou [yarn](https://yarnpkg.com)
- Banco de dados [PostgreSQL](https://www.postgresql.org)

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn ou npm install
```

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
env.example -> .env
```

Configure as variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

Execute as migrations com o comando:

```
yarn prisma migrate dev

ou

npx prisma migrate dev
```

Para rodar o servidor localmente: 

```
yarn dev

ou

npm run dev
```

---

#### As requisições podem ser testadas em programas como o [Insomnia](https://insomnia.rest/download), [Postman](https://www.postman.com), etc!
---

## 4 - Endpoints

| Método   | Rota       | Descrição                                      |
|----------|------------|------------------------------                  |
| POST     | /users     | Cria Usuários.                                 |
| PATCH    | /users     | Modifica Usuários.                             |
| GET      | /users/info| Lista informações do usuário logado.           |
| POST     | /address/id| Cadastra um endereço para o usuário.           |
| POST     | /login     | Loga o usuário na aplicação.                   |



---

### Criar usuário.
### `/users`
### Requisição

```json
{
	"name": "teste",
	"email": "email@gmail.com",
	"cpf": "12345678904554",
	"date_of_birth": "19/09/2000",
	"password": "123456",
	"phone": "(00)00000-0000",
	"description": "description"
}
```

##### "Description" e "phone" são campos opcionais.

### Retorno esperado
**STATUS 201**

```json
{
  "uuid": "7796cbc3-5d24-473b-9390-23d47bbc36b5",
  "name": "teste",
  "email": "email@gmail.com",
  "cpf": "12345678904554",
  "date_of_birth": "19/09/2000",
  "phone": "(00)00000-0000",
  "description": "description"
}
```



---

### Modificar usuário.
### `/users`
#### Necessário Bearer token.
### Requisição

```json
{
"name": "teste patch"
}
```

### Retorno esperado
**STATUS 200**

```json
{
  "uuid": "7796cbc3-5d24-473b-9390-23d47bbc36b5",
  "name": "teste patch",
  "email": "email@gmail.com",
  "cpf": "12345678904554",
  "date_of_birth": "19/09/2000",
  "phone": "(00)00000-0000",
  "description": "description"
}
```

---

### Cadastrar endereço para usuário.
### `/address/id`

#### Necessário fornecer id do usuário 

### Requisição

```json
{
    "cep": "01153-000",
    "state": "SP",
    "city": "São Paulo"
}
```

### Retorno esperado
**STATUS 201**

```json
{
    "uuid": "2d1e9d36-efe4-4baf-8d28-26a944a556af",
    "cep": "01153-000",
    "state": "SP",
    "city": "São Paulo",
    "user_uuid": "7796cbc3-5d24-473b-9390-23d47bbc36b5",
    "user": {
        "uuid": "7796cbc3-5d24-473b-9390-23d47bbc36b5",
        "name": "teste",
        "email": "email@gmail.com",
        "cpf": "12345678904554",
        "phone": "(00)00000-0000",
        "date_of_birth": "19/09/2000",
        "description": "description"
    }
}
```

---

### Listar informações do usuário logado.
### `/users/info`

#### Não é necessário um corpo para requisição.
#### Necessário Bearer token.

### Retorno esperado
**STATUS 200**

```json
{
	"uuid": "7796cbc3-5d24-473b-9390-23d47bbc36b5",
	"name": "teste",
	"email": "email@gmail.com",
	"cpf": "12345678904554",
	"phone": "(00)00000-0000",
	"date_of_birth": "19/09/2000",
	"description": "description",
	"address": {
		"uuid": "2d1e9d36-efe4-4baf-8d28-26a944a556af",
		"cep": "01153-000",
		"state": "SP",
		"city": "São Paulo"
	}
}
```

---

### Logar usuário na aplicação.
### `/login`
### Requisição

```json
{
	"email": "email@gmail.com",
	"password": "123456"
}
```

### Retorno esperado
**STATUS 200**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY5MjY0MTMyOSwiZXhwIjoxNjkyNzI3NzI5LCJzdWIiOiI3Nzk2Y2JjMy01ZDI0LTQ3M2ItOTM5MC0yM2Q0N2JiYzM2YjUifQ.VXCgaFen5Ur6-mj_9SGBxetJQSvavZ553W5XwMvWB"
}
```

---



