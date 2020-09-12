import { Container } from "inversify";
import IParkingLotRepository from "./IParkingLotRepository";
import ParkingLotRepository from "./impl/ParkingLotMemoryRepository";
import types from "./types";

export default function configureRepositories(container: Container) {
  container
    .bind<IParkingLotRepository>(types.IParkingLotRepository)
    .to(ParkingLotRepository)
    .inSingletonScope();
  return container;
}
