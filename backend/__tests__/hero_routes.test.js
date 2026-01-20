const request = require("supertest");
const express = require("express");
const heroRoutes = require("../src/api/hero_routes");


jest.mock("../src/api/superhero_controller", () => ({
    getAllHeroes: jest.fn((req, res) => res.json({ heroes: [] })),
    getHeroById: jest.fn((req, res) => res.json({ id: 1 })),
    createHero: jest.fn((req, res) => res.status(201).json({ id: 2 })),
    updateHero: jest.fn((req, res) => res.json({ id: 3 })),
    deleteHero: jest.fn((req, res) => res.status(204).send())
}));

const app = express();
app.use(express.json());
app.use("/heroes", heroRoutes);

describe("Hero Routes", () => {
    it("GET /heroes should call getAllHeroes", async () => {
        const res = await request(app).get("/heroes");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ heroes: [] });
    });

    it("GET /heroes/:id should call getHeroById", async () => {
        const res = await request(app).get("/heroes/1");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 1 });
    });

    it("POST /heroes should call createHero", async () => {
        const res = await request(app).post("/heroes").send({ nickname: "Batman" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ id: 2 });
    });

    it("PUT /heroes/:id should call updateHero", async () => {
        const res = await request(app).put("/heroes/1").send({ nickname: "Superman" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 3 });
    });

    it("DELETE /heroes/:id should call deleteHero", async () => {
        const res = await request(app).delete("/heroes/1");
        expect(res.statusCode).toBe(204);
    });
});