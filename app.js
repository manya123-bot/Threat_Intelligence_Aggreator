require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ThreatIntel', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const ThreatSchema = new mongoose.Schema({ ip: String, data: Object });
const ThreatModel = mongoose.model('ThreatData', ThreatSchema);

// API Keys (store these in a .env file)
const ABUSEIPDB_API_KEY = process.env.ABUSEIPDB_API_KEY;
const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;
const SHODAN_API_KEY = process.env.SHODAN_API_KEY;

// Fetch Data Functions
async function fetchAbuseIPDB(ip) {
    const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`;
    try {
        const response = await axios.get(url, {
            headers: { 'Key': ABUSEIPDB_API_KEY, 'Accept': 'application/json' }
        });
        return response.data;
    } catch (error) {
        return { error: 'Failed to fetch data from AbuseIPDB' };
    }
}

async function fetchVirusTotal(ip) {
    const url = `https://www.virustotal.com/api/v3/ip_addresses/${ip}`;
    try {
        const response = await axios.get(url, {
            headers: { 'x-apikey': VIRUSTOTAL_API_KEY }
        });
        return response.data;
    } catch (error) {
        return { error: 'Failed to fetch data from VirusTotal' };
    }
}

async function fetchShodan(ip) {
    const url = `https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return { error: 'Failed to fetch data from Shodan' };
    }
}

// Endpoint to fetch threat intelligence data
app.post('/fetch_data', async (req, res) => {
    const { ip } = req.body;
    if (!ip) return res.status(400).json({ error: 'IP address is required' });

    try {
        const abuseData = await fetchAbuseIPDB(ip);
        const virusTotalData = await fetchVirusTotal(ip);
        const shodanData = await fetchShodan(ip);

        const result = { ip, abuseData, virusTotalData, shodanData };

        // Save to MongoDB
        await ThreatModel.create({ ip, data: result });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching threat intelligence data' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
