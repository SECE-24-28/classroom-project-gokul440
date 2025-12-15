import express from 'express';
import Group from '../models/Group.js';
import Expense from '../models/Expense.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, participants } = req.body;
    const group = new Group({
      name,
      participants,
      createdBy: req.user?.userId || 'admin'
    });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    
    const expenses = await Expense.find({ groupId: group._id });
    res.json({ group, expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/participants', async (req, res) => {
  try {
    const { participants } = req.body;
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { participants },
      { new: true }
    );
    res.json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;