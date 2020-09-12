import ParkingSlot from "./dto/ParkingSlot";
import ParkingSlotInfo from "./dto/ParkingSlotInfo";
import Car from "./dto/Car";

export default interface IParkingLotService {
  parkCar(car: Car): ParkingSlot;
  unparkCar(slot: ParkingSlot): void;
  getParkingSlotInfo(): ParkingSlotInfo;
}
