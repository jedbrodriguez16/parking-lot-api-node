import { injectable } from "inversify";
import IParkingLotRepository from "../IParkingLotRepository";
import ParkingSlotInfo from "../models/ParkingSlotInfo";

@injectable()
export default class ParkingLotRepository implements IParkingLotRepository {
  // @ts-ignore
  assignSlot(carNumber: string): number {
    throw new Error("Method not implemented.");
  }
  // @ts-ignore
  freeSlot(slotNumber: number): boolean {
    throw new Error("Method not implemented.");
  }
  // @ts-ignore
  getSlotInfo(carOrSlotnumber: string): ParkingSlotInfo {
    return new ParkingSlotInfo(1, "car1");
  }
}
