const express = require('express')
const { PrismaClient } = require("@prisma/client");

require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//use of prisma to CRUD oparetion
const prisma = new PrismaClient({
    log: ['query'] // to see which query is hitted
})
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body
    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (findUser) {
        return res.json({ status: 400, message: 'Email already taken please use another email' })
    }

    const newUser = await prisma.user.create({ data: { name, email, password } })
    return res.json({ status: 201, data: newUser, message: 'user created' })
})

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        res.json(users)
    } catch (error) {
        return res.json({ error: error.message })
    }
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
        // we can also use findFirst
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
        })
        return res.json(user)
    } catch (error) {
        return res.json({ error: error.message })
    }
})
app.put('/users/:id', async (req, res) => {
    const uid = req.params.id
    const { name, email, password } = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(uid)
            },
            data: {
                name, email, password
            }
        })
        return res.json({ status: 201, message: 'user updated' })
    } catch (error) {
        return res.json({ error: error.message })
    }
})
app.delete('/users/:id', async (req, res) => {
    const uid = req.params.id
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(uid)
            }
        })
        res.json({ status: 201, message: 'user deleted' })
    } catch (error) {
        return res.json({ error: error.message })
    }
})