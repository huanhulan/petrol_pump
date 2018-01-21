import {Stream, Cell, CellSink, CellLoop, StreamSink, Unit} from 'sodiumjs';
type Optional<A> = A|null;

interface saleInterface {
    fuel: Fuel;
    price: number;
    cost: number;
    quantity: number;
}

enum Delivery{
    OFF,
    SLOW1,
    FAST1,
    SLOW2,
    FAST2,
    SLOW3,
    FAST3
}

enum UpDown {
    UP = 1,
    DOWN,
}

enum Fuel {
    ONE,
    TWO,
    THREE
}

enum Keys{
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    CLEAR
}

enum End { END }

enum Phase{ IDLE, FILLING, POS }

interface audioProps {
    cDelivery: Cell<Delivery>,
    sBeep: Stream<Unit>
    context: AudioContext,
    soundsBuffer: AudioBuffer[]
}

interface priceStateInterface {
    price: number
}

interface pricePropsInterface {
    name: string,
    cPrice: CellSink<number>
}

interface pricePanelPropsInterface {
    prices: pricePropsInterface[]
}

interface nozzleProps {
    cPriceLCD: Cell<string>,
    name: string,
    src: string,
    cNozzle: CellLoop<UpDown>,
    sClick: StreamSink<UpDown>
}

interface nozzleState {
    direction: UpDown
}

interface nozzlePanelProps {
    cPriceLCDs: Cell<string>[],
    cNozzles: CellLoop<UpDown>[],
    sClicks: StreamSink<UpDown>[],
}

interface modalProps {
    fuelType: string,
    fuelPrice: string,
    dollarsDelivered: string,
    litersDelivered: string
}

interface LCDPropsInterface {
    cPresetLCD: Cell<string>,
    name: string
}
interface LCDState {
    val: string
}

interface svgPropsInterface {
    x: number,
    y: number
}
interface digitPropsInterface extends svgPropsInterface {
    val: number
}

interface keypadProps {
    onClick: (Keys) => any
}

interface inputPanelInterface {
    sClear: Stream<Unit>,
    cActive?: Cell<boolean>,
    cValue: CellLoop<number>;
    sBeep: Stream<Unit>;
    sKeypad: StreamSink<Keys>;
    cPresetLCD: Cell<string>
}

interface inputsInterface {
    cNozzle1: CellLoop<UpDown>, cNozzle2: CellLoop<UpDown>, cNozzle3: CellLoop<UpDown>,
    sNozzle1: Stream<UpDown>, sNozzle2: Stream<UpDown>, sNozzle3: Stream<UpDown>,
    sKeypad: StreamSink<Keys>,
    sFuelPulses: StreamSink<number>,
    cCalibration: Cell<number>,
    cPrice1: CellSink<number>, cPrice2: CellSink<number>, cPrice3: CellSink<number>,
    sClearSale: Stream <Unit>,csClearSale: CellSink<Stream<Unit>>
}

interface fillInterface {
    cPrice: Cell<number>,
    cLitersDelivered: Cell<number>,
    cDollarsDelivered: Cell<number>
}

interface appPropsInterface extends audioProps,
    pricePanelPropsInterface,
    nozzlePanelProps,
    inputPanelInterface {
    cSaleCostLCD: Cell<string>,
    cSaleQuantityLCD: Cell<string>,
    sSaleComplete: Stream<saleInterface>,
    csClearSale: CellSink<Stream<Unit>>
}

interface appStateInterface {
    isModalOpen: boolean,
    sale: Optional<saleInterface>
}

export {
    Delivery,
    UpDown,
    Fuel,
    Keys,
    End,
    Phase,
    audioProps,
    pricePropsInterface,
    priceStateInterface,
    pricePanelPropsInterface,
    nozzleProps,
    nozzleState,
    nozzlePanelProps,
    modalProps,
    LCDPropsInterface,
    LCDState,
    svgPropsInterface,
    digitPropsInterface,
    keypadProps,
    inputPanelInterface,
    inputsInterface,
    fillInterface,
    Optional,
    appPropsInterface,
    appStateInterface,
    saleInterface
}