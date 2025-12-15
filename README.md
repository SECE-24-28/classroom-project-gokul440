<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======


# Expense Splitter Backend

## Setup

1. **MongoDB Atlas Setup:**
   - Create account at mongodb.com/atlas
   - Create new cluster
   - Get connection string
   - Update `.env` file with your MongoDB URI

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-splitter
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. **Run Server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user

### Groups
- `POST /api/groups` - Create group
- `GET /api/groups/:id` - Get group with expenses
- `PUT /api/groups/:id/participants` - Update participants

### Expenses
- `POST /api/expenses` - Add expense
- `GET /api/expenses/group/:groupId` - Get group expenses
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/balances/:groupId` - Calculate balances

## Frontend Integration

Update your React app to use these endpoints instead of local state. 
>>>>>>> 70ee03d84999883e9515d23a7a5006e0f61cebd8
