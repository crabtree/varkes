var request = require('supertest');
var app = require("express")();
var server = require('../server/app')('./test/config.js');
describe('controllers', function () {

  describe('test_openapi', function () {

    describe('GET metadata for pets', function () {
      it('should return response 200', function (done) {

        request(server)
          .get("/api1/metadata")
          .set('Accept', 'application/json')
          .expect('Content-Type', 'text/x-yaml; charset=utf-8')
          .expect(200, done)
      });
    });

    describe('GET metadata for courses', function () {
      it('should return response 200', function (done) {

        request(server)
          .get("/api2/metadata")
          .set('Accept', 'application/json')
          .expect('Content-Type', 'text/x-yaml; charset=utf-8')
          .expect(200, done)
      });
    });
  });
});
