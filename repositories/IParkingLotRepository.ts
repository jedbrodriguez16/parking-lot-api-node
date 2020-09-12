import ParkingSlotInfo from "./models/ParkingSlotInfo";

export default interface IParkingLotRepository {
  assignSlot(carNumber: string): number;
  freeSlot(slotNumber: number): boolean;
  getSlotInfo(carOrSlotnumber: string): ParkingSlotInfo;
}
