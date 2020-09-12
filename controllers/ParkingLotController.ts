import { controller, httpGet } from "inversify-express-utils";

@controller("/api")
export default class ParkingLotController {
  @httpGet("/ping")
  public ping() {
    return { ping: "pong" };
  }
}
