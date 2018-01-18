import {Unit, Cell, Stream} from 'sodiumjs';
import {Delivery} from '../types';
import Sale from '../lib/sale';

class Outputs {
    public cDelivery: Cell<Delivery>;
    public cPresetLCD: Cell<string>;
    public cSaleCostLCD: Cell<string>;
    public cSaleQuantityLCD: Cell<string>;
    public cPriceLCD1: Cell<string>;
    public cPriceLCD2: Cell<string>;
    public cPriceLCD3: Cell<string>;
    public sBeep: Stream<Unit>;
    public sSaleComplete: Stream<Sale>;

    constructor() {
        this.cDelivery = new Cell<Delivery>(Delivery.OFF);
        this.cPresetLCD = new Cell<string>("");
        this.cSaleCostLCD = new Cell<string>("");
        this.cSaleQuantityLCD = new Cell<string>("");
        this.cPriceLCD1 = new Cell<string>("");
        this.cPriceLCD2 = new Cell<string>("");
        this.cPriceLCD3 = new Cell<string>("");
        this.sBeep = new Stream<Unit>();
        this.sSaleComplete = new Stream<Sale>();
    }

    setDelivery(delivery: Cell<Delivery>) {
        this.cDelivery = delivery;
        return this;
    }

    setPresetLCD(presetLCD: Cell<string>) {
        this.cPresetLCD = presetLCD;
        return this;
    }

    setSaleCostLCD(saleCostLCD: Cell<string>) {
        this.cSaleCostLCD = saleCostLCD;
        return this;
    }

    setSaleQuantityLCD(saleQuantityLCD: Cell<string>) {
        this.cSaleQuantityLCD = saleQuantityLCD;
        return this;
    }

    setPriceLCD1(priceLCD1: Cell<string>) {
        this.cPriceLCD1 = priceLCD1;
        return this;
    }

    setPriceLCD2(priceLCD2: Cell<string>) {
        this.cPriceLCD2 = priceLCD2;
        return this;
    }

    setPriceLCD3(priceLCD3: Cell<string>) {
        this.cPriceLCD3 = priceLCD3;
        return this;
    }

    setBeep(sBeep: Stream<Unit>) {
        this.sBeep = sBeep;
        return this;
    }

    setSaleComplete(sSaleComplete: Stream<Sale>) {
        this.sSaleComplete = sSaleComplete;
        return this;
    }
}

export default Outputs;