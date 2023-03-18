import type { Spot } from "~/models/spot";
import type { SpotRepository } from "./interfaces";

export class InMemorySpotRepository implements SpotRepository {
  private count;
  private memory: Spot[] = [];
  constructor() {
    this.count = 0;
  }

  async create(spot: Omit<Spot, "id">): Promise<Spot> {
    const newSpot = { ...spot, id: this.count.toString() };
    this.memory.push(newSpot);
    return await newSpot;
  }

  async findAll(): Promise<Spot[]> {
    return await this.memory;
  }
}
