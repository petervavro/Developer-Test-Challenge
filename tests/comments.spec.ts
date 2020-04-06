import { agent as request } from 'supertest'
import { expect } from 'chai'

const app = 'http://localhost:3000'

describe('Comment', function () {
  let token = ''

  before(async function () {
    // Get credentials
    // Create user
    let res = await request(app).post('/api/auth/signup').send({
      email: 'test@test.com',
      password: 'password'
    })

    // Get user if is already created
    if (res.status !== 201) {
      res = await request(app).post('/api/auth/signin').send({
        email: 'test@test.com',
        password: 'password'
      })
    }

    token = res.body.token
  })

  describe('CRUD', function () {
    let id: number
    const movieId = 12345

    // Check if user exists
    it('should have token', async function () {
      expect(token).not.equal('')
    })

    // Check "create"
    it('should create without error', async function () {
      const res = await request(app)
        .post('/api/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          movieId,
          body: 'Lorem ipsum.'
        })

      // Save "id" for other operations
      id = res.body.id

      expect(res.status).to.equal(201)
      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.an('number')
    })

    // Check "read"
    it('should read without error', async function () {
      const res = await request(app)
        .get(`/api/comments/${movieId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body.items).to.be.an('array')
    })

    // Check "update"
    it('should update without error', async function () {
      const res = await request(app)
        .patch(`/api/comments/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          body: 'Updated Lorem ipsum.'
        })
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body.success).to.be.equal(true)
    })

    // Check "delete"
    it('should delete without error', async function () {
      const res = await request(app)
        .delete(`/api/comments/${id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body.success).to.be.equal(true)
    })
  })
})
