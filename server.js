
 
// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
const cache = new NodeCache();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Preflight request response
    } else {
        next();
    }
});

// Rate limiter middleware to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: "Hold on there, maybe get a life instead of spamming my API.",
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aman@123',
    database: 'socialmedia',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Create 'posts' table if not exists
db.query(`CREATE TABLE IF NOT EXISTS posts(
  id INT PRIMARY KEY,
  textContent TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error('Error creating posts table:', err);
    }
});

// POST endpoint to create a new post
app.post('/api/v1/posts', (req, res) => {
    const {
        id,
        textContent
    } = req.body;
    const sql = 'INSERT INTO posts (id, textContent) VALUES (?, ?)';

    // Check if the SQL query is not empty
    if (!sql.trim()) {
        console.warn('Empty SQL query. Skipping database insertion.');
        res.status(400).json({
            error: 'Bad Request'
        });
    } else {
        // Execute the SQL query
        db.query(sql, [id, textContent], (err, results) => {
            if (err) {
                console.error('Error creating post:', err);
                res.status(500).json({
                    error: 'Internal Server Error'
                });
            } else {
                res.status(201).json({
                    id,
                    textContent
                });
            }
        });
    }
});

// GET endpoint for post analysis
app.get('/api/v1/posts/:id/analysis', (req, res) => {
    const postId = req.params.id;
    const cacheKey = `postAnalysis_${postId}`;

    // Check if the data is in the cache
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log("hello this is cached");
        res.status(200).json(cachedData);
    } else {
        const sql = 'SELECT * FROM posts WHERE id = ?';

        db.query(sql, [postId], (err, results) => {
            if (err) {
                console.error('Error retrieving post:', err);
                res.status(500).json({
                    error: 'Internal Server Error'
                });
            } else if (results.length === 0) {
                res.status(404).json({
                    error: 'Post not found'
                });
            } else {
                const post = results[0];
                const words = post.textContent.split(' ');
                const wordCount = words.length;
                const totalWordLength = words.reduce((acc, word) => acc + word.length, 0);
                const averageWordLength = totalWordLength / wordCount;

                const analysisResult = {
                    wordCount,
                    averageWordLength
                };

                // Cache the result for future requests
                cache.set(cacheKey, analysisResult, 15 * 60); // Cache for 15 minutes

                res.status(200).json(analysisResult);
            }
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


 