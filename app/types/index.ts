import {Stream, Cell, CellSink, CellLoop, StreamSink, Unit} from 'sodiumjs';

type Optional<A> = A|null;

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

interface audioProps {
    cDelivery: Cell<Delivery>,
    sBeep: Stream<true>
    context: AudioContext,
    soundsBuffer: AudioBuffer[]
}

interface priceStateInterface {
    price: number
}

interface pricePropsInterface extends priceStateInterface {
    name: string,
    cPrice: CellSink<number>
}

interface nozzleProps {
    cPriceLCD: Cell<string>,
    name: string,
    src: string
}

interface nozzleState {
    direction: UpDown
}

interface nozzlePanelInterface {
    cPriceLCDs: Cell<string>[]
}

interface modalProps {
    fuleType: string,
    fulePrice: string,
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
    sClear: Stream<true|null>,
    cActive?: Cell<boolean>
}

interface inputsInterface {
    cNozzle1: CellLoop<UpDown>, cNozzle2: CellLoop<UpDown>, cNozzle3: CellLoop<UpDown>,
    sNozzle1: Stream<UpDown>, sNozzle: Stream<UpDown>, sNozzle3: Stream<UpDown>,
    sKeypad: StreamSink<Keys>,
    sFuelPulses: StreamSink<number>,
    cCalibration: Cell<number>,
    cPrice1: CellSink<number>, cPrice2: CellSink<number>, cPrice3: CellSink<number>,
    sClearSale: Stream <Unit>
}

export {
    Delivery,
    UpDown,
    Fuel,
    Keys,
    End,
    audioProps,
    pricePropsInterface,
    priceStateInterface,
    nozzleProps,
    nozzleState,
    nozzlePanelInterface,
    modalProps,
    LCDPropsInterface,
    LCDState,
    svgPropsInterface,
    digitPropsInterface,
    keypadProps,
    inputPanelInterface,
    inputsInterface,
    Optional
}