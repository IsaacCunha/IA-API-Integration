import express from 'express'
import ollama from 'ollama'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/chat', async (req, res) => {
  const { message } = req.body

  try {
    const response = await ollama.chat({
      model: 'deepseek-r1:8b',
      messages: [{ role: 'user', content: message }],
    })

    res.json({ reply: response.message.content })
  } catch (error) {
    res.status(500).json({error})
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
