import { injectable, inject } from "inversify";
import IParkingLotService from "../IParkingLotService";
import IParkingLotRepository from "../../repositories/IParkingLotRepository";

import types from "../../repositories/types";
import Car from "../dto/Car";
import ParkingSlot from "../dto/ParkingSlot";
import ParkingSlotInfo from "../dto/ParkingSlotInfo";

@injectable()
export default class ParkingLotService implements IParkingLotService {
  @inject(types.IParkingLotRepository)
  // @ts-ignore
  private readonly _parkingLotRepository: IParkingLotRepository;
  // @ts-ignore
  parkCar(car: Car): ParkingSlot {
    throw new Error("Method not implemented.");
  }
  // @ts-ignore
  unparkCar(slot: ParkingSlot): void {
    throw new Error("Method not implemented.");
  }
  // @ts-ignore
  getParkingSlotInfo(number: string | number): ParkingSlotInfo {
    return this._parkingLotRepository.getSlotInfo(number);
  }
}
