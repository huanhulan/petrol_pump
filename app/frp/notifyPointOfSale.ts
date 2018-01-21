import {Stream, Cell, CellLoop, Unit} from 'sodiumjs';
import {End, Phase, Fuel, Optional, fillInterface} from '../types';
import {Sale} from '../lib';
import LifeCycle from './lifeCycle';

export default function (lc: LifeCycle, sClearSale: Stream<Unit>, {cPrice, cLitersDelivered, cDollarsDelivered}:fillInterface) {
    const cPhase = new CellLoop<Phase>();
    const sStart: Stream<Fuel> = lc.sStart.gate(cPhase.map(p => p === Phase.IDLE));
    const sEnd: Stream<End> = lc.sEnd.gate(cPhase.map(p => p === Phase.FILLING));
    cPhase.loop(
        sStart.map(u => Phase.FILLING)
            .orElse(sEnd.map(u => Phase.POS))
            .orElse(sClearSale.map(u => Phase.IDLE))
            .hold(Phase.IDLE)
    );
    const cFuelFlowing: Cell<Optional<Fuel>> = sStart.map(f => <Optional<Fuel>>f)
        .orElse(sEnd.map(f => null))
        .hold(null);
    const cFillActive: Cell<Optional<Fuel>> = sStart.map(f => <Optional<Fuel>>f)
        .orElse(sClearSale.map(f => null))
        .hold(null);
    const sBeep = sClearSale;
    const sSaleComplete = sEnd.snapshot1(
        cFuelFlowing.lift4(cPrice, cDollarsDelivered, cLitersDelivered,
            (fuelFlowing, price, dollarsDelivered, litersDelivered) => {
                return fuelFlowing !== null
                    ? new Sale(fuelFlowing, price, dollarsDelivered, litersDelivered)
                    : null
            })
    ).filterNotNull() as Stream<Sale>;

    return {
        sStart,
        cFillActive,
        cFuelFlowing,
        sEnd,
        sBeep,
        sSaleComplete
    }
}