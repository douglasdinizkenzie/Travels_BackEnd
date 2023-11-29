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

Atenção! para ter acesso ao seu `CLOUD_NAME`, `API_KEY` e `API_SECRET` no .env, você deverá ter uma conta no site [Cloudinary](https://cloudinary.com). É bem fácil, basta clicar em `Sign up for free` e depois em `Sign up with google`, feito isso, você será direcionado à uma página onde possui as informações para inserir no .env. 


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
| PATCH  | /users                | Modifica Usuários.                                   |
| GET    | /users/info           | Lista informações do usuário logado.                 |
| GET    | /users                | Lista todos os usuários.                             |
| PATCH  | /users/profile/image  | Armazena imagem de perfil por arquivo no Cloudinary  | 
| POST   | /address/uuid         | Cadastra um endereço para o usuário.                 |
| POST   | /login                | Loga o usuário na aplicação.                         |
| GET    | /user/posts/uuid	 | Lista todos os posts de um usuário.			|

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
	"nextUrl": "/users?name=tes&limit=5&offset=5",
	"previousUrl": null,
	"limit": 5,
	"offset": 0,
	"total": 12,
	"users": [
		{
			"uuid": "1b0c82a2-a167-4dad-b688-18bd0525d37",
			"name": "teste 4",
			"image": null,
			"email": "teste4@gmail.com",
			"cpf": "12345678901237",
			"phone": null,
			"date_of_birth": "19/09/2000",
			"description": null,
			"createdAt": "2023-08-31T18:44:01.886Z",
			"updatedAt": "2023-08-31T18:44:01.886Z",
			"address": null
		},
		{
			"uuid": "1daa0b1d-5bb3-4d2e-93a2-30bfc8e0287",
			"name": "teste 2",
			"image": null,
			"email": "teste2@gmail.com",
			"cpf": "12345678901235",
			"phone": null,
			"date_of_birth": "19/09/2000",
			"description": null,
			"createdAt": "2023-08-31T18:43:42.612Z",
			"updatedAt": "2023-08-31T18:43:42.612Z",
			"address": null
		},
		{
			"uuid": "1dd63d89-2d1f-441d-abcf-095fa13df04",
			"name": "teste 11",
			"image": null,
			"email": "teste11@gmail.com",
			"cpf": "12345678901250",
			"phone": null,
			"date_of_birth": "19/09/2000",
			"description": null,
			"createdAt": "2023-08-31T18:45:23.338Z",
			"updatedAt": "2023-08-31T18:45:23.338Z",
			"address": null
		},
		{
			"uuid": "2eddfcdc-24f8-42fa-9dd5-7c47563ca0f5",
			"name": "teste 7",
			"image": null,
			"email": "teste7@gmail.com",
			"cpf": "12345678901230",
			"phone": null,
			"date_of_birth": "19/09/2000",
			"description": null,
			"createdAt": "2023-08-31T18:44:32.532Z",
			"updatedAt": "2023-08-31T18:44:32.532Z",
			"address": null
		},
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
