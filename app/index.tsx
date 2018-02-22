import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from "react-modal";
import * as modernizrConfig from "./../.modernizrrc.json";
import App from "./app";
import * as  beepClip from "./assets/sounds/beep.wav";
import * as fastRumble from "./assets/sounds/fast.wav";
import * as slowRumble from "./assets/sounds/slow.wav";
import pump from "./pump";
import {Delivery} from "./types";

const modernizr = modernizrConfig;
const features = ["cssvhunit", "cssgrid", "flexbox", "webaudio", "promises"];
const supports = features.map(f => modernizr[f]);
const $app = document.getElementById("viewport");
// fuel pulses
const fastPulse = 40;
const slowPulse = 2;

window.onload = () => {
    if (!$app) {
        return;
    }
    if (supports.filter(support => !support).length) {
        const notSupports = supports.reduce((tupple, support, index) => {
            if (!support) {
                tupple.push(features[index]);
            }
            return tupple;
        }, []).join(", ");
        $app.innerHTML = `Your browser does not support: ${notSupports}.`
            + "Please use modern browsers like Chrome to get the best user experience.";
        return;
    }
    // audio settings
    const context = new AudioContext();
    const pLoadSounds = [beepClip, fastRumble, slowRumble].map(soundUrl => {
        return new Promise((resolve, reject) => {
            let soundsBuffer;
            (url => {
                const request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";
                request.onload = () => {
                    context.decodeAudioData(request.response, buffer => {
                        soundsBuffer = buffer;
                        resolve(soundsBuffer);
                    }, e => reject(e));
                };
                request.send();
            })(soundUrl.toString()); // Hack: for typescript type check
        });
    });

    // main
    Promise.all(pLoadSounds).then((soundsBuffer: AudioBuffer[]) => {
        const {
            sClicks,
            cNozzles,
            cPriceLCDs,
            prices,
            sKeypad,
            sFuelPulses,
            sClearSale,
            cDelivery,
            cPresetLCD,
            cSaleCostLCD,
            cSaleQuantityLCD,
            sBeep,
            sStrat,
            sSaleComplete,
            csClearSale,
            cValue,
        } = pump();

        sStrat.listen(function getPulse() {
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
            sSaleComplete.listen(() => clearTimeout(timer));
        });

        ReactModal.setAppElement("#viewport");
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
            $app);
    });
};
