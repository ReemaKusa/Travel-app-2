//src\server\index.js

const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.js').default;

dotenv.config();

const app = express();
const port = 2050;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

if (process.env.PIXABAY_KEY) {
    console.log(`Pixabay API Key: ${process.env.PIXABAY_KEY}`);
    console.log(`Geonames User: ${process.env.GEONAMES_USER}`);
} else {
    console.error("Error: Pixabay API Key and Geonames User are not set in the environment variables.");
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => res.sendFile('dist/index.html'));
app.get('/test', (req, res) => res.send(mockAPIResponse));

app.post('/all-apis', async (req, res) => {
    try {
        const userInput = req.body.destinationInput;
        console.log(`User destination input: ${userInput}`);

        const geonamesAPI = `http://api.geonames.org/searchJSON?q=${userInput}&maxRows=1&username=tasbeehnaser`;
        console.log(geonamesAPI);

        const geonamesData = await fetch(geonamesAPI).then(res => res.json());
        if (!geonamesData.geonames || geonamesData.geonames.length === 0) {
            return res.status(404).json({ locValidation: 'Invalid location name, please re-enter.' });
        }

        const { lat, lng } = geonamesData.geonames[0];
        const weatherbitAPI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`;
        const weatherbitData = await fetch(weatherbitAPI).then(res => res.json());

        const pixabayAPI = `https://pixabay.com/api/?key=48484272-17d937dbb29b0c3df832d0c96&q=${userInput}&image_type=photo&editors_choice=true&per_page=3`;
        const pixabayData = await fetch(pixabayAPI).then(res => res.json());

        const pixabayDefaultAPI = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=travel&image_type=photo&editors_choice=true&per_page=3`;
        const pixabayDefaultData = await fetch(pixabayDefaultAPI).then(res => res.json());

        console.log({ userInput, geonamesData, weatherbitData, pixabayData, pixabayDefaultData });
        res.send({ userInput, geonamesData, weatherbitData, pixabayData, pixabayDefaultData });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('An error occurred while processing your request.');
    }
});
