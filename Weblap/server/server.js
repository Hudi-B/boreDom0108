const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs/promises');

const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import the uuid module

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../src/uploads'));
  },
  filename: (req, file, cb) => {
    // Generate a unique identifier using uuidv4() and append the file extension
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process the uploaded file (save to disk, database, etc.)
    const fileDetails = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      filename: req.file.filename, // Use the generated filename
      // Add other information or store this information in a database
    };

    return res.status(200).json({ file: fileDetails });
  } catch (error) {
    console.error('Error during file upload:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (error) {
    
  }
});

app.delete('/delete/:filename', async (req, res) => {
  const { filename } = req.params;

  try {
    const filePath = path.resolve(__dirname, '../src/uploads/', filename);
    // Check if the file exists
    await fs.access(filePath);

    // Delete the file
    await fs.unlink(filePath);

    return res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error during file deletion:', error);
    
    if (error.code === 'ENOENT') {
      // File not found
      return res.status(404).json({ error: 'File not found' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
