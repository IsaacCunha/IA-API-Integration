import express from 'express'
import ollama from 'ollama'
import 'dotenv/config'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.post('/chat', async (req, res) => {
  const { message } = req.body

  console.log('Recebendo resposta do usuário')

  try {
    const response = await ollama.chat({
      model: 'deepseek-r1:8b',
      messages: [{ role: 'user', content: message }],
    })
    
    console.log('Resposta sendo processada pelo modelo')

    res.json({ reply: response.message.content })

    console.log('resposta processada!')
  } catch (error) {
    res.status(500).json({error})
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
