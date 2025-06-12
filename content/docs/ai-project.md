# Using Task Master AI with Cursor

Task Master AI is a powerful tool for managing and automating project tasks directly within your development environment. This guide will help you get started using Task Master AI with Cursor.

---

## 1. Installation

First, ensure you have Task Master AI installed in your project. You can install it via npm:

```bash
npm install -g task-master-ai
```

Or, if you prefer using `npx` (no global install required):

```bash
npx task-master-ai
```

---

## 2. Initializing a Project

Navigate to your project root in the terminal and run:

```bash
taskmaster init
```

This will set up the necessary configuration files and folders for Task Master AI.

---

## 3. Creating a Product Requirements Document (PRD)

Create a PRD file in your project (e.g., `.taskmaster/docs/prd.txt`). This document should outline your project's goals, features, and requirements.

---

## 4. Generating Tasks from PRD

Once your PRD is ready, generate tasks automatically:

```bash
taskmaster parse-prd
```

This will analyze your PRD and create a set of actionable tasks.

---

## 5. Viewing and Managing Tasks

- **List all tasks:**
  ```bash
  taskmaster tasks
  ```
- **View a specific task:**
  ```bash
  taskmaster task <task-id>
  ```
- **Mark a task as done:**
  ```bash
  taskmaster done <task-id>
  ```

---

## 6. Expanding Tasks into Subtasks

To break down a complex task into subtasks:

```bash
taskmaster expand <task-id>
```

---

## 7. Using Task Master AI in Cursor

- Open the Command Palette in Cursor (usually `Cmd+K` or `Cmd+Shift+P`).
- Search for "Task Master" commands.
- You can run, view, and manage tasks directly from the Cursor interface.

---

## 8. Tips

- Keep your PRD up to date for the best results.
- Use the AI's suggestions to refine and expand your task list.
- Regularly sync your tasks with your team.

---

## 9. More Resources

- [Task Master AI Documentation](https://github.com/task-master-ai/docs)
- [Cursor Editor Documentation](https://www.cursor.so/docs)

---

Happy building!
