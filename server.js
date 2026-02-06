const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

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
    res.send('Hello, World!');
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;