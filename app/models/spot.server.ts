import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

async function create(values: Prisma.SpotCreateInput) {
  return await prisma.spot.create({ data: values });
}

export const spotModel = {
  create,
};
