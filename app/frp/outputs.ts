import {Cell, Stream, Unit} from "sodiumjs";
import Sale from "../lib/sale";
import {Delivery} from "../types";

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

    public setDelivery(delivery: Cell<Delivery>) {
        this.cDelivery = delivery;
        return this as Outputs;
    }

    public setPresetLCD(presetLCD: Cell<string>) {
        this.cPresetLCD = presetLCD;
        return this as Outputs;
    }

    public setSaleCostLCD(saleCostLCD: Cell<string>) {
        this.cSaleCostLCD = saleCostLCD;
        return this as Outputs;
    }

    public setSaleQuantityLCD(saleQuantityLCD: Cell<string>) {
        this.cSaleQuantityLCD = saleQuantityLCD;
        return this as Outputs;
    }

    public setPriceLCD1(priceLCD1: Cell<string>) {
        this.cPriceLCD1 = priceLCD1;
        return this as Outputs;
    }

    public setPriceLCD2(priceLCD2: Cell<string>) {
        this.cPriceLCD2 = priceLCD2;
        return this as Outputs;
    }

    public setPriceLCD3(priceLCD3: Cell<string>) {
        this.cPriceLCD3 = priceLCD3;
        return this as Outputs;
    }

    public setBeep(sBeep: Stream<Unit>) {
        this.sBeep = sBeep;
        return this as Outputs;
    }

    public setSaleComplete(sSaleComplete: Stream<Sale>) {
        this.sSaleComplete = sSaleComplete;
        return this as Outputs;
    }
}

export default Outputs;
