# Tasks API

A simple, production-ready RESTful Express.js API to manage to-do tasks. This project features a robust, fully documented OpenAPI 3.0 (Swagger) integration, enabling seamless discovery and testing of the endpoints directly from the browser.

## 🚀 Quick Start

You can install the dependencies and start the server with a single command:

```bash
npm install && npm start
```
*(If `npm start` is blocked by your system's execution policies, simply run: `npm install && node server.js`)*

Once running, the server operates at `http://localhost:3000`. 

To view and interact with the **Swagger UI documentation**, open your browser and navigate to:  
**[http://localhost:3000/docs](http://localhost:3000/docs)**

---

## 📡 API Endpoints

All task endpoints are prefixed with `/to-do/tasks`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/to-do/tasks` | Retrieve a list of all tasks. |
| `GET` | `/to-do/tasks/:id` | Retrieve a specific task by its unique ID. |
| `POST` | `/to-do/tasks` | Create a new task (defaults to `done: false`). |
| `PATCH` | `/to-do/tasks/:id` | Update an existing task's title and/or status. |
| `DELETE` | `/to-do/tasks/:id` | Delete a task by its unique ID. |

---

## 💻 Example Request (`curl`)

Here is an example of fetching all tasks via the terminal using `curl`:

```bash
curl -i http://localhost:3000/to-do/tasks
```

**Output:**

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 130
ETag: W/"82-xVptmpGHhl5jG0bmjW1aCfGrN/c"
Date: Fri, 17 Jul 2026 23:37:50 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[
  {"id":1,"title":"Study","done":true},
  {"id":2,"title":"apply","done":false},
  {"id":3,"title":"Study Node.js Advanced","done":true}
]
```

---

## 📖 Interactive Documentation

This API ships with interactive documentation powered by Swagger UI. You can view all schemas, execute live requests, and see server responses in real time.

![Swagger UI Documentation Screenshot](./swagger-screenshot.png)
*(Note: Be sure to place your actual screenshot in the project directory as `swagger-screenshot.png`!)*
