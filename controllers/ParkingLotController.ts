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
  public parkCar(req: express.Request, res: express.Response) {
    let request = req.body || {};
    let car: Car = request;

    try {
      return this._parkingLotService.parkCar(car);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  @httpPost(
    "/car/unpark",
    body("slotNumber", "slotNumber is missing").not().isEmpty(),
    validateRequest()
  )
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

  @httpGet(
    "/slot/info",
    query("number", "number is missing").not().isEmpty(),
    validateRequest()
  )
  public getParkingSlotInfo(req: express.Request, res: express.Response) {
    let request = req.query || {};
    let { number } = request;

    try {
      return this._parkingLotService.getParkingSlotInfo(number);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}
