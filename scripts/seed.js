const { db } = require("@vercel/postgres");
const { users, posts } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      friends INTEGER[] DEFAULT ARRAY[]::INTEGER[]
      );
  `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        return client.sql`
          INSERT INTO users (name, email, password, friends)
          VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.friends})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL,
          status TEXT NOT NULL,
          user_id INTEGER REFERENCES users(id)
        );
      `;

    console.log('Created "posts" table');

    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        return client.sql`
            INSERT INTO posts (id, content, status, user_id)
            VALUES (${post.id}, ${post.content}, ${post.status}, ${post.user_id})
            ON CONFLICT (id) DO NOTHING;
          `;
      })
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
      createTable,
      posts: insertedPosts,
    };
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedPosts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
