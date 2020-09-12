import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import types from "../services/types";
import IParkingLotService from "../services/IParkingLotService";
import * as express from "express";
import Car from "../services/dto/Car";
import ParkingSlot from "../services/dto/ParkingSlot";

@controller("/api")
export default class ParkingLotController {
  @inject(types.IParkingLotService)
  private readonly _parkingLotService: IParkingLotService;

  @httpPost("/car/park")
  public parkCar(req: express.Request) {
    let request = req.body || {};
    let car: Car = request;

    return this._parkingLotService.parkCar(car);
  }

  @httpPost("/car/unpark")
  public unparkCar(req: express.Request, res: express.Response) {
    let request = req.body || {};
    let slot: ParkingSlot = request;

    try {
      this._parkingLotService.unparkCar(slot);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    res.sendStatus(204);
  }

  @httpGet("/slot/info")
  public getParkingSlotInfo(req: express.Request) {
    let request = req.query || {};
    let { number } = request;

    return this._parkingLotService.getParkingSlotInfo(number);
  }
}
