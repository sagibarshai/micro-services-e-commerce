import request from "supertest";
import { app } from "../../app";

it("return 400 BadRequestError when signup without valid credentials", async () => {
     const res = await request(app)
          .post("/api/users/signup")
          .send({ email: ",nfdkdf", password: "21" })
          .expect(400);
});
it("return 201 for signup", async () => {
     const res = await request(app)
          .post("/api/users/signup")
          .send({ email: "sagibarshai1@gmail.com", password: "21999" })
          .expect(201);
});
