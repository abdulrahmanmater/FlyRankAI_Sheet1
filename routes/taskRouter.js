const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("./data/tasks.db");


/**
 * @swagger
 * /to-do/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     description: Retrieve a list of tasks from the server. If no tasks exist, a message is returned.
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: A list of tasks or a message indicating no tasks exist.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 - $ref: '#/components/schemas/MessageResponse'
 */
router.get("/", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks").all();
    if (tasks.length === 0) {
        return res.json({
            message: "There are no tasks"
        });
    }
    res.json(tasks);
});

/**
 * @swagger
 * /to-do/tasks/{id}:
 *   get:
 *     summary: Retrieve a task by ID
 *     description: Retrieve a specific task by its unique ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to retrieve.
 *     responses:
 *       200:
 *         description: The requested task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }
    res.json(task);
});

/**
 * @swagger
 * /to-do/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Add a new task to the list. The task will be created with done set to false by default.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: The task was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: created
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request (missing or empty title).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post("/", (req, res) => {
    const { title } = req.body;
    if (!title || !title.trim()) {
        return res.status(400).json({
            message: "the title is required"
        });
    }
    const task = { title, done: false };
    db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)").run(title, 0);
    res.status(201).json({
        message: "created",
        task
    });
});

/**
 * @swagger
 * /to-do/tasks/{id}:
 *   patch:
 *     summary: Update an existing task
 *     description: Update the title and/or completion status of a task.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: The updated task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request (invalid data or nothing to update).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.put("/:id", (req, res) => {
    const { title, done } = req.body;
    const id = Number(req.params.id);

    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    if (title === undefined || done === undefined) {
        return res.status(400).json({
            error: "Data is invaild"
        });
    }

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            error: "Title must be a non-empty string"
        });
    }

    if (done !== 1 && done !== 0) {
        return res.status(400).json({
            error: "Done must be 1 or 0"
        });
    }

    db.prepare(
        "UPDATE tasks SET title = ?, done = ? WHERE id = ?"
    ).run(title, done, id);

    const updatedTask = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    res.status(200).json(updatedTask);
});

/**
 * @swagger
 * /to-do/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Remove a task from the list by its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to delete.
 *     responses:
 *       204:
 *         description: Task successfully deleted (no content).
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
    res.status(200).json({
        message: "deleted",
        task
    });
});

module.exports = router;