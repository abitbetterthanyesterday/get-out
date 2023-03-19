import { InMemorySpotRepository } from "./repositories/inMemory";
import type { SpotRepository } from "./repositories/interfaces";

declare global {
  var DIContainer: DIContainer;
}

// Create a singleton instance of the DIContainer
// This provides a single point of access to the repositories
export class DIContainer {
  public spotRepository: SpotRepository;

  private constructor() {
    this.spotRepository = new InMemorySpotRepository();
  }

  public static getInstance() {
    if (!global.DIContainer) {
      global.DIContainer = new DIContainer();
    }
    return global.DIContainer;
  }
}
