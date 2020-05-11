const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "2683fdaff4a1425598e6cf4640ff8e39",
})



const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json("Unable to get entries"));
}

const handleApiCall = (req, res) => {
  app.models
    .predict(
      Clarifai.CELEBRITY_MODEL,
      req.body.input
    )
    .then(data => res.json(data))
    .catch(console.log)
}

module.exports = { handleImage, handleApiCall };