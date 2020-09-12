import { Container } from "inversify";
import IParkingLotService from "./IParkingLotService";
import ParkingLotService from "./impl/ParkingLotService";
import types from "./types";

export default function configureServices(container: Container) {
  container
    .bind<IParkingLotService>(types.IParkingLotService)
    .to(ParkingLotService)
    .inSingletonScope();
  return container;
}
