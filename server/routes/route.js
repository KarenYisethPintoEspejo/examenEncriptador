const express = require('express');
const router = express.Router();
const path = require('path');

function validateInput(input) {
    const regex = /^[a-z\s]+$/;
    return regex.test(input);
}


function encrypt(input) {
    return input
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function decrypt(input) {
    return input
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

router.get('/', (req, res) => {
    res.sendFile(path.join(process.env.EXPRESS_STATIC, 'index.html'));
});

router.post('/process', (req, res) => {
    const { chain, accion } = req.body;

    if (!validateInput(chain)) {
        return res.status(400).json({ message: 'Solo debe contener letras minúsculas y espacios.' });
    }

    let result;
    if (accion === 'encrypt') {
        result = encrypt(chain);
    } else if (accion === 'decrypt') {
        result = decrypt(chain);
    }

    res.json({ result });
});

module.exports = router;
