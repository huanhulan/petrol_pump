import * as React from "react";
import Nozzle from "./nozzle";
import * as nozzle1PNG from "./../../assets/images/nozzle1.png";
import * as nozzle2PNG from "./../../assets/images/nozzle2.png";
import * as nozzle3PNG from "./../../assets/images/nozzle3.png";
import * as style from './style.scss';
import {nozzlePanelProps, nozzleProps} from "../../types";

class NozzlePanel extends React.Component<nozzlePanelProps,{}> {
    private nozzles: nozzleProps[];

    constructor(props) {
        super(props);
        const srcs = [nozzle1PNG, nozzle2PNG, nozzle3PNG];
        this.nozzles = ['FUEL1', 'FUEL2', 'FUEL3'].map((name, index) => {
            return {
                name,
                src: srcs[index].toString(),
                cNozzle: this.props.cNozzles[index],
                sClick: this.props.sClicks[index],
                cPriceLCD: this.props.cPriceLCDs[index]
            }
        });
    }

    render() {
        return (
            <div className={style.nozzlePanel}>
                {
                    this.nozzles.map(({name, src, cNozzle, sClick, cPriceLCD}, index) => (
                        <div className={style.nozzleContainer} key={index}>
                            <Nozzle
                                sClick={sClick}
                                cPriceLCD={cPriceLCD}
                                cNozzle={cNozzle}
                                name={name}
                                src={src}/>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default NozzlePanel;