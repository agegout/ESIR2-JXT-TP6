const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')

chai.should()
chai.use(chaiHttp)

describe('Users tests', () => {
  it('should show a precise alert on /alerts/<id> GET', done => {
    chai
      .request(app)
      .get('/alerts')
      .end((err, res) => {
        
        done()
      })
  })

  it('should list alerts based on criterias on /alerts/search(?status=) GET', done => {
    chai
      .request(app)
      .get('/alerts/search')
      .end((err, res) => {
        
        done()
      })
  })

  it('should add a SINGLE alert on /alerts POST', done => {
    chai
      .request(app)
      .post()
      .send()
      .end((err, res) => {
        
        done()
      })
  })

  it('should update a SINGLE alert on /alerts/<id> PATCH', done => {
    chai
      .request(app)
      .patch()
      .send()
      .end((err, res) => {
        
        done()
      })
  })

  it('should delete a SINGLE user on /alerts/<id> DELETE', done => {
    chai
      .request(app)
      .delete()
      .end((err, res) => {
        
        done()
      })
  })
})