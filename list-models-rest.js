const https = require('https');

const API_KEY = "AIzaSyBxVZMmhaXKPRnC9S-jCndDzyZyZelk3TU";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("AVAILABLE MODELS:");
                json.models.forEach(m => console.log(m.name));
            } else {
                console.log("NO MODELS FOUND. Response:", json);
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
            console.log("Raw data:", data);
        }
    });
}).on('error', (err) => {
    console.error("Error:", err.message);
});
