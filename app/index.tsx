import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from 'react-modal';
import {Cell, Stream, CellSink, StreamSink, Transaction, CellLoop} from 'sodiumjs';
import * as style from "./style/index.scss";
import getLCDStr from './lib/getLCDStr';
import {PricePanel} from './components/price_panel';
import {NozzlePanel, UpDown} from './components/nozzle_panel';
import Audio from './components/audio';
import LCD from './components/LCD';
import InputPanel from './components/input_panel';
import {Delivery} from './types';
import * as  beepClip from './assets/sounds/beep.wav';
import * as fastRumble from './assets/sounds/fast.wav';
import * as slowRumble from './assets/sounds/slow.wav';

// frp settings
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
const sClear = new Stream<true|null>();
const cDelivery = new CellSink<Delivery>(Delivery.OFF);
const sBeepTest = new StreamSink<true>();
const sKeyClick = new StreamSink<null>();
Transaction.run(() => {
    const cNozzle = new CellLoop<null|UpDown>();
    cNozzle.loop(sKeyClick
        .snapshot(cNozzle, (click, direction) => direction === UpDown.DOWN
            ? UpDown.UP
            : UpDown.DOWN)
        .hold(UpDown.DOWN));
});

// audio settings
const context = new AudioContext();
const pLoadSounds = [beepClip, fastRumble, slowRumble].map(url => {
    return new Promise((resolve, reject) => {
        let soundsBuffer;
        (function (url) {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onload = function () {
                context.decodeAudioData(request.response, function (buffer) {
                    soundsBuffer = buffer;
                    resolve(soundsBuffer);
                }, e => reject(e));
            };
            request.send();
        })(url.toString());// Hack: for typescript type check
    });
});

// main
Promise.all(pLoadSounds).then((soundsBuffer) => {
    class App extends React.Component<{},{}> {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            // Todo: remove test codes
            console.log(this.refs)
            setTimeout(() => {
                cDelivery.send(Delivery.FAST2);
            }, 3000)
            setTimeout(() => {
                cDelivery.send(Delivery.OFF);
            }, 4000)
        }

        render() {
            return (
                <div className={style.app}>
                    <Audio context={context} soundsBuffer={soundsBuffer as AudioBuffer[]} cDelivery={cDelivery}
                           sBeep={sBeepTest}/>
                    <div className={style.header}>
                        <PricePanel prices={prices}/>
                    </div>
                    <div className={style.input}>
                        <InputPanel sClear={sClear} ref="InputPanel"/>
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
});