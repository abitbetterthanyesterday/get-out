import type { Spot } from "~/models/spot";

export abstract class SpotRepository {
  create(spot: Omit<Spot, "id">): Promise<Spot> {
    throw new Error("Create not implemented.");
  }

  findAll(): Promise<Spot[]> {
    throw new Error("Find all not implemented");
  }
}
