import {Cell} from 'sodiumjs';

interface LCDPropsInterface {
    cPresetLCD: Cell<number>,
    name: string
}
interface LCDState {
    val: string
}

export {LCDPropsInterface, LCDState};