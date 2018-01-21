import {Cell, Stream, Unit} from "sodiumjs";
import {fillInterface, Fuel} from "../types";
import accumulatePulses from "./accumulatePulses";

function capturePrice(sStart: Stream<Fuel>,
                      cPrice1: Cell<number>,
                      cPrice2: Cell<number>,
                      cPrice3: Cell<number>): Cell<number> {
    const [sPrice1, sPrice2, sPrice3] = [cPrice1, cPrice2, cPrice3].map((cPrice, index) => {
        return sStart.snapshot(cPrice, (f, p) => f === Fuel[Fuel[index]] ? p : null)
            .filterNotNull() as Stream<number>;
    });
    return sPrice1.orElse(sPrice2.orElse(sPrice3)).hold(0);
}

export default (sClearAccumulator: Stream<Unit>, sFuelPulses: Stream<number>, cCalibration: Cell<number>,
                cPrice1: Cell<number>, cPrice2: Cell<number>, cPrice3: Cell<number>,
                sStart: Stream<Fuel>): fillInterface => {
    const cPrice = capturePrice(sStart, cPrice1, cPrice2, cPrice3);
    const cLitersDelivered = accumulatePulses(sClearAccumulator, sFuelPulses, cCalibration);
    const cDollarsDelivered = cLitersDelivered.lift(cPrice, (liters, price) => liters * price);
    return {cPrice, cLitersDelivered, cDollarsDelivered};
};
