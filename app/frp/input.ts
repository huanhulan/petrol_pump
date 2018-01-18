import {Stream, Cell, CellSink, CellLoop, StreamSink, Unit, Transaction, Operational} from 'sodiumjs';
import {Keys, UpDown} from '../types'
import {inputsInterface} from '../types';

const pricePropsFactory = ({price}) => {
    return {
        cPrice: new CellSink(price)
    }
};

export default function (priceConfigs): inputsInterface {
    return Transaction.run(() => {
        const [cNozzle1, cNozzle2, cNozzle3] = [0, 1, 2].map(() => {
            const cNozzle = new CellLoop<null|UpDown>();
            cNozzle.loop(this.sClick
                .snapshot(this.cNozzle, (click, direction) => direction === UpDown.DOWN
                    ? UpDown.UP
                    : UpDown.DOWN)
                .hold(UpDown.DOWN));
            return cNozzle;
        });
        const [sNozzle1, sNozzle, sNozzle3] = [cNozzle1, cNozzle2, cNozzle3].map(nozzle => Operational.updates(nozzle));
        const [cPrice1, cPrice2, cPrice3] = priceConfigs.map(conf => pricePropsFactory(conf));
        const csClearSale: CellSink<Stream<Unit>> = new CellSink(new Stream<Unit>());
        const sClearSale: Stream <Unit> = Cell.switchS(csClearSale);
        const sKeypad = new StreamSink<Keys>();
        const sFuelPulses = new StreamSink<number>();
        const cCalibration = new Cell<number>(0.001);

        return {
            cNozzle1, cNozzle2, cNozzle3,
            sNozzle1, sNozzle, sNozzle3,
            sKeypad,
            sFuelPulses,
            cCalibration,
            cPrice1, cPrice2, cPrice3,
            sClearSale
        }
    });
}
