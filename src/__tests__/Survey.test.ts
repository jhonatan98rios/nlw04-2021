import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Surveys", () => {

    beforeAll(async() => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Title exemple",
            description: "Description Exemple"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it('Should able to get all serveys', async () => {
        await request(app).post("/surveys").send({
            title: "Title exemple 2",
            description: "Description Exemple 2"
        })

        const response = await request(app).get('/surveys')
        expect(response.body.length).toBe(2)
    })
})

