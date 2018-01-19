import * as React from "react";
import PricePanel from './components/price_panel';
import NozzlePanel from './components/nozzle_panel';
import Audio from './components/audio';
import LCD from './components/LCD';
import InputPanel from './components/input_panel';
import {appPropsInterface} from './types';
import * as style from "./style/index.scss";
import getLCDStr from './lib/getLCDStr';


class App extends React.Component<appPropsInterface,{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.app}>
                <Audio context={this.props.context} soundsBuffer={this.props.soundsBuffer}
                       cDelivery={this.props.cDelivery}
                       sBeep={this.props.sBeep}/>
                <div className={style.header}>
                    <PricePanel prices={this.props.prices}/>
                </div>
                <div className={style.input}>
                    <InputPanel sClear={this.props.sClear}
                                cActive={this.props.cActive}
                                cValue={this.props.cValue}
                                sBeep={this.props.sBeep}
                                cPresetLCD={this.props.cPresetLCD}
                                sKeypad={this.props.sKeypad}/>
                </div>
                <div className={style.pump}>
                    <div className={style.dollars}>
                        <LCD cPresetLCD={this.props.cSaleCostLCD} name="dollars"/>
                    </div>
                    <div className={style.liters}>
                        <LCD cPresetLCD={this.props.cSaleQuantityLCD} name="liters"/>
                    </div>
                    <NozzlePanel cPriceLCDs={this.props.cPriceLCDs}
                                 sClicks={this.props.sClicks}
                                 cNozzles={this.props.cNozzles}/>
                </div>
            </div>
        );
    }
}

export default App;