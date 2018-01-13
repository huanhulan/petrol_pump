import * as React from "react";
import * as ReactDOM from "react-dom";
import * as style from "./style/index.scss";
import {cPriceArr, PricePanel} from './components/price_panel';
import {NozzlePanel} from './components/nozzle_panel';
import LCD from './components/LCD';
import {Cell} from 'sodiumjs';

const cTestLCDPreset = new Cell('12345678.09');

class App extends React.Component<{},{}> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.refs)
    }

    render() {
        return (
            <div className={style.app}>
                <div className={style.header}>
                    <PricePanel/>
                </div>
                <div className={style.keypad}/>
                <div className={style.pump}>
                    <LCD cPresetLCD={cTestLCDPreset} name="dollars"/>
                    <LCD cPresetLCD={cTestLCDPreset} name="liters"/>
                    <NozzlePanel cPriceLCDs={cPriceArr.map(cell => cell.map(v => v.toString()))} ref="NozzlePanel"/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("viewport"));
