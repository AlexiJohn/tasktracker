const express = require("express");

const db = require('./db');
const cors = require("cors");
const app = express();

const bcrypt = require('bcrypt');

// In-memory data storage
app.use(cors());
app.use(express.json());

// Get all items
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  
// Create a new product
app.post('/items', (req,res) => {
  const items = req.body;
  db.query('INSERT INTO items SET ?', items, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Item created', id: result.insertId });
    }
  });
});

// Update a product by ID
app.put('/items/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  db.query('UPDATE items SET ? WHERE id = ?', [updatedProduct, productId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product updated', id: productId });
      }
    }
  });
});

// Delete a product by ID
app.delete('/items/:id', (req, res) => {
  const productId = req.params.id;
  console.log(productId)
  db.query('DELETE FROM items WHERE id = ?', productId, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product deleted', id: productId });
      }
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        const hashedPassword = results[0].password;
        bcrypt.compare(password, hashedPassword, (bcryptErr, match) => {
          if (bcryptErr) {
            res.status(500).json({ error: 'An error occurred' });
            return;
          }
          if (match) {
            res.json({ message: 'Login successful' });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        });
      }
    }
  );
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hash],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: 'An error occurred' });
          return;
        }

        res.json({ message: 'Signup successful' });
      }
    );
  });
});

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});