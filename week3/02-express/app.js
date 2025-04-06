import express from 'express';
const hostname = '0.0.0.0';
const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Nothing here.');
});

app.get('/api/v1/cat', (req, res) => {
  const myData = {
    cat_id: 1,
    name: 'kisuli',
    birthdate: '2003',
    weight: 3,
    owner: "aapo",
    image: 'https://loremflickr.com/320/240/cat'
  };

  res.json(myData);


});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});