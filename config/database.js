const Database = require('better-sqlite3');
const path = require("path");
const db = new Database(path.join(__dirname, "../data/tasks.db"));
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false
  )
`);

const countStmt = db.prepare('SELECT COUNT(*) AS count FROM tasks');
const rowCount = countStmt.get().count;

if (rowCount === 0) {
  const insertStmt = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');

  const seedTasks = db.transaction((tasks) => {
    for (const task of tasks) {
      insertStmt.run(task.title, task.done ? 1 : 0);
    }
  });

  const initialTasks = [
    { title: 'Learn SQLite', done: true },
    { title: 'Build a Node.js API', done: false },
    { title: 'Write tests', done: false }
  ];

  seedTasks(initialTasks);
  console.log("Database seeded successfully.");
}

module.exports = db;
