# Learning Prisma with PostgreSQL

<br> <br>

## Prisma setup with Express.js server:

 <br>
- First, we need to set up the express.js server according to its documentation <br>
- Then we need to install 'npm i prisma' <br>
- Then need to do 'npx prisma' <br>
- Then need to do npx prisma init <br>
- Then need to open the index.js file then need to install npm install @prisma/client and write <br>
  
<br> <br>
---

\*\*

### Example:

 <br>
const { PrismaClient } = require("@prisma/client");
<br>
const prisma = new PrismaClient({
<br>
log: ['query'] // to see which query is hitted
<br>
})
\*\*

---

<br> <br>

## Database Creation and connection with the server

 <br>

- We need to create a database in Postgres and then need to change the URL of Prisma which is located in the .env file with the actual username and password and database name. <br>
- We need to create a model in schema.prisma based on what type of data we want to store in the database
  <br>

---

<br> <br>

### Example:

 <br>
model User { <br>
id Int @id @default(autoincrement())  <br>
name String? // using ? after datatype, defines it can be passed in the database or not  <br>
email String @unique  <br>
password String?  <br>
created_at DateTime @default(now())  <br>
}

---

<br> <br>

- Then we need to install: npx prisma migrate dev --name ‘what type of schema we create(ex: create_user_schema)’ <br>
- It will generate a folder name migration, and inside the folder it will create a file migration.sql where SQL queries are automatically generated and implemented to the database (automatically create table to the database based on the schema) <br>
