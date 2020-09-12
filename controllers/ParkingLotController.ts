import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import types from "../services/types";
import IParkingLotService from "../services/IParkingLotService";
import * as express from "express";
import Car from "../services/dto/Car";
import ParkingSlot from "../services/dto/ParkingSlot";
import { body, query } from "express-validator";
import validateRequest from "./validateRequest";

@controller("/api")
export default class ParkingLotController {
  @inject(types.IParkingLotService)
  private readonly _parkingLotService: IParkingLotService;

  @httpPost(
    "/car/park",
    body("registrationNumber", "registrationNumber is missing").not().isEmpty(),
    validateRequest()
  )
  public parkCar(req: express.Request) {
    let request = req.body || {};
    let car: Car = request;

    return this._parkingLotService.parkCar(car);
  }

  @httpPost(
    "/car/unpark",
    body("slotNumber", "slotNumber is missing").not().isEmpty(),
    validateRequest()
  )
  public unparkCar(req: express.Request, res: express.Response) {
    let request = req.body || {};
    let slot: ParkingSlot = request;

    this._parkingLotService.unparkCar(slot);
    res.sendStatus(204);
  }

  @httpGet(
    "/slot/info",
    query("number", "number is missing").not().isEmpty(),
    validateRequest()
  )
  public getParkingSlotInfo(req: express.Request) {
    let request = req.query || {};
    let { number } = request;

    return this._parkingLotService.getParkingSlotInfo(number);
  }
}
