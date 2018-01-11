import DigitNumber from './digit_number';
import * as React from "react";
import {LCDPropsInterface, LCDState} from './interface'

class LCD extends React.Component<LCDPropsInterface,LCDState> {
    constructor(props) {
        super(props);
        this.state = {
            val: props.cPresetLCD.sample().toString()
        };
    }

    componentDidMount() {
        this.props.cPresetLCD.listen(text => this.setState({val: text}));
    }

    render() {
        return (
            <div>
                <svg>

                </svg>
                <p>{this.props.name}</p>
            </div>

        )
    }
}

export default LCD;