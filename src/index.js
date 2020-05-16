const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/mevnstack').then(() => {
    console.log('base conectada');
}).catch(err => {
    console.log('error ', err);
})

//Settings
app.set('port', process.env.PORT || 3000);

//Middlwares
//para mirar que clase de peticion se recibio
app.use(morgan('dev'));
// cada que reciba info en formato json y que el server pueda entenderlo
app.use(express.json());

//Routes

app.use('/api/tasks', require('./routes/task.js'));

//Static files
app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function(){
    console.log(`Server on port locahost:${app.get('port')}`);
});