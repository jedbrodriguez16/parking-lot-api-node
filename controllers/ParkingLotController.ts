import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import types from "../services/types";
import IParkingLotService from "../services/IParkingLotService";
import * as express from "express";

@controller("/api")
export default class ParkingLotController {
  @inject(types.IParkingLotService)
  private readonly _parkingLotService: IParkingLotService;

  @httpGet("/slot-info")
  public getParkingSlotInfo(req: express.Request) {
    let request = req.query || {};
    let { number } = request;

    return this._parkingLotService.getParkingSlotInfo(number);
  }
}
