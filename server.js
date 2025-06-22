import express from 'express';
import multer from 'multer';

const PORT = 3001;
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/ActivitiesPhotos');
  },

  filename: function (req, file, cb) {
    const filename = req.body.filename 
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).send('Photo uploaded successfully!'); 
});

app.use((req, res) => {
  res.status(404).send("Sorry, can't find that!");
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log('Server is listening at http://localhost:'+PORT);
});
