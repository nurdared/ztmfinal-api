const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).json('incorrect form submission')
  db.select('hash', 'email')
    .from('login')
    .where({ email })
    .then(credentials => credentials[0])
    .then(({ hash, email }) => {
      if (bcrypt.compareSync(password, hash)) {
        db('users').where({ email }).then(user => res.json(user[0]));
      } else {
        res.status(400).json('invalid credentials')
      }
    })
    .catch(err => res.status(400).json('Invalid Login'));
}

module.exports = { handleSignIn };