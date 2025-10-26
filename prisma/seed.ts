import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "1st ticket",
    status: "DONE" as const,
    deadline: "2025-01-01",
    bounty: 15,
  },

  {
    title: "Ticket 2",
    content: "2nd ticket",
    status: "OPEN" as const,
    deadline: "2025-01-01",
    bounty: 15,
  },

  {
    title: "Ticket 3",
    content: "3rd ticket",
    status: "IN_PROGRESS" as const,
    deadline: "2025-01-01",
    bounty: 15,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started ...");
  await prisma.ticket.deleteMany();
  //   Method 1:
  //   for (const ticket of tickets) {
  //     await prisma.ticket.create({
  //       data: ticket,
  //     });
  //   }
  //   Method 2:
  //   const promises = tickets.map((ticket) =>
  //     prisma.ticket.create({
  //       data: ticket,
  //     })
  //   );
  //   await Promise.all(promises);
  //   Method 3:
  await prisma.ticket.createMany({
    data: tickets,
  });
  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
