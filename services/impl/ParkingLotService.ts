import { injectable, inject } from "inversify";
import IParkingLotService from "../IParkingLotService";
import IParkingLotRepository from "../../repositories/IParkingLotRepository";
import ParkingSlotInfoModel from "../../repositories/models/ParkingSlotInfoModel";
import types from "../../repositories/types";
import Car from "../dto/Car";
import ParkingSlot from "../dto/ParkingSlot";
import ParkingSlotInfo from "../dto/ParkingSlotInfo";

import { plainToClass } from "class-transformer";

@injectable()
export default class ParkingLotService implements IParkingLotService {
  @inject(types.IParkingLotRepository)
  private readonly _parkingLotRepository: IParkingLotRepository;

  parkCar(car: Car): ParkingSlot {
    let carNumber = car.registrationNumber;
    let isAlreadyParked = this._parkingLotRepository.isCarAlreadyParked(
      carNumber
    );

    if (isAlreadyParked) {
      throw new Error(
        `The car with number ${carNumber} is already parked. Please unpark / free its slot first before parking again.`
      );
    } else {
      let slotNumber = this._parkingLotRepository.getNearestAvailableSlot();

      if (slotNumber === null) {
        throw new Error("Sorry, there's no more available slots.");
      }

      this._parkingLotRepository.assignSlot(slotNumber, car.registrationNumber);
      return new ParkingSlot(slotNumber);
    }
  }

  unparkCar(slot: ParkingSlot): void {
    let slotNumber = slot.slotNumber || null;

    if (!this._parkingLotRepository.isValidSlot(slotNumber)) {
      throw new Error("Slot number cannot be found.");
    }

    this._parkingLotRepository.freeSlot(slotNumber);
  }

  getParkingSlotInfo(slotOrCarNumber: string): ParkingSlotInfo {
    let slotInfo: ParkingSlotInfoModel = this._parkingLotRepository.getSlotInfo(
      slotOrCarNumber
    );

    if (slotInfo === null) {
      throw new Error("Slot or Car number cannot be found.");
    }

    // simple repo model to dto mapping
    return plainToClass(ParkingSlotInfo, slotInfo);
  }
}
