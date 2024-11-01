'use strict';

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

// TODO: Write a function to establish a connection to the SQLite database. The database file will be called mydatabase.db
async function getDBConnection() {
    const db = await sqlite.open({
        filename: 'two.db',
        driver: sqlite3.Database
    });
    return db;
}

async function insertUserQuery(name, email) {
    const db = await getDBConnection();
    const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
    await db.all(query, [name, email]);
    db.close();
}

async function main() {
    try {
        // Establish a database connection
        const db = await getDBConnection();

        // Create a users table if it doesn't exist
        await db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        );`);

        // TODO: Create a funciton called insertUserQuery to insert new users into the users table. Insert this data: ['Alice', 'alice@example.com'], ['Bob', 'bob@example.com']. Use a console.log to verify insertion
        await insertUserQuery("Alice", "alice@example.com");
        await insertUserQuery("Bob", "bob@example.com");

        // Query all users from the users table
        const selectUsersQuery = `SELECT * FROM users`;
        const users = await db.all(selectUsersQuery);
        console.log('Users:', users);

        // TODO: Update a user's email based on their ID. Run this query and update Alice's email to alice@newdomain.com and her ID is 1.
        const updateUserQuery = `UPDATE users SET email = ? WHERE id = ?`;
        // code here
        const result = await db.run(updateUserQuery, ["alice@newdomain.com", 1]);
        // console.log(result);
        console.log('Updated user with ID 1.');

        // TODO: Delete a user from the users table based on their ID
        const deleteQuery = "DELETE FROM users WHERE id = ?";
        await db.all(deleteQuery, 2);
        console.log('Deleted user with ID 2.');

        // Query all users again to see the changes
        const updatedUsers = await db.all(selectUsersQuery);
        console.log('Updated Users:', updatedUsers);

        // Close the database connection
        await db.close();
        console.log('Database connection closed.');

    } catch (error) {
        console.error('Error:', error);
    }
}

main();