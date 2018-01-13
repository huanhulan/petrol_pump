import {Cell} from 'sodiumjs';

interface LCDPropsInterface {
    cPresetLCD: Cell<string>,
    name: string
}
interface LCDState {
    val: string
}

export {LCDPropsInterface, LCDState};