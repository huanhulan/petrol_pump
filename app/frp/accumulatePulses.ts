import {Cell, CellLoop, Stream, Unit} from "sodiumjs";

function accumulate(sClearAccumulator: Stream<Unit>,
                    sPulses: Stream<number>,
                    cCalibration: Cell<number>) {
    const cTotal = new CellLoop<number>();
    cTotal.loop(
        sClearAccumulator.map(u => 0).orElse(
            sPulses.snapshot(cTotal, (pulses, total) => pulses + total),
        ).hold(0),
    );
    return cTotal.lift(cCalibration, (total, calibration) => total * calibration);
}

export default accumulate;
