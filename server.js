const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/location', (req, res) => {
    const { ip, location, accuracy } = req.body;
    const folderPath = path.join(__dirname, ip);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const filePath = path.join(folderPath, 'location_data.json');
    const data = {
        timestamp: new Date(),
        location,
        accuracy
    };

    fs.appendFileSync(filePath, JSON.stringify(data) + '\n');
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
