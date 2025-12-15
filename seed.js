import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import './models/User.js';
import './models/Group.js';
import './models/Expense.js';

dotenv.config();

const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Expense = mongoose.model('Expense');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Group.deleteMany({});
    await Expense.deleteMany({});

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      { username: 'john_doe', email: 'john@example.com', password: hashedPassword },
      { username: 'jane_smith', email: 'jane@example.com', password: hashedPassword },
      { username: 'bob_wilson', email: 'bob@example.com', password: hashedPassword }
    ]);

    // Create groups
    const groups = await Group.create([
      {
        name: 'Weekend Trip',
        members: [users[0]._id, users[1]._id],
        createdBy: users[0]._id
      },
      {
        name: 'Office Lunch',
        members: [users[0]._id, users[1]._id, users[2]._id],
        createdBy: users[1]._id
      }
    ]);

    // Create expenses
    await Expense.create([
      {
        description: 'Hotel booking',
        amount: 200,
        paidBy: users[0].username,
        groupId: groups[0]._id,
        participants: [users[0].username, users[1].username]
      },
      {
        description: 'Restaurant bill',
        amount: 150,
        paidBy: users[1].username,
        groupId: groups[1]._id,
        participants: [users[0].username, users[1].username, users[2].username]
      },
      {
        description: 'Gas money',
        amount: 50,
        paidBy: users[0].username,
        groupId: groups[0]._id,
        participants: [users[0].username, users[1].username]
      }
    ]);

    console.log('Database seeded successfully!');
    console.log(`Created ${users.length} users, ${groups.length} groups, and 3 expenses`);
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();