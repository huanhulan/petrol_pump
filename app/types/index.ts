import {Stream, Cell, CellSink, CellLoop, StreamSink} from 'sodiumjs';

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
    inputPanelInterface
}