Project Management System (PMS) Walkthrough
Overview
A full-stack Project Management System built with React, Node.js, Express, and MySQL, fully containerized with Docker.

Features verified
Projects: Create, list, delete projects.
Tasks: Create tasks within projects, update status (Pending -> In Progress -> Completed), delete tasks.
Team: Add and list team members.
Comments: Add comments to tasks (simulated user).
Dashboard: View statistics.
How to Run
Ensure Docker is running.
Run the following command in the project root:
docker compose up --build
Access the application:
Frontend: http://localhost:3000
Backend API: http://localhost:5000
MySQL: localhost:3306
Verification Steps
Open http://localhost:3000.
Navigate to Team Members and add a user (e.g., "John Doe", "
john@example.com
", "Member").
Navigate to Projects and create a project (e.g., "Website Redesign").
Click on the project to view details.
Click Add Task to create a task assigned to "John Doe".
Move the task status using the dropdown.
Expand the task card to Show Comments and add a comment.
Screenshots
(Screenshots can be added here after manual verification)


Comment
Ctrl+Alt+M

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
