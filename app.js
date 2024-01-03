const express = require('express');
const QRCode = require('qrcode');
const app = express();
const path = require('path'); 
const PORT = 3000;

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/qrcode', (req, res) => {
    const url = 'https://www.linkedin.com/in/sharvari-more';

    //Convert url -> data url(QR image representation)
    QRCode.toDataURL(url, (err, qrCodeUrl) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(`
            <!DOCTYPE HTML>
                <head>
                    <title>QR Code Generator</title>
                    <style>
                        body {
                            background-image: url("images/Background-gradient.jpg");
                            background-size: cover;
                            margin-top: 100px;
                        }

                        h1 {
                            color: darkslategray;
                            text-align:center;
                            font-size: 45px;
                        }

                        img {
                            display: block;
                            margin-left: auto;
                            margin-right: auto;
                            }

                        p {
                            color:indianred;
                            text-align:center;
                            font-size: 20px;
                        }

                       
                    </style>
                </head>
                <body>
                    <div id="grad">
                        <h1>QR Code Generator</h1>
                        <img src="${qrCodeUrl}" alt="qr_code"/>
                        <p>Scan this QR Code to visit the website</p>
                    </div>
                </body>
            </html>
            `)
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})