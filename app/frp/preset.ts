import {Cell, Stream, Unit} from "sodiumjs";
import {Delivery, Fuel, IFillInterface, Optional, Speed} from "../types";
import getFuel from "./fill";

export default function getPreset(cPresetDollars: Cell<number>,
                                  fi: IFillInterface,
                                  cFuelFlowing: Cell<Optional<Fuel>>,
                                  cFillActive: Cell<boolean>) {
    const cSpeed: Cell<Speed> = cPresetDollars.lift4(fi.cPrice,
        fi.cDollarsDelivered,
        fi.cLitersDelivered,
        (presetDollars, price, dollarsDelivered, litersDelivered) => {
            if (presetDollars === 0) {
                return Speed.FAST;
            } else {
                if (dollarsDelivered >= presetDollars) {
                    return Speed.STOPPED;
                }
                const slowLiters = presetDollars / price - 0.1;
                if (litersDelivered >= slowLiters) {
                    return Speed.SLOW;
                } else {
                    return Speed.FAST;
                }
            }
        });
    const cDelivery = cFuelFlowing.lift(cSpeed, (oFuel, speed) => {
        return speed === Speed.FAST
            ? (oFuel === Fuel.ONE
                ? Delivery.FAST1
                : oFuel === Fuel.TWO
                    ? Delivery.FAST2
                    : oFuel === Fuel.THREE
                        ? Delivery.FAST3
                        : Delivery.OFF)
            : speed === Speed.SLOW
                ? (oFuel === Fuel.ONE
                    ? Delivery.SLOW1
                    : oFuel === Fuel.TWO
                        ? Delivery.SLOW2
                        : oFuel === Fuel.THREE
                            ? Delivery.SLOW3
                            : Delivery.OFF)
                : Delivery.OFF;
    });
    const cKeypadActive = cFuelFlowing.lift(cSpeed, (oFuel, speed) => oFuel === null || (speed === Speed.FAST));

    return {
        cDelivery,
        cKeypadActive,
    };
}
