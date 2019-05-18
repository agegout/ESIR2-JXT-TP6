const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')

chai.should()
chai.use(chaiHttp)

describe('Users tests', () => {
let id_used = ""

  it('should add a SINGLE alert on /v1/alerts POST', done => {
    chai
      .request(app)
      .post("/v1/alerts")
      .send({type: 'sea', label: 'alerts de test', status: 'danger', from: '2011-10-05T14:48:00.000Z', to: '2011-10-05T14:48:00.000Z'})
      .end((err, res) => {
            res
              .should
              .have
              .status(201)
            res.should.be.json
            res
              .body
              .should
              .be
              .a('object')
            res
              .body
              .should
              .have
              .property('id')
            res
              .body
              .should
              .have
              .property('type')
            res
              .body
              .type
              .should
              .equal('sea')
            res
              .body
              .should
              .have
              .property('label')
            res
              .body
              .label
              .should
              .equal('alerts de test')
            res
              .body
              .should
              .have
              .property('status')
            res
              .body
              .status
              .should
              .equal('danger')
            res
              .body
              .should
              .have
              .property('from')
            res
              .body
              .from
              .should
              .equal('2011-10-05T14:48:00.000Z')
            res
              .body
              .should
              .have
              .property('to')
            res
              .body
              .to
              .should
              .equal('2011-10-05T14:48:00.000Z')
            id_used = res.body.id
        done()
      })
  })

  it('should show a precise alert on /v1/alerts/<id> GET', done => {
    chai
      .request(app)
      .get('/v1/alerts/' + id_used)
      .end((err, res) => {
        res
        .should
        .have
        .status(200)
      res.should.be.json
      res
        .body
        .should
        .be
        .a('object')
      res
        .body
        .should
        .have
        .property('id')
      res
        .body
        .should
        .have
        .property('type')
      res
        .body
        .type
        .should
        .equal('sea')
      res
        .body
        .should
        .have
        .property('label')
      res
        .body
        .label
        .should
        .equal('alerts de test')
      res
        .body
        .should
        .have
        .property('status')
      res
        .body
        .status
        .should
        .equal('danger')
      res
        .body
        .should
        .have
        .property('from')
      res
        .body
        .from
        .should
        .equal('2011-10-05T14:48:00.000Z')
      res
        .body
        .should
        .have
        .property('to')
      res
        .body
        .to
        .should
        .equal('2011-10-05T14:48:00.000Z')        
        done()
      })
  })

  it('should show a 404 error on /v1/alerts/<falseid> GET', done => {
    chai
      .request(app)
      .get('/v1/alerts/' + id_used + 'non')
      .end((err, res) => {
        res
        .should
        .have
        .status(404)              
        done()
      })
  })

  it('should list alerts based on criterias on /alerts/search(?status=) GET', done => {
    chai
      .request(app)
      .get('/v1/alerts/search?status=danger')
      .end((err, res) => {
            res
              .should
              .have
              .status(200)
            res.should.be.json
            res
              .body
              .should
              .be
              .a('array')
            res
              .body[0]
              .should
              .be
              .a('object')
            res
              .body[0]
              .should
              .have
              .property('id')
            res
              .body[0]
              .should
              .have
              .property('type')
            res
              .body[0]
              .should
              .have
              .property('label')
            res
              .body[0]
              .should
              .have
              .property('status')
            res
              .body[0]
              .should
              .have
              .property('from')
            res
              .body[0]
              .should
              .have
              .property('to')
        done()
      })
  })

  it('should update a SINGLE alert on /v1/alerts/<id> PUT', done => {
    chai
      .request(app)
      .put('/v1/alerts/' + id_used)
      .send({type: 'weather', label: 'test update'})
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .be
          .a('object')
        res
          .body
          .should
          .have
          .property('id')
       res
          .body
          .should
          .have
          .property('type')
        res
          .body
          .type
          .should
          .equal('weather')
        res
          .body
          .should
          .have
          .property('label')
        res
          .body
          .label
          .should
          .equal('test update')
        res
          .body
          .should
          .have
          .property('status')
        res
          .body
          .status
          .should
          .equal('danger')
        res
          .body
          .should
          .have
          .property('from')
        res
          .body
          .from
          .should
          .equal('2011-10-05T14:48:00.000Z')
        res
          .body
          .should
          .have
          .property('to')
        res
          .body
          .to
          .should
          .equal('2011-10-05T14:48:00.000Z')
        done()
      })
  })

  it('should return a 404 error on /v1/alerts/<falseid> PUT', done => {
    chai
      .request(app)
      .put('/v1/alerts/' + id_used + 'non')
      .send({type: 'weather', label: 'test update'})
      .end((err, res) => {
        res
          .should
          .have
          .status(404)
 
        done()
      })
  })

  it('should delete a SINGLE alert on /v1/alerts/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/alerts/' + id_used)
      .end((err, res) => {
        res
          .should
          .have
          .status(200)
        res.should.be.json
        res
          .body
          .should
          .have
          .property('id')
        res
          .body
          .id
          .should
          .equal(id_used)                
        done()
      })
  })

  it('should return a 404 error on /v1/alerts/<id> DELETE', done => {
    chai
      .request(app)
      .delete('/v1/alerts/' + id_used + 'non')
      .end((err, res) => {
        res
          .should
          .have
          .status(404)             
        done()
      })
  })
})