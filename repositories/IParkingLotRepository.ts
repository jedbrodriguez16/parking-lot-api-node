import ParkingSlotInfoModel from "./models/ParkingSlotInfoModel";

export default interface IParkingLotRepository {
  assignSlot(slotNumber: string, carNumber: string): void;
  freeSlot(slotNumber: string): void;
  getSlotInfo(slotOrCarNumber: string): ParkingSlotInfoModel;
  getNearestAvailableSlot(): string;
  isValidSlot(slotNumber: string): boolean;
  isCarAlreadyParked(carNumber: string): boolean;
}
