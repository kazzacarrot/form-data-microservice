
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let fs = require("fs");
let chai = require('chai');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
var chai_http = require("chai-http");
chai.use(chai_http)
var home_path = "/";

describe('basic set up', () => {
    it('it should have status 200' + home_path, (done) => {
        chai.request(server)
            .get(home_path)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe('basic function', () => {
    it('I can upload a file' , (done) => {
        var filename = "f.txt"
        , boundary = Math.random()

            chai.request(server)
            .post(home_path)
            .attach("theirFile", fs.readFileSync("test/" + filename), "theirFile.txt")
            .set('content-type', 'multipart/form-data')
            .end(function(err, res, body){
                if (err) console.error(err)

                console.log(res.text);
                console.log(body);
                    res.should.have.status(200);
                restext = JSON.parse(res.text);
                expect(restext).to.have.property("size")
                expect(restext.size).to.eq(591)
                done()
            })
    })    
});
