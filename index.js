// index.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date)

  if (isInvalidDate(date)) {
    date = new Date(+req.params.date)
  }

  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" })
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
