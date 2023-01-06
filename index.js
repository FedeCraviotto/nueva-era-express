const express = require('express');
const app = express();
require('dotenv').config();
const PORT  = process.env.PORT || 3030;

app.listen(PORT, (req, res)=>{
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Working OK');
});