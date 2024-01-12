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
- [Multer](https://www.npmjs.com/package/multer)
- [Cloudinary](https://cloudinary.com)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/docs)
- [Zod](https://zod.dev/?id=table-of-contents)

---

## 3 - Diagrama

Diagrama da API até o momento.

![DER](DER.png)

---

## 4 - Instalação e uso

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

Atenção! para ter acesso ao seu `CLOUD_NAME`, `API_KEY` e `API_SECRET` no .env, você deverá ter uma conta no site [Cloudinary](https://cloudinary.com). Basta clicar em `Sign up for free` e depois em `Sign up with google`, feito isso, você será direcionado à uma página onde possui as informações para inserir no .env. 


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

## 5 - Endpoints

| Método | Rota                  | Descrição                                                 |
| ------ | --------------------- | --------------------------------------------------------  |
| POST   | /users                | Cria Usuários.                                            |
| POST   | /login                | Loga o usuário na aplicação.                              |
| PATCH  | /users                | Modifica Usuários.                                        |
| POST   | /address/uuid         | Cadastra um endereço para o usuário.                      |
| GET    | /users/info           | Lista informações do usuário logado.                      |
| GET    | /users                | Lista todos os usuários.                                  |
| PATCH  | /users/profile/image  | Armazena nova imagem de perfil por arquivo no Cloudinary  |
| DELETE | /users		 | Deleta o usuário					     | 
| GET    | /users/posts/uuid	 | Lista todos os posts de um usuário.			     |
| GET    | /posts		 | Lista todos os posts					     |
| POST 	 | /posts		 | Cria um novo post					     | 
| PATCH  | /posts/uuid 		 | Edita um post do usuário				     |
| PATCH  | /posts/image/uuid     | Adiciona uma imagem ao post				     | 
| DELETE | /posts/uuid		 | Deleta o post do usuário 				     | 

---

## POST

### Criar usuário.

### `/users`

### Requisição

```json
{
  "name": "teste",
  "email": "email@gmail.com",
  "cpf": "12345-678",
  "date_of_birth": "00/00/0000",
  "password": "1234",
  "phone": "(00)00000-0000",
  "description": "Descricão"
}
```

##### "Description" e "phone" são campos opcionais.

### Retorno esperado

**STATUS 201**

```json
{
  "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
  "name": "teste",
  "image": null,
  "email": "teste@gmail.com",
  "cpf": "12345-678",
  "phone": "(00)0000-0000",
  "date_of_birth": "00/00/0000",
  "description": "Descrição",
  "createdAt": "2023-12-29T13:52:06.471Z",
  "updatedAt": "2023-12-29T13:52:06.471Z"
}
```

---

## POST

### Logar usuário na aplicação.

### `/login`

### Requisição

```json
{
  "email": "teste@gmail.com",
  "password": "1234"
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



## PATCH

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
  "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
  "name": "teste patch",
  "image": null,
  "email": "teste@gmail.com",
  "cpf": "12345-678",
  "phone": "(00)0000-0000",
  "date_of_birth": "00/00/0000",
  "description": "Descrição",
  "createdAt": "2023-12-29T13:52:06.471Z",
  "updatedAt": "2023-12-29T13:59:48.689Z",
  "address": null
}
```

---

## POST

### Cadastrar endereço para usuário.

### `/address/uuid`

#### Necessário fornecer uuid do usuário

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
  "uuid": "cdc615ef-ad85-40da-afa5-c19adfb20e54",
  "cep": "01153-000",
  "state": "SP",
  "city": "São Paulo",
  "user_uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
  "user": {
    "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
    "name": "teste patch",
    "image": null,
    "email": "teste@gmail.com",
    "cpf": "12345-678",
    "phone": "(00)0000-0000",
    "date_of_birth": "00/00/0000",
    "description": "Descrição",
    "createdAt": "2023-12-29T13:52:06.471Z",
    "updatedAt": "2023-12-29T13:59:48.689Z"
  },
  "createdAt": "2023-12-29T14:10:01.000Z",
  "updatedAt": "2023-12-29T14:10:00.811Z"
}
```

---

## GET

### Listar informações do usuário logado.

### `/users/info`

#### Não é necessário um corpo para requisição.

#### Necessário Bearer token.

### Retorno esperado

**STATUS 200**

```json
{
  "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
  "name": "teste patch",
  "image": null,
  "email": "teste@gmail.com",
  "cpf": "12345-678",
  "phone": "(00)0000-0000",
  "date_of_birth": "00/00/0000",
  "description": "Descrição",
  "createdAt": "2023-12-29T13:52:06.471Z",
  "updatedAt": "2023-12-29T13:59:48.689Z",
  "address": {
    "uuid": "cdc615ef-ad85-40da-afa5-c19adfb20e54",
    "cep": "01153-000",
    "state": "SP",
    "city": "São Paulo"
  }
}
```

---

## GET

### Listar todos os usuários
### `/users`

#### Não é necessário um corpo para requisição.

#### Necessário Bearer token.

`Query Params:` 
- name: Filtra usuários com o nome fornecido, não é necessário ser o nome completo.
- offset: Define o índice inicial para a páginação.
- limit: Define quantos usuários você deseja buscar por páginação.



Todos os querys params são opcionais. Exemplo de requisição: `http://localhost:3001/users?name=te&limit=2&offset=0`

Caso nenhum query params seja fornecido, offset terá o valor 0 e limit terá o valor 5.


### Retorno esperado

**STATUS 200**

```json
{
	"nextUrl": "/users?name=te&limit=2&offset=2",
	"previousUrl": null,
	"limit": 2,
	"offset": 0,
	"total": 11,
	"users": [
		{
			"uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
			"name": "teste patch",
			"image": null,
			"email": "teste@gmail.com",
			"cpf": "12345-678",
			"phone": "(00)0000-0000",
			"date_of_birth": "00/00/0000",
			"description": "Descrição",
			"createdAt": "2023-12-29T13:52:06.471Z",
			"updatedAt": "2023-12-29T13:59:48.689Z",
			"address": {
				"uuid": "cdc615ef-ad85-40da-afa5-c19adfb20e54",
				"cep": "01153-000",
				"state": "SP",
				"city": "São Paulo"
			}
		},
		{
			"uuid": "fd0ab9c9-2450-4e09-8eba-1d58693bb0fc",
			"name": "teste 2",
			"image": null,
			"email": "test2e@gmail.com",
			"cpf": "12347-678",
			"phone": "(00)0000-0000",
			"date_of_birth": "00/00/0000",
			"description": "Descrição 2",
			"createdAt": "2023-12-29T14:20:15.080Z",
			"updatedAt": "2023-12-29T14:20:15.080Z",
			"address": null
		}
	]
}
```

---
## PATCH

### Armazena nova imagem de perfil por arquivo
### `/users/profile/image`


#### Necessário Bearer token.

Multipart form

FildName precisa ser `profile`

#### Só serão aceitos formatos JPG, JPEG OU PNG.

### Retorno esperado

**STATUS 200**

```json
{
	"uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
	"name": "teste patch",
	"image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1704821697/nuflu6doeopiiqaar4xt.jpg",
	"email": "teste@gmail.com",
	"cpf": "12345-678",
	"phone": "(00)0000-0000",
	"date_of_birth": "00/00/0000",
	"description": "Descrição",
	"createdAt": "2023-12-29T13:52:06.471Z",
	"updatedAt": "2024-01-09T17:34:57.723Z",
	"address": {
		"uuid": "cdc615ef-ad85-40da-afa5-c19adfb20e54",
		"cep": "01153-000",
		"state": "SP",
		"city": "São Paulo"
	}
}
```


---

## GET

### Lista todos os posts de um usuário
### `/users/posts/uuid`

#### Necessário Bearer token.

`Query Params:` 
- offset: Define o índice inicial para a páginação.
- limit: Define quantos posts você deseja buscar por páginação.


Todos os querys params são opcionais. Exemplo de requisição: `http://localhost:3001/users/posts/d9243a46-3e4f-4cd8-a201-859456388fff?limit=2&offset=0`

Caso nenhum query params seja fornecido, offset terá o valor 0 e limit terá o valor 5.

#### Não é necessário corpo para essa requisição.

### Retorno esperado
**STATUS 200**

```json
{
  "nextUrl": null,
  "previousUrl": null,
  "Total": 2,
  "limit": 2,
  "offset": 0,
  "posts": [
    {
      "uuid": "9463ec4d-c997-4e18-977a-208e47d110eb",
      "post": "meu post",
      "image": null,
      "author": {
        "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
        "name": "teste patch",
        "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1704821697/nuflu6doeopiiqaar4xt.jpg",
        "email": "teste@gmail.com",
        "cpf": "12345-678",
        "phone": "(00)0000-0000",
        "date_of_birth": "00/00/0000",
        "description": "Descrição",
        "createdAt": "2023-12-29T13:52:06.471Z",
        "updatedAt": "2024-01-09T17:34:57.723Z"
      },
      "author_uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
      "createdAt": "2024-01-09T17:45:37.000Z",
      "updatedAt": "2024-01-09T17:45:36.822Z"
    },
    {
      "uuid": "deaaf2ef-64f1-4c46-85c9-b26b7d1e4992",
      "post": "outro post",
      "image": null,
      "author": {
        "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
        "name": "teste patch",
        "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1704821697/nuflu6doeopiiqaar4xt.jpg",
        "email": "teste@gmail.com",
        "cpf": "12345-678",
        "phone": "(00)0000-0000",
        "date_of_birth": "00/00/0000",
        "description": "Descrição",
        "createdAt": "2023-12-29T13:52:06.471Z",
        "updatedAt": "2024-01-09T17:34:57.723Z"
      },
      "author_uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
      "createdAt": "2024-01-09T17:45:48.000Z",
      "updatedAt": "2024-01-09T17:45:48.408Z"
    }
  ]
}
```

---

## DELETE 

### Deleta um usuário de acordo com seu Token
### `/users`

#### Necessário Bearer token.

#### Não é necessário corpo para a requisição

### Retorno esperado
**STATUS 204**

--- 

## GET 

### Lista todos os posts
### `/posts`

#### Necessário Bearer token.

`Query Params:` 
- offset: Define o índice inicial para a páginação.
- limit: Define quantos posts você deseja buscar por páginação.


Todos os querys params são opcionais. Exemplo de requisição: `http://localhost:3001/posts/?limit=2&offset=0`

Caso nenhum query params seja fornecido, offset terá o valor 0 e limit terá o valor 5.

#### Não é necessário corpo para a requisição

### Retorno esperado
**STATUS 200**	

```json
{
  "nextUrl": "/posts?offset=2&limit=2",
  "previousUrl": null,
  "Total": 4,
  "offset": 0,
  "limit": 2,
  "posts": [
    {
      "uuid": "3ad939f6-8afb-4825-8fc4-7628997767ed",
      "post": "meu post",
      "image": null,
      "author": {
        "uuid": "6d073b99-8bee-4e4d-8c86-293e90343acb",
        "name": "Marquinhos",
        "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1702580959/iyp0rv2lfpofykoji6j5.png",
        "email": "marquinhos@gmail.com",
        "cpf": "29148-725",
        "phone": "(00)0000-0000",
        "date_of_birth": "00/00/0000",
        "description": "Descrição",
        "createdAt": "2023-11-29T18:11:48.479Z",
        "updatedAt": "2023-12-14T19:09:20.449Z"
      },
      "author_uuid": "6d073b99-8bee-4e4d-8c86-293e90343acb",
      "createdAt": "2023-12-04T19:29:42.000Z",
      "updatedAt": "2023-12-04T19:29:41.787Z"
    },
    {
      "uuid": "9463ec4d-c997-4e18-977a-208e47d110eb",
      "post": "meu post",
      "image": null,
      "author": {
        "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
        "name": "teste patch",
        "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1704821697/nuflu6doeopiiqaar4xt.jpg",
        "email": "teste@gmail.com",
        "cpf": "12345-678",
        "phone": "(00)0000-0000",
        "date_of_birth": "00/00/0000",
        "description": "Descrição",
        "createdAt": "2023-12-29T13:52:06.471Z",
        "updatedAt": "2024-01-09T17:34:57.723Z"
      },
      "author_uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
      "createdAt": "2024-01-09T17:45:37.000Z",
      "updatedAt": "2024-01-09T17:45:36.822Z"
    }
  ]
}
```
---

## POST

### Criar um novo post.

### `/posts`

#### Necessário Bearer token.

### Requisição

```json
{
 "post": "meu novo post"
}
```

### Retorno esperado

**STATUS 201**

```json
{
  "uuid": "d1bea64e-53db-4dbc-ba36-2f74facd4d28",
  "post": "meu novo post",
  "image": null,
  "author": {
    "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
    "name": "teste patch",
    "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1704821697/nuflu6doeopiiqaar4xt.jpg",
    "email": "teste@gmail.com",
    "cpf": "12345-678",
    "phone": "(00)0000-0000",
    "date_of_birth": "00/00/0000",
    "description": "Descrição",
    "createdAt": "2023-12-29T13:52:06.471Z",
    "updatedAt": "2024-01-09T17:34:57.723Z"
  },
  "author_uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
  "createdAt": "2024-01-12T18:06:24.000Z",
  "updatedAt": "2024-01-12T18:06:24.446Z"
}
```

---

## PATCH

### Modificar uum post do usuário.

### `/posts/uuid`

#### Necessário Bearer token.

### Requisição

```json
{
  "post": "Post alterado"
}
```

### Retorno esperado

**STATUS 200**

```json
{
  "uuid": "d1bea64e-53db-4dbc-ba36-2f74facd4d28",
  "post": "post alterado",
  "image": null,
  "author": {
    "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
    "name": "teste patch",
    "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1704821697/nuflu6doeopiiqaar4xt.jpg",
    "email": "teste@gmail.com",
    "cpf": "12345-678",
    "phone": "(00)0000-0000",
    "date_of_birth": "00/00/0000",
    "description": "Descrição",
    "createdAt": "2023-12-29T13:52:06.471Z",
    "updatedAt": "2024-01-09T17:34:57.723Z"
  },
  "author_uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
  "createdAt": "2024-01-12T18:06:24.000Z",
  "updatedAt": "2024-01-12T18:10:39.528Z"
}
```

---

## PATCH

### Armazena nova imagem ao post.
### `/posts/image/uuid`


#### Necessário Bearer token.

Multipart form

FildName precisa ser `post`

#### Só serão aceitos formatos JPG, JPEG OU PNG.

### Retorno esperado

**STATUS 201**

```json
{
  "uuid": "d1bea64e-53db-4dbc-ba36-2f74facd4d28",
  "post": "post alterado",
  "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1705083381/ukfcntqxr5a3h1hhxxc1.png",
  "author": {
    "uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
    "name": "teste patch",
    "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1704821697/nuflu6doeopiiqaar4xt.jpg",
    "email": "teste@gmail.com",
    "cpf": "12345-678",
    "phone": "(00)0000-0000",
    "date_of_birth": "00/00/0000",
    "description": "Descrição",
    "createdAt": "2023-12-29T13:52:06.471Z",
    "updatedAt": "2024-01-09T17:34:57.723Z"
  },
  "author_uuid": "d9243a46-3e4f-4cd8-a201-859456388fff",
  "createdAt": "2024-01-12T18:06:24.000Z",
  "updatedAt": "2024-01-12T18:16:22.132Z"
}
```

---

## DELETE 

### Deleta um post do usuário
### `/posts/uuid`

#### Necessário Bearer token.

#### Não é necessário corpo para a requisição

### Retorno esperado
**STATUS 204**

--- 

