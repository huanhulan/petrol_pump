import {Cell, CellLoop, CellSink, Stream, StreamSink, Unit} from "sodiumjs";
type Optional<A> = A|null;

enum Delivery {
    OFF,
    SLOW1,
    FAST1,
    SLOW2,
    FAST2,
    SLOW3,
    FAST3,
}

enum UpDown {
    UP = 1,
    DOWN,
}

enum Fuel {
    ONE,
    TWO,
    THREE,
}

enum Keys {
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
    CLEAR,
}

enum End { END }

enum Phase { IDLE, FILLING, POS }

interface ISaleInterface {
    fuel: Fuel;
    price: number;
    cost: number;
    quantity: number;
}

interface IAudioProps {
    cDelivery: Cell<Delivery>;
    sBeep: Stream<Unit>;
    context: AudioContext;
    soundsBuffer: AudioBuffer[];
}

interface IPriceStateInterface {
    price: number;
}

interface IPricePropsInterface {
    name: string;
    cPrice: CellSink<number>;
}

interface IPricePanelPropsInterface {
    prices: IPricePropsInterface[];
}

interface INozzleProps {
    cPriceLCD: Cell<string>;
    name: string;
    src: string;
    cNozzle: CellLoop<UpDown>;
    sClick: StreamSink<UpDown>;
}

interface INozzleState {
    direction: UpDown;
}

interface INozzlePanelProps {
    cPriceLCDs: Array<Cell<string>>;
    cNozzles: Array<CellLoop<UpDown>>;
    sClicks: Array<StreamSink<UpDown>>;
}

interface IModalProps {
    fuelType: string;
    fuelPrice: string;
    dollarsDelivered: string;
    litersDelivered: string;
}

interface ILCDPropsInterface {
    cPresetLCD: Cell<string>;
    name: string;
}
interface ILCDState {
    val: string;
}

interface ISvgPropsInterface {
    x: number;
    y: number;
}
interface IDigitPropsInterface extends ISvgPropsInterface {
    val: number;
}

interface IKeypadProps {
    onClick: (Keys) => any;
}

interface IInputPanelInterface {
    sClear: Stream<Unit>;
    cActive?: Cell<boolean>;
    cValue: CellLoop<number>;
    sBeep: Stream<Unit>;
    sKeypad: StreamSink<Keys>;
    cPresetLCD: Cell<string>;
}

interface IInputsInterface {
    cNozzle1: CellLoop<UpDown>;
    cNozzle2: CellLoop<UpDown>;
    cNozzle3: CellLoop<UpDown>;
    sNozzle1: Stream<UpDown>;
    sNozzle2: Stream<UpDown>;
    sNozzle3: Stream<UpDown>;
    sKeypad: StreamSink<Keys>;
    sFuelPulses: StreamSink<number>;
    cCalibration: Cell<number>;
    cPrice1: CellSink<number>;
    cPrice2: CellSink<number>;
    cPrice3: CellSink<number>;
    sClearSale: Stream <Unit>;
    csClearSale: CellSink<Stream<Unit>>;
}

interface IFillInterface {
    cPrice: Cell<number>;
    cLitersDelivered: Cell<number>;
    cDollarsDelivered: Cell<number>;
}

interface IAppPropsInterface extends IAudioProps,
    IPricePanelPropsInterface,
    INozzlePanelProps,
    IInputPanelInterface {
    cSaleCostLCD: Cell<string>;
    cSaleQuantityLCD: Cell<string>;
    sSaleComplete: Stream<ISaleInterface>;
    csClearSale: CellSink<Stream<Unit>>;
}

interface IAppStateInterface {
    isModalOpen: boolean;
    sale: Optional<ISaleInterface>;
}

export {
    Delivery,
    UpDown,
    Fuel,
    Keys,
    End,
    Phase,
    IAudioProps,
    IPricePropsInterface,
    IPriceStateInterface,
    IPricePanelPropsInterface,
    INozzleProps,
    INozzleState,
    INozzlePanelProps,
    IModalProps,
    ILCDPropsInterface,
    ILCDState,
    ISvgPropsInterface,
    IDigitPropsInterface,
    IKeypadProps,
    IInputPanelInterface,
    IInputsInterface,
    IFillInterface,
    Optional,
    IAppPropsInterface,
    IAppStateInterface,
    ISaleInterface,
};
