const express = require('express');
const chalk = require("chalk");
const app = express();

const port = process.env.PORT || 3000;

const urlencodeParser = express.urlencoded();

app.set('view engine', 'ejs');
app.use('assets', express.static('./public'));

// Middleware que traduce a Json
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hola mundo');
});

app.get('/inventor', (req, res)=>{
    res.render('indexPost');
});

app.post('/inventor', urlencodeParser, (req, res) =>{
    res.send('Gracias...');
    //console.log(req.body);
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

app.listen(port, ()=> {console.log(chalk.yellow('Server disponible'))});