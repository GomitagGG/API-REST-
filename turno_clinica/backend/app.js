require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/turnos-clinica', require('./routes/turnosClinica'));

app.listen(port, () => {
    console.log(`SERVER INICIADO EN EL PUERTO ${port}`)
});