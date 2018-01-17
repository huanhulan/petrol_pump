import * as React from "react";
import {Stream, CellLoop, Transaction, StreamSink} from  'sodiumjs'
import {InputPanelInterface, keys} from './interface';
import LCD from '../LCD';
import Keypad from './keypad';
import * as style from './style.scss';

class InputPanel extends React.Component<InputPanelInterface,{}> {
    value: CellLoop<number>;
    sBeep: Stream<boolean>;
    sKeypad: StreamSink<keys>;

    private getLCDStr(v: number|null) {
        if (v === null) return '';
        const str = v.toString();
        if (str.length >= 3) return str + '.00';
        return (new Array(4 - str.length)).join(' ') + str + '.00';
    }

    constructor(props: InputPanelInterface) {
        super(props);
        Transaction.run(() => {
            this.sKeypad = new StreamSink<keys>();
            this.value = new CellLoop<number>();
            const sKeyUpdate = this.sKeypad.snapshot(this.value, (key, value) => {
                if (key === keys.CLEAR) {
                    return 0;
                } else {
                    const tmp = value * 10;
                    return tmp >= 1000
                        ? null
                        : (key === keys.ZERO ? tmp :
                            key === keys.ONE ? tmp + 1 :
                                key === keys.TWO ? tmp + 2 :
                                    key === keys.THREE ? tmp + 3 :
                                        key === keys.FOUR ? tmp + 4 :
                                            key === keys.FIVE ? tmp + 5 :
                                                key === keys.SIX ? tmp + 6 :
                                                    key === keys.SEVEN ? tmp + 7 :
                                                        key === keys.EIGHT ? tmp + 8 :
                                                            tmp + 9)
                }
            }).filterNotNull() as Stream<number>;
            this.value.loop(sKeyUpdate.orElse(props.sClear.map(u => 0)).hold(0));
            this.sBeep = sKeyUpdate.map(() => true);
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
                <LCD name="preset" cPresetLCD={this.value.map((v)=>v?this.getLCDStr(v):'')}/>
                <Keypad onClick={this.onClick.bind(this)}/>
            </div>
        )
    }
}

export default InputPanel;