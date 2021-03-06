#!/usr/bin/env node
'use strict'

const request = require('supertest');
const exampleApp = require("./app.js")

describe('tests kyma controllers', function () {
    it('should work', function (done) {
        exampleApp.then(function (app) {

            describe('GET connector api health', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/connector/v1/health')
                        .expect(200, done)
                });
            });

            describe('GET connector signingRequest', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/connector/v1/applications/signingRequests/info?token=123')
                        .expect(200)
                        .expect(/"csrUrl".*applications\/certificates/, done)

                });
            });

            describe('POST connector csr', function () {
                it('should return 201', function (done) {
                    request(app)
                        .post('/connector/v1/applications/certificates?token=validToken')
                        .send({ body: "bla" })
                        .expect(201)
                        .expect(/"crt":"L/, done)
                });
            });

            describe('GET events api health', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/events/v1/health')
                        .expect(200, done)
                });
            });
            describe('GET metadata api health', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/metadata/v1/health')
                        .expect(200, done)
                });
            });
            describe('GET connector api console', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/connector/console')
                        .expect(200)
                        .expect('Content-Type', 'text/html; charset=utf-8', done)
                });
            });
            describe('GET events api console', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/events/console')
                        .expect(200)
                        .expect('Content-Type', 'text/html; charset=utf-8', done)

                });
            });
            describe('GET metadata api console', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/metadata/console')
                        .expect(200)
                        .expect('Content-Type', 'text/html; charset=utf-8', done)
                });
            });

            done()
        }).catch(error => done(error))
    });
});
