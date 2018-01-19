import {StreamSink, Transaction} from 'sodiumjs';
import {
    getInput,
    wireKeypad,
    LifeCycle,
    Outputs
} from './frp';
import {UpDown, Fuel, Delivery} from './types';
import {getPresetLCDStr} from './lib';

/**
 * gather all cells and streams here
 * and injects them into react component
 * and then mount the app to dom;
 * @param inputs
 */
function pump() {
    return Transaction.run(() => {
        const sClick1 = new StreamSink<UpDown>();
        const sClick2 = new StreamSink<UpDown>();
        const sClick3 = new StreamSink<UpDown>();
        const pricesConfigs = [{
            name: 'price1',
            price: 2.149,
        }, {
            name: 'price2',
            price: 2.341,
        }, {
            name: 'price3',
            price: 1.499,
        }];
        // get inputs
        const inputs = getInput(pricesConfigs, sClick1, sClick2, sClick3);
        const {
            cNozzle1, cNozzle2, cNozzle3,
            sNozzle1, sNozzle2, sNozzle3,
            sKeypad,
            sFuelPulses,
            cCalibration,
            cPrice1, cPrice2, cPrice3,
            sClearSale
        } = inputs;
        const prices = [cPrice1, cPrice2, cPrice3].map((cPrice, index) => {
            const {name} = pricesConfigs[index];
            return {
                cPrice,
                name
            }
        });
        // get lifecycle.
        const lc = new LifeCycle(inputs.sNozzle1, inputs.sNozzle2, inputs.sNozzle3);
        // get keypad
        const ke = wireKeypad(inputs.sKeypad, inputs.sClearSale);
        // get outputs
        const outputs = new Outputs().setDelivery(lc.cFillActive.map(
            of => of === Fuel.ONE ? Delivery.FAST1 :
                of === Fuel.TWO ? Delivery.FAST2 :
                    of === Fuel.THREE ? Delivery.FAST3 :
                        Delivery.OFF))
            .setSaleCostLCD(
                lc.cFillActive.map(
                    of => of === Fuel.ONE ? '1' :
                        of === Fuel.TWO ? '2' :
                            of === Fuel.THREE ? '3' :
                                ''
                ))
            .setBeep(ke.sBeep)
            .setPresetLCD(ke.cValue.map(v => getPresetLCDStr(v)));
        const {
            cDelivery,
            cPresetLCD,
            cSaleCostLCD,
            cSaleQuantityLCD,
            cPriceLCD1,
            cPriceLCD2,
            cPriceLCD3,
            sBeep,
            sSaleComplete
        } = outputs;
        const cValue = ke.cValue;

        return {
            sClicks: [sClick1, sClick2, sClick3],
            cNozzles: [cNozzle1, cNozzle2, cNozzle3],
            cPriceLCDs: [cPriceLCD1, cPriceLCD2, cPriceLCD3],
            prices,
            sNozzle1,
            sNozzle2,
            sNozzle3,
            sKeypad,
            sFuelPulses,
            cCalibration,
            sClearSale,
            cDelivery,
            cPresetLCD,
            cSaleCostLCD,
            cSaleQuantityLCD,
            sBeep,
            sSaleComplete,
            cValue
        }
    });
}

export default pump;