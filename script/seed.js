const db = require("../server/db");
const User = require("../server/db/models/user.js");

const dummyUsers = [
  {
    firstName: "Kait",
    lastName: "Martinez",
    password: "123",
    email: "me@gmail.com"
  },
  {
    firstName: "Stef",
    lastName: "Reyes",
    password: "123",
    email: "you@gmail.com"
  }
];

async function seed() {
  await db.sync({ force: true });

  await Promise.all(
    dummyUsers.map(user => {
      return User.create(user);
    })
  );

  console.log("db synced!");
  console.log(`seeded ${dummyUsers.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
