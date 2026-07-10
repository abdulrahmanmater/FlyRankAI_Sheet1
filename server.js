const express = require("express")
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.get("/", (req, res) => {
    console.log("Hello world from home page")
    res.status(200).json({
        message: "Hello to my API from home page",
        success: true
    })
})
app.get("/flyRankAI", (req, res) => {
    console.log("Hello world from FlyRank AI")
    res.status(200).json({
        message: "Hello to my API from FlyRank AI",
        success: true
    })
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}.....`)
})