import {Cell, Stream, Transaction, CellLoop} from 'sodiumjs';
import {End, Fuel, UpDown, Optional} from '../types';

class LifeCycle {
    public sStart: Stream<Fuel>;
    public cFillActive: Cell<Optional<Fuel>>;
    public sEnd: Stream<End>;

    private static whenLifted(sNozzle: Stream<UpDown>,
                              nozzleFuel: Fuel): Stream<Fuel> {
        return sNozzle.filter(u => u == UpDown.UP)
            .map(u => nozzleFuel);
    }

    private static whenSetDown(sNozzle: Stream<UpDown>,
                               nozzleFuel: Fuel,
                               cFillActive: Cell<Optional<Fuel>>): Stream<End> {
        return sNozzle.snapshot(cFillActive,
            (u, f) => u === UpDown.DOWN && f === nozzleFuel
                ? End.END
                : null)
            .filterNotNull() as Stream<End>;
    }

    constructor(sNozzle1: Stream<UpDown>,
                sNozzle2: Stream<UpDown>,
                sNozzle3: Stream<UpDown>) {
        // new Transaction.run(() => {
        const sLiftNozzle: Stream<Fuel> =
            LifeCycle.whenLifted(sNozzle1, Fuel.ONE).orElse(
                LifeCycle.whenLifted(sNozzle2, Fuel.TWO).orElse(
                    LifeCycle.whenLifted(sNozzle3, Fuel.THREE)));
        const cFillActive = new CellLoop<Optional<Fuel>>();
        this.sStart = sLiftNozzle.snapshot(
            cFillActive,
            (newFuel, fillActive) =>
                fillActive !== null ? null
                    : newFuel
        ).filterNotNull() as Stream<Fuel>;
        this.sEnd = LifeCycle.whenSetDown(sNozzle1, Fuel.ONE, cFillActive).orElse(
            LifeCycle.whenSetDown(sNozzle2, Fuel.TWO, cFillActive).orElse(
                LifeCycle.whenSetDown(sNozzle3, Fuel.THREE, cFillActive)));
        cFillActive.loop(
            this.sEnd.map(e => <Optional<Fuel>>null)
                .orElse(this.sStart)
                .hold(null)
        );
        this.cFillActive = cFillActive;
        // });
    }
}

export default LifeCycle;