const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


let smtp_login=process.env.SMPT_LOGIN || "-----"
let smtp_password=process.env.SMPT_PASSWORD || "-----"

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, 
        pass: smtp_password // generated ethereal password
    }
});



app.get('/', function (req, res) {
    res.send('Hello World!');
});



app.post('/sendMessage',async function (req, res) {
let {name,email,description}=req.body

    let info = await transporter.sendMail({
        from: 'nikita', // sender address
        to: "timofeevniki3@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line

        html: `<b>messages with our portfolio</b> // html body
        <div>
            name:${name}
        </div>
<div>
    email:${email}
</div>
<div>
    description:${description}
</div>`
    });


    // res.send('bla bla yo ');
    res.send('ok');
});


let PORT=process.env.PORT || 3000

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});