import { InMemorySpotRepository } from "./inMemory";

export class DIContainer {
  public static spotRepository = new InMemorySpotRepository();
}
