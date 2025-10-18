const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve index.html for any route (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`📱 Krishi Hedge Mobile PWA running at:`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`📱 Mobile: http://YOUR_IP_ADDRESS:${PORT}`);
    console.log(`\n🚀 Open this URL in your phone's browser!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Mobile PWA server shutting down...');
    process.exit(0);
});
