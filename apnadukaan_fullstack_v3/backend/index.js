const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;
const JWT_SECRET = 'dev_secret_for_demo_change_in_prod';
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

function readJSON(file){
  try { return JSON.parse(fs.readFileSync(file)); } catch(e){ return []; }
}
function writeJSON(file, data){ fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

app.get('/', (req, res) => res.send('ApnaDukaan backend running'));

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const users = readJSON(USERS_FILE);
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), name, email, password: hash, role: role === 'SELLER' ? 'SELLER' : 'CUSTOMER' };
  users.push(user);
  writeJSON(USERS_FILE, users);
  res.json({ message: 'Registered' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const users = readJSON(USERS_FILE);
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, name: user.name, email: user.email, role: user.role });
});

// Products
app.get('/api/products', (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const p = products.find(x=>x.id === req.params.id);
  if(!p) return res.status(404).json({message:'Not found'});
  res.json(p);
});

// Add product (seller only)
app.post('/api/products', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'SELLER') return res.status(403).json({message:'Only sellers allowed'});
    const products = readJSON(PRODUCTS_FILE);
    const { name, price, shortDesc, longDesc, image } = req.body;
    if(!name || !price) return res.status(400).json({message:'Missing fields'});
    const newP = { id: 'p'+Date.now(), name, price, shortDesc, longDesc, image: image || '', sellerId: payload.id };
    products.push(newP);
    writeJSON(PRODUCTS_FILE, products);
    res.json(newP);
  } catch(e){
    return res.status(401).json({message:'Invalid or missing token'});
  }
});

app.listen(PORT, () => console.log('Server running on port', PORT));
