const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('app'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/img', express.static(__dirname + '/img'))
app.use('/js', express.static(__dirname + '/js'))

app.get('',(req, res) => {
  res.sendFile(__dirname + '/categories.html')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})