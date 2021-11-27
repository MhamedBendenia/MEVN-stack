const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

var client_id = null;
var provider_id = null;

describe("Clients", () => {
    
    describe("POST /", () => {
        
        // Test to add new client
        it("should add client", (done) => {
            chai.request(app)
                .post('/api/client?name=John&email=john@test.com&phone=0555555555')
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                 });
        });
    });

    describe("GET /", () => {
        
        // Test to get all clients
        it("should get all clients", (done) => {
             chai.request(app)
                 .get('/api/client')
                 .end((err, res) => {
                     this.client_id = res.body[0]._id;
                     res.should.have.status(200);
                     done();
                  });
         });
        
        // Test to get single client
        it("should get a single client", (done) => {
             chai.request(app)
                 .get(`/api/client/${this.client_id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });

    describe("DELETE /", () => {
        
        // Test to delete client
        it("should delete client", (done) => {
            chai.request(app)
                .delete(`/api/client/${this.client_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                 });
        });
    });
});

describe("Providers", () => {

    describe("POST /", () => {

        // Test to add new provider
        it("should add provider", (done) => {
            chai.request(app)
                .post('/api/provider?name=John')
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                 });
        });
    });

    describe("GET /", () => {
        
        // Test to get all providers
        it("should get all providers", (done) => {
             chai.request(app)
                 .get('/api/provider')
                 .end((err, res) => {
                     this.provider_id = res.body[0]._id;
                     res.should.have.status(200);
                     done();
                  });
         });
        
        // Test to get single provider
        it("should get a single provider", (done) => {
             chai.request(app)
                 .get(`/api/provider/${this.provider_id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });

    describe("DELETE /", () => {
        
        // Test to delete provider
        it("should delete provider", (done) => {
            chai.request(app)
                .delete(`/api/provider/${this.provider_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                 });
        });
    });
});