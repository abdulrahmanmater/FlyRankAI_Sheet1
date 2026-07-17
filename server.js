const express = require("express")
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const tasks = [
  {
    id:1,
    title:"Study",
    done:true
  },
  {
    id:2,
    title:"apply",
    done:false
  },
  {
    id:3,
    title:"play",
    done:false
  }
]


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

app.get("/tasks",(req, res)=>{
    if (tasks.length===0){
        return res.json({
            message:"There are no tasks"
        })
    }
    res.json(tasks)
})

app.get("/tasks/:id",(req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.find((task)=>{
        return task.id === id
    })
    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}.....`)
})