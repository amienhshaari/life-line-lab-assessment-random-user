const mongoose = require('mongoose');
const User = require('../schema/user');
require('dotenv').config();

const userSample = [
  'Ally',
  'May',
  'Kelly',
  'Phillip',
  'Ken',
  'Darren',
  'Elly',
  'April',
  'Abraham',
  'June',
];

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );

  const allUsers = await User.find();

  if (allUsers.length === 0) {
    let users = [];

    userSample.forEach((name) => {
      users.push(
        new User({
          name,
          email: `${name}@minitmail.com`,
          phoneNumber: Math.floor(
            Math.random() * (999999999 - 100000000) + 100000000
          ).toString(),
          age: Math.floor(Math.random() * (99 - 1) + 1),
        })
      );
    });

    for (let i = 0; i < users.length; i++) {
      await users[i].save();
    }
    console.info('Created 10 users!');
  } else {
    console.error('Users already initiated!');
  }

  process.exit();
}
