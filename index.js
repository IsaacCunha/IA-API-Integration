import express from 'express'
import ollama from 'ollama'
import cors from 'cors'
import { YoutubeTranscript } from 'youtube-transcript';
//import 'dotenv/config' - necessário para outros modelos como os da OpenAi por exemplo

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())
app.use(express.static('public'))

app.post('/chat', async (req, res) => {
  const { message } = req.body

  console.log('Recebendo resposta do usuário')

  try {
    console.log(`a url ${message} está sendo trabalhada`)

    const transcript = await YoutubeTranscript.fetchTranscript(message);
    const formattedText = transcript.map(item => item.text).join(' ');
    const cleanText = formattedText.replace(/\s+/g, ' ').trim();

    const resume = await ollama.chat({
      model: 'deepseek-r1:8b',
      messages: [{ role: 'user', content: `Please, make a resume for this text: ${cleanText}` }],
    });

    res.json({ reply: resume.message.content });

    console.log(cleanText)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
