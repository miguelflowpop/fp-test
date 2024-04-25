import express from 'npm:express@4.18.2'

const app = express()
app.use(express.json())
const port = 3000

app.get('/hello-world', (req, res) => {
  res.send('Hello World!')
})

app.post('/hello-world', (req, res) => {
  const { name } = req.body
  res.send(`Hello ${name}!`)
  console.log(`Hello ${name}!`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})