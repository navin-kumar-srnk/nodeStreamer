
const cors =require("cors")
const express = require('express')
const path = require('path')
const homeDir=require('os').homedir()

const streamRoutes=require('./Routes/stream')

const app = express()
const port = 5000

app.use(cors({origin:'*'}))
app.use(express.json())


app.use('/stream',streamRoutes)


app.use('/live', express.static(path.join(homeDir, '/static')))











app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})