const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const userModel = require('./models/user');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello Mongo');
});

// 1. Create User 
app.post('/api/users', async (req, res) => {
  const { username, name, pass } = req.body;

  if (!username || !name || !pass) {
    return res.status(400).json({ message: 'Username, name, and password are required' });
  }

  try {
    // Using userModel.create() to create and save the user
    const savedUser = await userModel.create({
      username,
      name,
      pass,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
});

// 2. Read User

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await userModel.find();  // Retrieves all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific user by username
app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update User

app.put('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const { name, pass } = req.body;

  if (!name && !pass) {
    return res.status(400).json({ message: 'Please provide data to update (name or pass)' });
  }

  try {
    // Find user by username and update
    const updatedUser = await userModel.findOneAndUpdate(
      { username },
      { $set: { name, pass } },
      { new: true }  // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Delete User

app.delete('/api/users/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Find user by username and remove it
    const deletedUser = await userModel.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
