import supertest from "supertest";
import createTestServer from "../utils/test.server";

const app = createTestServer();

describe("Auth", () => {
    describe("Error 500", () => {
        it("Login user with missing informations", async () => {
            await supertest(app).post("/api/login").expect(500);
        });

        it("Login user with wrong informations", async () => {
            await supertest(app)
                .post("/api/login")
                .send({ email: "test@gmail.com", password: "123abc" })
                .expect(500);
        });

        it("Login user with missing informations", async () => {
            await supertest(app).post("/api/register").expect(500);
        });
    });
});
