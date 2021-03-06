import * as React from "react";
import {IInputPanelInterface} from "../../types";
import LCD from "../LCD";
import Keypad from "./keypad";

class InputPanel extends React.Component<IInputPanelInterface, {}> {
    constructor(props: IInputPanelInterface) {
        super(props);
    }

    public shouldComponentUpdate() {
        return false;
    }

    public onClick(key) {
        return this.props.sKeypad.send(key);
    }

    public render() {
        return (
            <div>
                <LCD name="preset" cPresetLCD={this.props.cPresetLCD}/>
                <Keypad onClick={this.onClick.bind(this)}/>
            </div>
        );
    }
}

export default InputPanel;
