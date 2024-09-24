const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, getRandomComments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete collections if they exist
  await connection.db.dropCollection('users').catch(() => {});
  await connection.db.dropCollection('thoughts').catch(() => {});

  const users = [];
  for (let i = 0; i < 3; i++) {
    const userName = getRandomUser();
    const userEmail = `${userName.toLowerCase()}@example.com`; // Generate email
    const userId = i + 1; // Simple sequential ID

    users.push({
      id: userId,
      name: userName,
      email: userEmail,
      comments: getRandomComments(3), // Adjust based on your needs
    });
  }

  // Create users in the database
  const userData = await User.create(users);

  // Example thought creation
  await Thought.create({
    thought: 'Amazing thought',
    users: [...userData.map(({ _id }) => _id)],
  });

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
