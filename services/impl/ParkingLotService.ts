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
  private readonly _parkingLotRepository: IParkingLotRepository;

  parkCar(car: Car): ParkingSlot {
    let slotNumber = this._parkingLotRepository.assignSlot(
      car.registrationNumber
    );
    return new ParkingSlot(slotNumber);
  }

  unparkCar(slot: ParkingSlot): void {
    let isSlotValid = this._parkingLotRepository.freeSlot(slot.slotNumber);

    if (!isSlotValid) {
      throw new Error("Slot doesn't exist");
    }
  }

  getParkingSlotInfo(slotOrCarNumber: number | string): ParkingSlotInfo {
    return this._parkingLotRepository.getSlotInfo(slotOrCarNumber);
  }
}
