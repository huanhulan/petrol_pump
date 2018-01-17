import {Stream, Cell} from 'sodiumjs';

enum delivery{
    OFF, SLOW1, FAST1, SLOW2, FAST2, SLOW3, FAST3
}

interface audioProps {
    cDelivery: Cell<delivery>,
    sBeep: Stream<true|null>
    context: AudioContext,
    soundsBuffer: AudioBuffer[]
}

export {delivery, audioProps}