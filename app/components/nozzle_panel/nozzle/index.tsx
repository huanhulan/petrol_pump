import * as React from "react";
import {UpDown, nozzleProps, nozzleState} from './../interface';
import {Transaction, StreamSink, CellLoop} from 'sodiumjs';
import LCD from './../../LCD';
import * as style from './style.scss';

class Nozzle extends React.Component<nozzleProps,nozzleState> {
    private sClick = new StreamSink<null>();
    public cNozzle;

    constructor(props: nozzleProps) {
        super(props);
        Transaction.run(() => {
            this.cNozzle = new CellLoop<null|UpDown>();
            this.cNozzle.loop(this.sClick
                .snapshot(this.cNozzle, (click, direction) => direction === UpDown.Down
                    ? UpDown.Up
                    : UpDown.Down)
                .hold(UpDown.Down));
        });
        this.state = {
            direction: this.cNozzle.sample()
        };
    }

    componentDidMount() {
        this.cNozzle.listen((direction) => {
            this.setState({direction});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.direction !== this.state.direction;
    }

    onclick() {
        this.sClick.send(null);
    };

    render() {
        return (
            <div className={style.nozzle}>
                <LCD name={this.props.name} cPresetLCD={this.props.cPriceLCD}/>
                <button className={[style['nozzle-button'],this.state.direction===UpDown.Up?style.lifed:''].join(' ')}
                        onClick={this.onclick.bind(this)}>
                    <img src={this.props.src} alt={this.props.name} className={style['nozzle-img']}/>
                </button>
            </div>
        )
    }
}

export default Nozzle;