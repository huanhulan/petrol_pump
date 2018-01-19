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
        return <Outputs>this;
    }

    setPresetLCD(presetLCD: Cell<string>) {
        this.cPresetLCD = presetLCD;
        return <Outputs>this;
    }

    setSaleCostLCD(saleCostLCD: Cell<string>) {
        this.cSaleCostLCD = saleCostLCD;
        return <Outputs>this;
    }

    setSaleQuantityLCD(saleQuantityLCD: Cell<string>) {
        this.cSaleQuantityLCD = saleQuantityLCD;
        return <Outputs>this;
    }

    setPriceLCD1(priceLCD1: Cell<string>) {
        this.cPriceLCD1 = priceLCD1;
        return <Outputs>this;
    }

    setPriceLCD2(priceLCD2: Cell<string>) {
        this.cPriceLCD2 = priceLCD2;
        return <Outputs>this;
    }

    setPriceLCD3(priceLCD3: Cell<string>) {
        this.cPriceLCD3 = priceLCD3;
        return <Outputs>this;
    }

    setBeep(sBeep: Stream<Unit>) {
        this.sBeep = sBeep;
        return <Outputs>this;
    }

    setSaleComplete(sSaleComplete: Stream<Sale>) {
        this.sSaleComplete = sSaleComplete;
        return <Outputs>this;
    }
}

export default Outputs;