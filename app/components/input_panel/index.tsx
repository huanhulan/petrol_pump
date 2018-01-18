import * as React from "react";
import {Stream, CellLoop, Transaction, StreamSink} from  'sodiumjs'
import {inputPanelInterface, Keys} from '../../types';
import LCD from '../LCD';
import Keypad from './keypad';
import * as style from './style.scss';

class InputPanel extends React.Component<inputPanelInterface,{}> {
    cValue: CellLoop<number>;
    sBeep: Stream<true>;
    sKeypad: StreamSink<Keys>;

    private getLCDStr(v: number|null) {
        if (v === null) return '';
        const str = v.toString();
        if (str.length >= 3) return str + '.00';
        return (new Array(4 - str.length)).join(' ') + str + '.00';
    }

    constructor(props: inputPanelInterface) {
        super(props);
        Transaction.run(() => {
            this.sKeypad = new StreamSink<Keys>();
            this.cValue = new CellLoop<number>();
            const sKeyUpdate = this.sKeypad.snapshot(this.cValue, (key, value) => {
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
            this.cValue.loop(sKeyUpdate.orElse(props.sClear.map(u => 0)).hold(0));
            this.sBeep = sKeyUpdate.map(() => true) as Stream<true>;
        });
    }

    shouldComponentUpdate() {
        return false;
    }

    onClick(key) {
        return this.sKeypad.send(key);
    }

    render() {
        return (
            <div className={style['input-panel']}>
                <LCD name="preset" cPresetLCD={this.cValue.map((v)=>v?this.getLCDStr(v):'')}/>
                <Keypad onClick={this.onClick.bind(this)}/>
            </div>
        )
    }
}

export default InputPanel;