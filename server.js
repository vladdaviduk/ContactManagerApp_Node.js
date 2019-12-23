const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Contact = require('./app/model/contact');

const app = express();
const port = 3000;

const pathToStaticContent = path.join(__dirname, "./resources");
app.use(express.static(pathToStaticContent));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let contacts = [];

/*add primary contacts*/
let jsonFile = fs.readFileSync('./resources/contacts.json');
let contactsJson = JSON.parse(jsonFile);
for(let i=0;i<contactsJson.length;i++){
    let contact = contactsJson[i];
    contacts.push(new Contact(i + 1, contact.firstName, contact.lastName, contact.phoneNumber,
        contact.cellPhoneNumber, contact.address));
}

require('./app/routes')(app, contacts);

module.exports = app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

