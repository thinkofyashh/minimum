import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



type Bindings = {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const user = await prisma.user.create({
  data: {
    name: 'Test User',
    email: 'test@example.com',
  },
})
const users = await prisma.user.findMany()

return c.json({ message: 'User created!', created: user, allUsers: users })




 // return c.text('Hello Hono!')
})

export default app
