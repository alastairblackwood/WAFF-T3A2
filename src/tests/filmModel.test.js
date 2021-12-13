const db = require('./db.js')
beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

// Describe block - place similar tests together - for async test call done at end
describe('First Group Of Tests', () => {
    
    it('First Test', async done => {
        const result = await numberFunc(10)
        expect(result.word).toBe("ten")
        expect(result.number).toBeGreaterThan(10)
        done()
    })
    it('Second Test', async done => {
        const result = await numberFunc()
        expect(result).toBeNull()
        done()
    })
})