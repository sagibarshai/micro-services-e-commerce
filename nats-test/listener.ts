import nats, { Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { UserCreatedListener } from "./src/events/user-created-listener";
const stan: Stan = nats.connect("planty", randomBytes(4).toString("hex"), {
     url: "http://nats-streaming-srv:4222",
});
stan.on("connect", () => {
     console.log("NATS IS CONNECTED  !!");
     stan.on("close", () => {
          console.log("NATS CONNECTION CLOSED !!");
          process.exit();
     });
     new UserCreatedListener(stan).listen();
});
