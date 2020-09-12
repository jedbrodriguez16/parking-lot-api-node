import { injectable } from "inversify";
import IParkingLotRepository from "../IParkingLotRepository";
import ParkingSlotInfoModel from "../models/ParkingSlotInfoModel";

@injectable()
export default class ParkingLotRepository implements IParkingLotRepository {
  private _parkingSlots: Map<string, string> = new Map<string, string>();

  constructor(size: number) {
    this._initParkingSlots(size);
  }

  assignSlot(slotNumber: string, carNumber: string): void {
    // since nodejs is single-threaded, there's no need to do locking of code
    this._parkingSlots.set(slotNumber, carNumber);
  }

  freeSlot(slotNumber: string): void {
    this._parkingSlots.set(slotNumber, null);
  }

  getSlotInfo(slotOrCarNumber: string): ParkingSlotInfoModel {
    return this._findSlotInfo(slotOrCarNumber);
  }

  isValidSlot(slotNumber: string): boolean {
    return this._parkingSlots.get(slotNumber) !== undefined;
  }

  isCarAlreadyParked(carNumber: string): boolean {
    let slotInfo = this._findSlotInfoByCar(carNumber);

    return slotInfo !== null;
  }

  getNearestAvailableSlot(): string {
    // for loop has better performance
    for (let key of this._parkingSlots.keys()) {
      if (this._parkingSlots.get(key) === null) {
        return key;
      }
    }

    return null;
  }

  private _findSlotInfo(slotOrCarNumber: string): ParkingSlotInfoModel {
    // for loop has better performance
    for (let [key, value] of this._parkingSlots) {
      if (key === slotOrCarNumber || value === slotOrCarNumber) {
        return new ParkingSlotInfoModel(key, value);
      }
    }
    return null;
  }

  private _findSlotInfoByCar(carNumber: string): ParkingSlotInfoModel {
    // for loop has better performance
    for (let [key, value] of this._parkingSlots) {
      if (value === carNumber) {
        return new ParkingSlotInfoModel(key, value);
      }
    }
    return null;
  }

  private _initParkingSlots(size: number): void {
    for (let i = 1; i <= size; i++) {
      this._parkingSlots.set(i.toString(), null);
    }
  }
}
