import { Container } from "inversify";
import IParkingLotRepository from "./IParkingLotRepository";
import ParkingLotMemoryRepository from "./impl/ParkingLotMemoryRepository";
import types from "./types";
import * as env from "dotenv";

export default function configureRepositories(container: Container) {
  env.config();
  // defaults to 10
  const parkingLotSize = process.env.PARKING_LOT_SIZE || 10;

  container
    .bind<IParkingLotRepository>(types.IParkingLotRepository)
    .toConstantValue(new ParkingLotMemoryRepository(Number(parkingLotSize)));

  return container;
}
