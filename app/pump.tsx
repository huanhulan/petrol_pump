import {StreamSink, Cell, Transaction, Unit} from 'sodiumjs';
import {
    getInput,
    wireKeypad,
    LifeCycle,
    Outputs,
    accumulate,
    getFuel
} from './frp';
import {UpDown, Fuel, Delivery, Optional} from './types';
import {getLCDStr} from './lib';

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
        // get fill
        const {cPrice, cLitersDelivered, cDollarsDelivered} = getFuel(lc.sStart.map(u => Unit.UNIT),
            sFuelPulses,
            cCalibration,
            cPrice1, cPrice2, cPrice3,
            lc.sStart
        );
        // get outputs
        const outputs = new Outputs().setDelivery(lc.cFillActive.map(
            of => of === Fuel.ONE ? Delivery.FAST1 :
                of === Fuel.TWO ? Delivery.FAST2 :
                    of === Fuel.THREE ? Delivery.FAST3 :
                        Delivery.OFF))
            .setBeep(ke.sBeep)
            .setPresetLCD(ke.cValue.map(v => getLCDStr(v, 2)))
            .setSaleCostLCD(cDollarsDelivered.map(v => getLCDStr(v, 2)))
            .setSaleQuantityLCD(cLitersDelivered.map(v => getLCDStr(v, 2)))
            .setPriceLCD1(getPriceLCD(lc.cFillActive, cPrice, Fuel.ONE, cPrice1, cPrice2, cPrice3))
            .setPriceLCD2(getPriceLCD(lc.cFillActive, cPrice, Fuel.TWO, cPrice1, cPrice2, cPrice3))
            .setPriceLCD3(getPriceLCD(lc.cFillActive, cPrice, Fuel.THREE, cPrice1, cPrice2, cPrice3));

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

function getPriceLCD(cFillActive: Cell<Optional<Fuel>>,
                     cFillPrice: Cell<number>,
                     fuel: Fuel,
                     cPrice1, cPrice2, cPrice3): Cell<string> {
    let cIdlePrice: Cell<Optional<number>>;
    switch (fuel) {
        case Fuel.ONE:
            cIdlePrice = cPrice1;
            break;
        case Fuel.TWO:
            cIdlePrice = cPrice2;
            break;
        case Fuel.THREE:
            cIdlePrice = cPrice3;
            break;
        default:
            cIdlePrice = new Cell(null);
            break;
    }
    return cFillActive.lift3(cFillPrice, cIdlePrice, (fuelSelected, fillPrice, idlePrice) => {
        return fuelSelected !== null
            ? fuelSelected === fuel
                ? getLCDStr(fillPrice)
                : ""
            : getLCDStr(idlePrice);
    });
}

export default pump;