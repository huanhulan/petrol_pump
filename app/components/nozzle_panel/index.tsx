import * as React from "react";
import Nozzle from "./nozzle";
import * as nozzle1PNG from "./../../assets/images/nozzle1.png";
import * as nozzle2PNG from "./../../assets/images/nozzle2.png";
import * as nozzle3PNG from "./../../assets/images/nozzle3.png";
import * as style from './style.scss';
import {nozzlePanelInterface} from "./interface";

const srcs = [nozzle1PNG, nozzle2PNG, nozzle3PNG];
const nozzles = ['FUEL1', 'FUEL2', 'FUEL3'].map((name, index) => {
    return {
        name,
        src: srcs[index].toString()
    }
});

class NozzlePanel extends React.Component<nozzlePanelInterface,{}> {
    private nozzleComponents;
    public cNozzles;

    constructor(props) {
        super(props);
        this.nozzleComponents = nozzles.map(({name, src}, index) => {
            return new Nozzle({
                name,
                src,
                cPriceLCD: this.props.cPriceLCDs[index]
            })
        });
    }

    componentDidMount() {
        this.cNozzles = [0, 1, 2].map((num) => {
            return (this.refs[`Nozzle${num}`] as Nozzle).cNozzle
        })
    }

    render() {
        return (
            <div className={style['nozzle-panel']}>
                {
                    nozzles.map(({name, src}, index) => (
                        <div className={style['nozzle-container']} key={index}>
                            <Nozzle
                                name={name}
                                src={src}
                                cPriceLCD={this.props.cPriceLCDs[index]} ref={`Nozzle${index}`}/>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export {
    NozzlePanel
}