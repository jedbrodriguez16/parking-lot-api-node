import "reflect-metadata";
import * as sinon from "sinon";
import * as expect from "expect";
import ParkingLotService from "../../services/impl/ParkingLotService";
import Car from "../../services/dto/Car";
import ParkingSlot from "../../services/dto/ParkingSlot";
import BusinessRuleException from "../../services/exception/BusinessRuleException";

describe("ParkingLotService", () => {
  let service: ParkingLotService;

  beforeEach(() => {
    service = new ParkingLotService();
  });

  describe("parkCar", () => {
    it("should succeed", async () => {
      const repository = {
        isCarAlreadyParked: () => {},
        getNearestAvailableSlot: () => {},
        assignSlot: () => {},
      };

      const isCarAlreadyParkedStub = sinon.stub(
        repository,
        "isCarAlreadyParked"
      );
      isCarAlreadyParkedStub.returns(false);

      const getNearestAvailableSlotStub = sinon.stub(
        repository,
        "getNearestAvailableSlot"
      );
      getNearestAvailableSlotStub.returns("1");

      const assignSlotStub = sinon.stub(repository, "assignSlot");

      (service as any)._parkingLotRepository = repository;

      const payload = new Car("car1");
      const res = await service.parkCar(payload);

      expect(isCarAlreadyParkedStub.callCount).toBe(1);
      expect(getNearestAvailableSlotStub.callCount).toBe(1);
      expect(assignSlotStub.callCount).toBe(1);

      expect(res.slotNumber).toEqual("1");
    });

    it("should throw 'is already parked' BusinessRuleException", async () => {
      const repository = {
        isCarAlreadyParked: () => {},
        getNearestAvailableSlot: () => {},
        assignSlot: () => {},
      };

      const isCarAlreadyParkedStub = sinon.stub(
        repository,
        "isCarAlreadyParked"
      );
      isCarAlreadyParkedStub.returns(true);

      const getNearestAvailableSlotStub = sinon.stub(
        repository,
        "getNearestAvailableSlot"
      );
      getNearestAvailableSlotStub.returns("1");

      const assignSlotStub = sinon.stub(repository, "assignSlot");

      (service as any)._parkingLotRepository = repository;

      const payload = new Car("car1");
      try {
        await service.parkCar(payload);
      } catch (err) {
        expect(err instanceof BusinessRuleException);
        expect(err.message).toEqual(
          `The car with number ${payload.registrationNumber} is already parked. Please unpark / free its slot first before parking again.`
        );
        expect(isCarAlreadyParkedStub.callCount).toBe(1);
        expect(getNearestAvailableSlotStub.callCount).toBe(0);
        expect(assignSlotStub.callCount).toBe(0);
      }
    });

    it("should throw 'no more slots' BusinessRuleException", async () => {
      const repository = {
        isCarAlreadyParked: () => {},
        getNearestAvailableSlot: () => {},
        assignSlot: () => {},
      };

      const isCarAlreadyParkedStub = sinon.stub(
        repository,
        "isCarAlreadyParked"
      );
      isCarAlreadyParkedStub.returns(false);

      const getNearestAvailableSlotStub = sinon.stub(
        repository,
        "getNearestAvailableSlot"
      );
      getNearestAvailableSlotStub.returns(null);

      const assignSlotStub = sinon.stub(repository, "assignSlot");

      (service as any)._parkingLotRepository = repository;

      const payload = new Car("car1");
      try {
        await service.parkCar(payload);
      } catch (err) {
        expect(err instanceof BusinessRuleException);
        expect(err.message).toEqual("Sorry, there's no more available slots.");
        expect(isCarAlreadyParkedStub.callCount).toBe(1);
        expect(getNearestAvailableSlotStub.callCount).toBe(1);
        expect(assignSlotStub.callCount).toBe(0);
      }
    });
  });

  describe("unparkCar", () => {
    it("should succeed", async () => {
      const repository = {
        isValidSlot: () => {},
        freeSlot: () => {},
      };

      const isValidSlotStub = sinon.stub(repository, "isValidSlot");
      isValidSlotStub.returns(true);

      const freeSlotStub = sinon.stub(repository, "freeSlot");

      (service as any)._parkingLotRepository = repository;

      const payload = new ParkingSlot("1");
      await service.unparkCar(payload);

      expect(isValidSlotStub.callCount).toBe(1);
      expect(freeSlotStub.callCount).toBe(1);
    });

    it("should throw 'slot not found' BusinessRuleException", async () => {
      const repository = {
        isValidSlot: () => {},
        freeSlot: () => {},
      };

      const isValidSlotStub = sinon.stub(repository, "isValidSlot");
      isValidSlotStub.returns(false);

      const freeSlotStub = sinon.stub(repository, "freeSlot");

      (service as any)._parkingLotRepository = repository;

      try {
        const payload = new ParkingSlot("1");
        await service.unparkCar(payload);
      } catch (err) {
        expect(err instanceof BusinessRuleException);
        expect(err.message).toEqual("Slot number cannot be found.");
        expect(isValidSlotStub.callCount).toBe(1);
        expect(freeSlotStub.callCount).toBe(0);
      }
    });
  });
});
