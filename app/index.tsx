import * as React from "react";
import * as ReactDOM from "react-dom";
import {Cell, Stream, CellSink} from 'sodiumjs';
import * as style from "./style/index.scss";
import getLCDStr from './lib/getLCDStr';
import {PricePanel} from './components/price_panel';
import {NozzlePanel} from './components/nozzle_panel';
import LCD from './components/LCD';
import InputPanel from './components/input_panel';

const pricePropsFactory = ({name, price}) => {
    return {
        name,
        price,
        cPrice: new CellSink(price)
    }
};
const prices = [{
    name: 'price1',
    price: 2.149,
}, {
    name: 'price2',
    price: 2.341,
}, {
    name: 'price3',
    price: 1.499,
}].map(conf => pricePropsFactory(conf));

const cTestLCDPreset = new Cell('12345678.09');
const cPriceArr = prices.map(price => price.cPrice);
const sClear = new Stream<true>();
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
                    <PricePanel prices={prices}/>
                </div>
                <div className={style.input}>
                    <InputPanel sClear={sClear}/>
                </div>
                <div className={style.pump}>
                    <LCD cPresetLCD={cTestLCDPreset} name="dollars"/>
                    <LCD cPresetLCD={cTestLCDPreset} name="liters"/>
                    <NozzlePanel cPriceLCDs={cPriceArr.map(cell => cell.map(v => getLCDStr(v,4)))}
                                 ref="NozzlePanel"/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("viewport"));
