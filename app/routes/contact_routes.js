// const Array = require("collections/array");
const Contact = require('../model/contact');

module.exports = function(app, contacts) {

    /*counter for id generation*/
    let counter = contacts.length;

    /*error messages*/
    const notFountErr = "object is not found";
    const existsErr = "Object already exists";
    const invalidErr = "Input data is invalid";

    /*GET*/
    app.get('/contacts', (req, res) => {
        res.send(contacts)
    });

    app.get('/contacts/:id', (req, res) => {
        let id = parseInt(req.params.id);
        let contact = getContactById(contacts, id);

        if(contact != null)
            res.send(contact.getContactJson())
        else
            res.send({ message : { error: id + " " + notFountErr}});
    });

    /*POST*/
    app.post('/contacts', (req, res) => {
        let contactFromReq = req.body;
        let contact = new Contact(0, contactFromReq.firstName, contactFromReq.lastName,
            contactFromReq.phoneNumber, contactFromReq.cellPhoneNumber, contactFromReq.address);

        if(contact.isValid()){
            if(!isExists(contacts, contact)){
                contact.setId(++counter);
                contacts.push(contact);
                res.send({ message : { success: "created"}});
            }else{
                res.send({ message : { error: existsErr}});
            }
        }else{
            res.send({ message : { error: invalidErr}});
        }
    });

    /*PUT*/
    app.put('/contacts/:id', (req, res) => {
        let id = parseInt(req.params.id);
        let contactFromReq = req.body;
        let contact = new Contact(id, contactFromReq.firstName, contactFromReq.lastName,
            contactFromReq.phoneNumber, contactFromReq.cellPhoneNumber, contactFromReq.address);

        if(contact.isValid()){
            if(!isExists(contacts, contact)){
                if(updateContact(contacts, contact))
                    res.send({ message : { success: "updated"}});
                else
                    res.send({ message : { error: id + " " + notFountErr}});
            }else{
                res.send({ message : { error: existsErr}});
            }
        }else{
            res.send({ message : { error: invalidErr}});
        }
    });

    /*DELETE*/
    app.delete('/contacts/:id', (req, res) => {
        let id = parseInt(req.params.id);

        if(deleteContact(contacts, id)){
            res.send({ message : { success: "deleted"}});
        }else{
            res.send({ message : { error: id + " " + notFountErr}});
        }
    });
};

function getContactById(contacts, id) {
    for (let i=0;i<contacts.length;i++) {
        if(contacts[i].id === id)
            return contacts[i];
    }
    return null;
}

function deleteContact(contacts, id) {
    for (let i=0;i<contacts.length;i++) {
        if(contacts[i].id === id){
            contacts.splice(i, 1);
            return true;
        }
    }
    return false;
}

function updateContact(contacts, contactFromReq){
    for (let i=0;i<contacts.length;i++) {
        if(contacts[i].id === contactFromReq.id){
            contacts[i] = contactFromReq;
            return true;
        }
    }
    return false;
}

function isExists(contacts, contact) {
    for (let i=0;i<contacts.length;i++)
        if(contact.equals(contacts[i]))
            return true;
    return false;
}
