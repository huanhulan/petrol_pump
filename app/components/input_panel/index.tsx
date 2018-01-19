import * as React from "react";
import {Stream, CellLoop, Transaction, StreamSink} from  'sodiumjs'
import {inputPanelInterface, Keys} from '../../types';
import LCD from '../LCD';
import Keypad from './keypad';
import * as style from './style.scss';

class InputPanel extends React.Component<inputPanelInterface,{}> {
    private getLCDStr(v: number|null) {
        if (v === null) return '';
        const str = v.toString();
        if (str.length >= 3) return str + '.00';
        return (new Array(4 - str.length)).join(' ') + str + '.00';
    }

    constructor(props: inputPanelInterface) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    onClick(key) {
        return this.props.sKeypad.send(key);
    }

    render() {
        return (
            <div className={style['input-panel']}>
                <LCD name="preset" cPresetLCD={this.props.cPresetLCD}/>
                <Keypad onClick={this.onClick.bind(this)}/>
            </div>
        )
    }
}

export default InputPanel;