import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log("Expiration start")
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be define");
  }

  if (!process.env.NAST_CLIENT_ID) {
    throw new Error("NAST_CLIENT_ID must be define");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be define");
  }

  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NAST_CLIENT_ID, process.env.NATS_URL)
    natsWrapper.client.on("close", () => {
      console.log("NATS, connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen()
  } catch (err) {
    console.error(err);
  }
};

start();
