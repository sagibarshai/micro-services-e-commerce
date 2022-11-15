import nats, { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./src/events/subjects";
import { UserCreatedPublisher } from "./src/events/user-created-publisher";

const stan = nats.connect("planty", "abc", {
     url: "http://nats-streaming-srv:4222",
});
stan.on("connect", async () => {
     console.log("Publisher connect to NATS");
     const publisher = new UserCreatedPublisher(stan);
     await publisher.publish({
          email: "sagibarshai1@gmail.com",
     });
});
