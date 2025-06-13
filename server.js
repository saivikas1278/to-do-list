const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');



app.use(cors());
app.use(express.json());





mongoose.connect('mongodb://127.0.0.1:27017/list-work')
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });



const Item = mongoose.model('Item', new mongoose.Schema({
    name: String,
    // add more fields as needed
}));

app.get('/', (req, res) => {
    res.send('API is running');
});


app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Error fetching items');
    }
});


// Delete an item
app.delete('/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.send('Item deleted');
    } catch (err) {
        res.status(500).send('Error deleting item');
    }
});

// Update an item
app.put('/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, { name: req.body.name });
        res.send('Item updated');
    } catch (err) {
        res.status(500).send('Error updating item');
    }
});

app.post('/add-item', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.send('Item added successfully');
    } catch (err) {
        res.status(500).send('Error adding item');
    }
});



app.listen(10000, () => {
    console.log('Server is running on http://localhost:10000');
    });