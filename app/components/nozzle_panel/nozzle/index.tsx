import * as React from "react";
import {nozzleProps, nozzleState, UpDown} from "../../../types";
import LCD from "./../../LCD";
import * as style from "./style.scss";

class Nozzle extends React.Component<nozzleProps, nozzleState> {
    constructor(props: nozzleProps) {
        super(props);
        this.state = {
            direction: this.props.cNozzle.sample(),
        };
    }

    public componentDidMount() {
        this.props.cNozzle.listen(direction => {
            this.setState({direction});
        });
    }

    public shouldComponentUpdate(nextProps, nextState) {
        return nextState.direction !== this.state.direction;
    }

    public render() {
        return (
            <div className={style.nozzle}>
                <LCD name={this.props.name} cPresetLCD={this.props.cPriceLCD}/>
                <button className={[style.nozzleButton, this.state.direction === UpDown.UP ? style.lifted : ""]
                .join(" ")}
                        onClick={this.onclick.bind(this)}>
                    <img src={this.props.src} alt={this.props.name} className={style.nozzleImg}/>
                </button>
            </div>
        );
    }

    private onclick() {
        this.props.sClick.send(this.state.direction === UpDown.UP ? UpDown.DOWN : UpDown.UP);
    }
}

export default Nozzle;
