import nats, { Stan, Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan: Stan = nats.connect("planty", randomBytes(4).toString("hex"), {
     url: "http://nats-streaming-srv/api/events",
});
stan.on("connect", () => {
     console.log("auth publisher is connected");
});
