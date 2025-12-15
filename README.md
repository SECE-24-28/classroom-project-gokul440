

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
