const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "A simple Express.js API to manage to-do tasks.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    tags: [
      {
        name: "Tasks",
        description: "Task management operations",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          required: ["id", "title", "done"],
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated ID of the task.",
              example: 1,
            },
            title: {
              type: "string",
              description: "The title of the task.",
              example: "Study Node.js",
            },
            done: {
              type: "boolean",
              description: "The status of the task.",
              example: false,
            },
          },
        },
        TaskInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              description: "The title of the task.",
              example: "Study Node.js",
            },
          },
        },
        TaskUpdate: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the task.",
              example: "Study Node.js Advanced",
            },
            done: {
              type: "boolean",
              description: "The status of the task.",
              example: true,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message details.",
              example: "Task not found",
            },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Message details.",
              example: "There are no tasks",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;