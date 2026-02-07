const express = require('express');
const cors = require('cors');
const app = express();
const compression = require('compression');
const path = require('path')
const PORT = 3000;

// Enable Gzip compression
app.use(compression());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/subscribe-price-drop', (req, res) => {
    console.log(req.body);
    const { widget_email } = req.body;
    setTimeout(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (widget_email === "pewpew@gmail.com") {
            return res.status(409).send({ ok: false, error: "already_subscribed" });
        }
        if (emailRegex.test(widget_email)) {
            return res.status(200).send({ ok: true })
        }
        else {
            return res.status(400).send({ ok: false, error: "invalid_email" })
        }
    }, 1000);

})

app.get('/assets/price-drop-widget.min.js', (req, res) => {

    const filePath = path.join(
        __dirname,
        'assets',
        'price-drop-widget.min.js'
    );
    console.log(filePath);
    res.sendFile(filePath, {
        headers: {
            'Content-Type': 'application/javascript',
            // 'Cache-Control': 'no-cache', // Cache for 1 hour
            'X-Content-Type-Options': 'nosniff'     // Security best practice
        }
    }, (err) => {
        if (err) {
            console.error("Widget file not found!", err);
            res.status(404).send('Widget source not found.');
        }
    });
});

app.get('/embed/price-drop.html', (req, res) => {
    const filePath = path.join(__dirname, 'embed', 'price-drop-embed.html');
    res.sendFile(filePath);
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;