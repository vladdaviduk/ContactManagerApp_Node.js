let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

/*GET all contacts*/
describe('/GET contact', () => {
    it('it should GET all the contacts', (done) => {
        chai.request(server)
            .get('/contacts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.gt(0);
                done();
        });
    });
});

/*GET one contact*/
describe('/GET/:id contact', () => {
    it('it should GET one contact', (done) => {
        chai.request(server)
            .get('/contacts/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                done();
        });
    });
});

/*POST route*/
describe('/POST contact', () => {
    it('it should POST a contact ', (done) => {
        let contact = {
            firstName: "first",
            lastName: "contact",
            phoneNumber: "00000000",
            cellPhoneNumber: "00000000",
            address: "address"
        };
        chai.request(server)
            .post('/contacts')
            .send(contact)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.have.property('success').eql('created');
                done();
        });
    });
});

/*PUT route*/
describe('/PUT contact', () => {
    it('it should PUT a contact ', (done) => {
        let contact = {
            firstName: "second",
            lastName: "contact",
            phoneNumber: "00000000",
            cellPhoneNumber: "00000000",
            address: "address"
        };
        chai.request(server)
            .put('/contacts/1')
            .send(contact)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.have.property('success').eql('updated');
                done();
        });
    });
});

/*DELETE route*/
describe('/DELETE contact', () => {
    it('it should DELETE a contact ', (done) => {
        chai.request(server)
            .delete('/contacts/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.have.property('success').eql('deleted');
                done();
        });
    });
});

