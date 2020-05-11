const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'red',
    database: 'ztmfinal'
  }
})

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())


app.listen(PORT || 3000, () => {
  console.log(`app is running on port ${PORT}`);
})

app.get('/', (req, res) => res.send('It is working'));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))
