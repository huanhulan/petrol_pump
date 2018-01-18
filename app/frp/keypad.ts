import {Unit, Cell, StreamSink, Stream, Transaction, CellLoop} from 'sodiumjs';
import {Keys} from '../types'

function wireKeypad(sKeypad: StreamSink<Keys>|Stream<Keys>, sClear: Stream<Unit>, cActive?: Cell<boolean>) {
    if (cActive) {
        return wireKeypad(sKeypad.gate(cActive), sClear)
    }
    return Transaction.run(() => {
        const sKeypad = new StreamSink<Keys>();
        const cValue = new CellLoop<number>();
        const sKeyUpdate = sKeypad.snapshot(cValue, (key, value) => {
            if (key === Keys.CLEAR) {
                return 0;
            } else {
                const tmp = value * 10;
                return tmp >= 1000
                    ? null
                    : (key === Keys.ZERO ? tmp :
                        key === Keys.ONE ? tmp + 1 :
                            key === Keys.TWO ? tmp + 2 :
                                key === Keys.THREE ? tmp + 3 :
                                    key === Keys.FOUR ? tmp + 4 :
                                        key === Keys.FIVE ? tmp + 5 :
                                            key === Keys.SIX ? tmp + 6 :
                                                key === Keys.SEVEN ? tmp + 7 :
                                                    key === Keys.EIGHT ? tmp + 8 :
                                                        tmp + 9)
            }
        }).filterNotNull() as Stream<number>;
        cValue.loop(sKeyUpdate.orElse(sClear.map(u => 0)).hold(0));
        const sBeep = sKeyUpdate.map(() => true) as Stream<true>;

        return {sBeep, cValue}
    });
}

export default wireKeypad;