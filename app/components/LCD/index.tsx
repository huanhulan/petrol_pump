import * as React from "react";
import {ILCDPropsInterface, ILCDState} from "../../types";
import {DigitNumber, Dot} from "./digit_number";
import * as style from "./style.scss";

const digitWidth = 48;
const digitHeight = 88;
const dotWidth = 8;

class LCD extends React.Component<ILCDPropsInterface, ILCDState> {
    constructor(props) {
        super(props);
        this.state = {
            val: props.cPresetLCD.sample(),
        };
    }

    public componentDidMount() {
        this.props.cPresetLCD.listen(str => this.setState({val: str}));
    }

    public shouldComponentUpdate(nextProps, nextState) {
        return !(nextState.val === this.state.val);
    }

    public render() {
        const getDigitX = index => index * digitWidth + (index + 1) * dotWidth * 2;
        const dotIndex = this.state.val.split("").findIndex(str => str === ".");
        const numArr = this.state.val.split("").filter(str => str !== ".");

        const getWidth = () => {
            const hasDot = !!~dotIndex;
            const len = hasDot ? this.state.val.length - 1 : this.state.val.length;
            return getDigitX(len);
        };

        return (
            <div className={style.lcdContainer}>
                <svg viewBox={`0 0 ${getWidth()} ${digitHeight}`}
                     preserveAspectRatio="xMidYMid meet"
                     className={style.lcdPanel}
                     width={`${getWidth()}px`}
                     height={`${digitHeight}px`}>
                    {~dotIndex ? <Dot x={getDigitX(dotIndex) - 18} y={80}/> : null}
                    {
                        numArr.map((str, index) => {
                            return (
                                <g transform="skewX(-3)" key={index}>
                                    <DigitNumber val={+str} x={getDigitX(index)} y={0}/>
                                </g>
                            );
                        })
                    }
                </svg>
                <p className={style.lcdTitle}>{String.prototype.toUpperCase.call(this.props.name)}</p>
            </div>
        );
    }
}

export default LCD;
