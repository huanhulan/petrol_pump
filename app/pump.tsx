import {StreamSink, Cell, Transaction, Unit, StreamLoop} from 'sodiumjs';
import {
    getInput,
    wireKeypad,
    LifeCycle,
    Outputs,
    getFuel,
    getNotifyPointOfSale
} from './frp';
import {UpDown, Fuel, Delivery, Optional} from './types';
import {getLCDStr} from './lib';

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

/**
 * gather all cells and streams here
 * and injects them into react component
 * and then mount the app to dom;
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
        const sStrat = new StreamLoop<Fuel>();

        // get inputs
        const inputs = getInput(pricesConfigs, sClick1, sClick2, sClick3);

        const {
            cNozzle1, cNozzle2, cNozzle3,
            sNozzle1, sNozzle2, sNozzle3,
            sKeypad,
            sFuelPulses,
            cCalibration,
            cPrice1, cPrice2, cPrice3,
            sClearSale, csClearSale
        } = inputs;

        const prices = [cPrice1, cPrice2, cPrice3].map((cPrice, index) => {
            const {name} = pricesConfigs[index];
            return {
                cPrice,
                name
            }
        });
        // get lifecycle.
        const lc = new LifeCycle(sNozzle1, sNozzle2, sNozzle3);

        // get keypad
        const ke = wireKeypad(sKeypad, sClearSale);

        // get fill
        const {cPrice, cLitersDelivered, cDollarsDelivered} = getFuel(
            sClearSale.map(u => Unit.UNIT),
            sFuelPulses,
            cCalibration,
            cPrice1, cPrice2, cPrice3,
            sStrat
        );

        // get notify point
        const np = getNotifyPointOfSale(lc, sClearSale, {cPrice, cLitersDelivered, cDollarsDelivered});
        sStrat.loop(np.sStart);

        // get outputs
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
        } = new Outputs()
            .setDelivery(np.cFuelFlowing.map(
                of => of === Fuel.ONE ? Delivery.FAST1 :
                    of === Fuel.TWO ? Delivery.FAST2 :
                        of === Fuel.THREE ? Delivery.FAST3 :
                            Delivery.OFF))
            .setBeep(np.sBeep.orElse(ke.sBeep))
            .setSaleComplete(np.sSaleComplete)
            .setPresetLCD(ke.cValue.map(v => getLCDStr(v, 2)))
            .setSaleCostLCD(cDollarsDelivered.map(v => getLCDStr(v, 2)))
            .setSaleQuantityLCD(cLitersDelivered.map(v => getLCDStr(v, 2)))
            .setPriceLCD1(getPriceLCD(np.cFillActive, cPrice, Fuel.ONE, cPrice1, cPrice2, cPrice3))
            .setPriceLCD2(getPriceLCD(np.cFillActive, cPrice, Fuel.TWO, cPrice1, cPrice2, cPrice3))
            .setPriceLCD3(getPriceLCD(np.cFillActive, cPrice, Fuel.THREE, cPrice1, cPrice2, cPrice3));

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
            csClearSale,
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