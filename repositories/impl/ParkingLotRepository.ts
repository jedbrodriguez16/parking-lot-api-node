import { injectable } from "inversify";
import IParkingLotRepository from "../IParkingLotRepository";
import ParkingSlotInfo from "../models/ParkingSlotInfo";

@injectable()
export default class ParkingLotRepository implements IParkingLotRepository {
  // @ts-ignore
  assignSlot(carNumber: string): number {
    return 1;
  }
  // @ts-ignore
  freeSlot(slotNumber: number): boolean {
    return false;
  }
  // @ts-ignore
  getSlotInfo(slotOrCarNumber: number | string): ParkingSlotInfo {
    return new ParkingSlotInfo(1, "car1");
  }
}
