const { Client } = require('pg');

// Read directly from the hardcoded string since verifying .env loading is a separate step
// Using the connection string provided earlier by the user + the one I updated in .env.local
const connectionString = 'postgresql://neondb_owner:npg_N5VD3aCzkUcB@ep-wispy-moon-ahwpzeg2-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

console.log('Testing connection to:', connectionString.replace(/:[^:@]*@/, ':****@')); // masking password

const client = new Client({
    connectionString,
    ssl: true, // Force SSL for Neon
});

async function testConnection() {
    try {
        await client.connect();
        console.log('✅ Connected successfully to the database!');

        // Simple query to verify
        const res = await client.query('SELECT NOW()');
        console.log('Timestamp from DB:', res.rows[0].now);

        await client.end();
    } catch (err) {
        console.error('❌ Connection failed:', err);
        process.exit(1);
    }
}

testConnection();
