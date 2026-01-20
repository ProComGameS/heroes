const Superhero = require("../src/models/Superhero");
const controller = require("../src/api/superhero_controller");

jest.mock("../src/models/Superhero");

describe("Superhero Controller", () => {
    afterEach(() => jest.clearAllMocks());

    test("getAllHeroes returns heroes", async () => {
        const req = { query: {} };
        const res = { json: jest.fn() };

        Superhero.findAndCountAll.mockResolvedValue({
            count: 1,
            rows: [{ id: 1, nickname: "Batman" }]
        });

        await controller.getAllHeroes(req, res);
        expect(res.json).toHaveBeenCalledWith({
            total: 1,
            heroes: [{ id: 1, nickname: "Batman" }]
        });
    });

    test("getHeroById returns hero if found", async () => {
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        Superhero.findByPk.mockResolvedValue({ id: 1, nickname: "Superman" });

        await controller.getHeroById(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, nickname: "Superman" });
    });

    test("getHeroById returns 404 if not found", async () => {
        const req = { params: { id: 99 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        Superhero.findByPk.mockResolvedValue(null);

        await controller.getHeroById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Hero not found" });
    });
});