import {Cell, CellLoop, CellSink, Operational, Stream, StreamSink, Unit} from "sodiumjs";
import {IInputsInterface, Keys, UpDown} from "../types";

const pricePropsFactory = ({price}) => {
    return new CellSink<number>(price);
};

export default function getInputs(priceConfigs,
                                  sClick1: StreamSink<UpDown>,
                                  sClick2: StreamSink<UpDown>,
                                  sClick3: StreamSink<UpDown>): IInputsInterface {
    const [cNozzle1, cNozzle2, cNozzle3] = [sClick1, sClick2, sClick3].map(sClick => {
        const cNozzle = new CellLoop<UpDown>();
        cNozzle.loop(sClick
            .snapshot(cNozzle, (click, direction) => direction === UpDown.DOWN
                ? UpDown.UP
                : UpDown.DOWN)
            .hold(UpDown.DOWN));
        return cNozzle;
    });
    const [sNozzle1, sNozzle2, sNozzle3] = [cNozzle1, cNozzle2, cNozzle3]
        .map(innerCNozzle => Operational.updates(innerCNozzle));
    const [cPrice1, cPrice2, cPrice3] = priceConfigs.map(conf => pricePropsFactory(conf));
    const csClearSale: CellSink<StreamSink<Unit>> = new CellSink(new StreamSink<Unit>());
    const sClearSale: Stream <Unit> = Cell.switchS(csClearSale);
    const sKeypad = new StreamSink<Keys>();
    const sFuelPulses = new StreamSink<number>();
    const cCalibration = new Cell<number>(0.001);

    return {
        cNozzle1, cNozzle2, cNozzle3,
        sNozzle1, sNozzle2, sNozzle3,
        sKeypad,
        sFuelPulses,
        cCalibration,
        cPrice1, cPrice2, cPrice3,
        sClearSale, csClearSale,
    };
}
