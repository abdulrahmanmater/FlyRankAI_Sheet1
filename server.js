const express = require("express")
const app = express()
const db = require("./config/database.js")
const port = process.env.PORT || 3000
const taskRouter = require("./routes/taskRouter.js")
app.use(express.json())

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use("/to-do/tasks", taskRouter)


app.get("/", (req, res) => {
    res.status(200).json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})


app.listen(port, () => {
    console.log(`server is running on port ${port}.....`)
})