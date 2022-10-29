import request from "supertest";
import { app } from "../../app";

it("return 400 BadRequestError when signup without credentials", async () => {
     let chunks: any = [];
     const res = await request(app)
          .post("/api/users/signup")
          .send({ email: ",nfdkdf", password: "21" })
          .expect(400)
          .buffer()
          .parse((res, callback) => {
               res.on("data", (chunk) => {
                    chunks.push(chunk);
               });
          })
          .end((err) => {
               if (err) {
                    return;
               }
               let bf = Buffer.concat(chunks);
               console.log("bf ", bf);
          });
     console.log(res.body);
});
it("return 201 for signup", async () => {
     const res = await request(app)
          .post("/api/users/signup")
          .send({ email: "sagibarshai1@gmail.com", password: "21999" })
          .expect(201);
     console.log(res.body, res.statusCode, "hey");
});
