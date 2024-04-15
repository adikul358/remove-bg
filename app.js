import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import FormData from 'form-data';

const app = express();
const port = process.env.PORT || 8080;
const storage = multer.diskStorage({  
  destination: function (req, file, cb) { 
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
})
const upload = multer({ storage: storage }); 

app.use(express.static('public'));
app.use(express.text());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + "/public/upload.html")
})

app.post('/api/upload', upload.single('main-image'), (req, res) => {
  const filename = req.file.path.split("/").pop()
  res.set("Content-Type", "text/plain")
  setTimeout(() => res.send(filename), 1500)
})

app.post('/api/removebg', async (req, res) => {
  const inputPath = `${__dirname}/uploads/${req.body}`
  const formData = new FormData();
  formData.append('format', 'png');
  formData.append('size', 'auto');
  formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
  const res_rb = await axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
      ...formData.getHeaders(),
			'X-Api-Key': process.env.REMOVEBG_API_KEY,
    },
    encoding: null
	}).catch(e => console.error(e))
  const outputFile = uuidv4() + ".png"
  const outputPath = path.join(__dirname, "/uploads/" + outputFile)
  console.log(outputFile)
  fs.writeFileSync(outputPath, res_rb.data);
  res.set("Content-Type", "text/plain")
  res.send(outputFile);
})

app.post('/api/preview', (req, res) => {
  const filename = `${__dirname}/uploads/${req.body}`
  res.sendFile(filename)
})

app.listen(port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app