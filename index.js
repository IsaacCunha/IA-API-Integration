import ollama from 'ollama'
import 'dotenv/config'

async function main() {
  try {
    const response = await ollama.chat({
      model: 'deepseek-r1:1.5b',
      messages: [{ role: 'user', content: 'suco de laranja natural faz mal?' }],
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
    
  }

  main();