"use strict";

export default async function (fastify, opts) {
  fastify.get(
    "/:category",
    { websocket: true },
    async ({ socket }, request) => {
      console.log(socket)
      socket.send(JSON.stringify({ id: "A1", total: 3 }));
    }
  )};
