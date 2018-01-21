import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from 'react-modal';
import App from './app';
import pump from './pump';
import {Delivery} from './types';
import * as  beepClip from './assets/sounds/beep.wav';
import * as fastRumble from './assets/sounds/fast.wav';
import * as slowRumble from './assets/sounds/slow.wav';

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
// fuel pulses
const fastPulse = 40;
const slowPulse = 2;

// main
Promise.all(pLoadSounds).then((soundsBuffer: AudioBuffer[]) => {
    const {
        sClicks,
        cNozzles,
        cPriceLCDs,
        prices,
        // sNozzle1,
        // sNozzle2,
        // sNozzle3,
        sKeypad,
        sFuelPulses,
        cCalibration,
        sClearSale,
        cDelivery,
        cPresetLCD,
        cSaleCostLCD,
        cSaleQuantityLCD,
        sBeep,
        sSaleComplete,
        csClearSale,
        cValue
    } = pump();

    (function getPulse() {
        const timer = setTimeout(() => {
            switch (cDelivery.sample()) {
                case Delivery.FAST1:
                case Delivery.FAST2:
                case Delivery.FAST3:
                    sFuelPulses.send(fastPulse);
                    break;
                case Delivery.SLOW1:
                case Delivery.SLOW2:
                case Delivery.SLOW3:
                    sFuelPulses.send(slowPulse);
                    break;
                case Delivery.OFF:
                default:
                    sFuelPulses.send(0);
                    break;
            }
            clearTimeout(timer);
            getPulse();
        }, 200);
    })();
    ReactModal.setAppElement('#viewport');
    ReactDOM.render(<App
            context={context}
            soundsBuffer={soundsBuffer}
            cDelivery={cDelivery}
            prices={prices}
            sClear={sClearSale}
            cValue={cValue}
            sBeep={sBeep}
            cPresetLCD={cPresetLCD}
            sKeypad={sKeypad}
            cSaleCostLCD={cSaleCostLCD}
            cSaleQuantityLCD={cSaleQuantityLCD}
            cPriceLCDs={cPriceLCDs}
            sClicks={sClicks}
            cNozzles={cNozzles}
            csClearSale={csClearSale}
            sSaleComplete={sSaleComplete}
        />,
        document.getElementById("viewport"));
});