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

| Método | Rota                  | Descrição                                            |
| ------ | --------------------- | ------------------------------------                 |
| POST   | /users                | Cria Usuários.                                       |
| POST   | /login                | Loga o usuário na aplicação.                         |
| PATCH  | /users                | Modifica Usuários.                                   |
| POST   | /address/uuid         | Cadastra um endereço para o usuário.                 |
| GET    | /users/info           | Lista informações do usuário logado.                 |
| GET    | /users                | Lista todos os usuários.                             |
| PATCH  | /users/profile/image  | Armazena imagem de perfil por arquivo no Cloudinary  | 
| GET    | /user/posts/uuid	 | Lista todos os posts de um usuário.			|

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



Todos os querys params são opcionais. Exemplo de requisição: `localhost:3001/users?name=tes&limit=5&offset=5`

Caso nenhum query params seja fornecido, offset terá o valor 0 e limit terá o valor 5.


### Retorno esperado

**STATUS 200**

```json
{
	"nextUrl": "/users?limit=5&offset=5",
	"previousUrl": null,
	"limit": 5,
	"offset": 0,
	"total": 10,
	"users": [
		{
			"uuid": "191d95a3-b5fc-401a-923f-517649ef4093",
			"name": "Daniel",
			"image": null,
			"email": "daniel@gmail.com",
			"cpf": "29148-728",
			"phone": "(00)0000-0000",
			"date_of_birth": "00/00/0000",
			"description": "Descrição",
			"createdAt": "2023-11-29T18:41:56.450Z",
			"updatedAt": "2023-11-29T18:41:56.450Z",
			"address": null
		},
		{
			"uuid": "392dcd63-a3e5-48e0-9d30-bfb1f7d86e91",
			"name": "juuj",
			"image": null,
			"email": "juuj@gmail.com",
			"cpf": "29148-729",
			"phone": "(00)0000-0000",
			"date_of_birth": "00/00/0000",
			"description": "Descrição",
			"createdAt": "2023-11-29T18:42:11.928Z",
			"updatedAt": "2023-11-29T18:42:11.928Z",
			"address": null
		},
		{
			"uuid": "6d073b99-8bee-4e4d-8c86-293e90343acb",
			"name": "Marquinhos",
			"image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1702580959/iyp0rv2lfpofykoji6j5.png",
			"email": "marquinhos@gmail.com",
			"cpf": "29148-725",
			"phone": "(00)0000-0000",
			"date_of_birth": "00/00/0000",
			"description": "Descrição",
			"createdAt": "2023-11-29T18:11:48.479Z",
			"updatedAt": "2023-12-14T19:09:20.449Z",
			"address": null
		},
		{
			"uuid": "86e26a19-435c-4ecf-8f53-4cc55b6d9d98",
			"name": "Douglas",
			"image": null,
			"email": "douglas@gmail.com",
			"cpf": "29148-726",
			"phone": "(00)0000-0000",
			"date_of_birth": "00/00/0000",
			"description": "Descrição",
			"createdAt": "2023-11-29T18:41:29.296Z",
			"updatedAt": "2023-11-29T18:41:29.296Z",
			"address": null
		},
		{
			"uuid": "88bae1f3-1c21-4441-8ed2-bcc8f97dfc6c",
			"name": "matheus",
			"image": null,
			"email": "matheus@gmail.com",
			"cpf": "29148-741",
			"phone": "(00)0000-0000",
			"date_of_birth": "00/00/0000",
			"description": "Descrição",
			"createdAt": "2023-11-29T18:43:14.585Z",
			"updatedAt": "2023-11-29T18:43:14.585Z",
			"address": null
		}
	]
}
```

---

## Armazena imagem de perfil por arquivo
## `/users/profile/image`


#### Necessário Bearer token.

Multipart form

FildName precisa ser `profile`

#### Só serão aceitos formatos JPG, JPEG OU PNG.

### Retorno esperado

**STATUS 200**

```json
{
	"uuid": "23122b9e-d57a-4b06-85e1-5383faf4698",
	"name": "usuario",
	"image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1694716567/s52wouhrjqqtmpugyqsm.png",
	"email": "email@gmail.com",
	"cpf": "000.000.000-00",
	"phone": null,
	"date_of_birth": "19/09/2000",
	"description": null,
	"createdAt": "2023-09-14T18:27:45.187Z",
	"updatedAt": "2023-09-14T18:35:08.980Z",
	"address": null
}
```


---


## Lista todos os posts de um usuário
## `/user/posts/uuid`

#### Necessário Bearer token.

`Query Params:` 
- offset: Define o índice inicial para a páginação.
- limit: Define quantos posts você deseja buscar por páginação.


Todos os querys params são opcionais. Exemplo de requisição: `http://localhost:3001/posts/fd14c75b-8303-499a-b6ef-3d2598474121?offset=0&limit=3`

Caso nenhum query params seja fornecido, offset terá o valor 0 e limit terá o valor 5.

#### Não é necessário corpo para essa requisição.

### Retorno esperado
**STATUS 200**

```json
{
  "nextUrl": "/posts/user?offset=3&limit=3",
  "previousUrl": null,
  "Total": 28,
  "limit": 3,
  "offset": 0,
  "posts": [
    {
      "uuid": "0c6ddb09-5ef6-4d0b-89ee-87e3a47deba9",
      "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet a leo eget fermentum. Vivamus suscipit blandit condimentum. Mauris id gravida metus. Curabitur dictum sed dui ut facilisis. Etiam sit amet vehicula quam, vitae pharetra metus. Praesent sollicitudin porttitor ullamcorper. Maecenas tristique lectus vitae tortor porttitor tristique. Aliquam eu odio augue. Fusce aliquam arcu vitae pretium gravida.",
      "image": null,
      "author_uuid": "fd14c75b-8303-499a-b6ef-3d2598474121",
      "createdAt": "2023-09-22T19:07:04.000Z",
      "updatedAt": "2023-09-22T19:07:04.433Z",
      "author": {
        "uuid": "fd14c75b-8303-499a-b6ef-3d2598474121",
        "name": "Marquinhos",
        "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1695062377/lon0lsou7pqfdxvo4q34.jpg",
        "email": "marquinhos@gmail.com",
        "cpf": "000.000.000-00",
        "phone": null,
        "date_of_birth": "19/09/2000",
        "description": null,
        "password": "$2a$10$QnpNAasQKWMLsMZ8VcMQt.99wTQl.Fo6RuuqGFephsiqt/5bopfn2",
        "createdAt": "2023-09-18T18:36:28.228Z",
        "updatedAt": "2023-09-18T18:39:37.599Z"
      }
    },
    {
      "uuid": "1baae4cc-ca83-47dd-9be7-08b03bf3f937",
      "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet a leo eget fermentum. Vivamus suscipit blandit condimentum. Mauris id gravida metus. Curabitur dictum sed dui ut facilisis. Etiam sit amet vehicula quam, vitae pharetra metus. Praesent sollicitudin porttitor ullamcorper. Maecenas tristique lectus vitae tortor porttitor tristique. Aliquam eu odio augue. Fusce aliquam arcu vitae pretium gravida.",
      "image": null,
      "author_uuid": "fd14c75b-8303-499a-b6ef-3d2598474121",
      "createdAt": "2023-09-22T19:07:04.000Z",
      "updatedAt": "2023-09-22T19:07:04.115Z",
      "author": {
        "uuid": "fd14c75b-8303-499a-b6ef-3d2598474121",
        "name": "Marquinhos",
        "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1695062377/lon0lsou7pqfdxvo4q34.jpg",
        "email": "marquinhos@gmail.com",
        "cpf": "000.000.000-00",
        "phone": null,
        "date_of_birth": "19/09/2000",
        "description": null,
        "password": "$2a$10$QnpNAasQKWMLsMZ8VcMQt.99wTQl.Fo6RuuqGFephsiqt/5bopfn2",
        "createdAt": "2023-09-18T18:36:28.228Z",
        "updatedAt": "2023-09-18T18:39:37.599Z"
      }
    },
    {
      "uuid": "21ba6f14-c824-4aa0-9eec-10d6c54d38ba",
      "post": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet a leo eget fermentum. Vivamus suscipit blandit condimentum. Mauris id gravida metus. Curabitur dictum sed dui ut facilisis.",
      "image": null,
      "author_uuid": "fd14c75b-8303-499a-b6ef-3d2598474121",
      "createdAt": "2023-09-22T19:07:06.000Z",
      "updatedAt": "2023-09-22T19:07:05.768Z",
      "author": {
        "uuid": "fd14c75b-8303-499a-b6ef-3d2598474121",
        "name": "Marquinhos",
        "image": "https://res.cloudinary.com/dacrmdilc/image/upload/v1695062377/lon0lsou7pqfdxvo4q34.jpg",
        "email": "marquinhos@gmail.com",
        "cpf": "000.000.000-00",
        "phone": null,
        "date_of_birth": "19/09/2000",
        "description": null,
        "password": "$2a$10$QnpNAasQKWMLsMZ8VcMQt.99wTQl.Fo6RuuqGFephsiqt/5bopfn2",
        "createdAt": "2023-09-18T18:36:28.228Z",
        "updatedAt": "2023-09-18T18:39:37.599Z"
      }
    }
  ]
}
```

---
