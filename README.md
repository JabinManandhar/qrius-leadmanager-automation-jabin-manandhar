# Qrius Lead Manager: Playwright Automation Assignment
A small working web application: the **Qrius Lead Manager**. It lets a user sign in, then view, search, add, edit and delete sales leads.

**Backend**: Node + Express + PostgreSQL
**Frontend**: React
**FINDINGS.md**: details of application bugs or mistakes found on failed tests

## Full step-by-step instructions, including pgAdmin from opening it to refreshing the data:

1. Create a PostgreSQL database qrius_leads in pgAdmin, then run backend/sql/02_schema_and_seed.sql in its Query Tool.
2. Backend: cd backend, cp .env.example .env (set PGPASSWORD), npm install, npm run dev. Runs on port 3000.
3. Frontend: cd frontend, npm install, npm run dev. Runs on port 5173.
4. Open http://localhost:5173/login and sign in with credentials. (Username: admin.qrius, Password: Admin@123) or  (Username: agent.qrius, Password: Agent@123)

## Concepts Implemented: POM + Fixtures + Hooks



