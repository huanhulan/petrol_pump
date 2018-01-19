import {Dot, DigitNumber} from './digit_number';
import * as React from "react";
import {LCDPropsInterface, LCDState} from '../../types'
import * as style from './style.scss';

const digitWidth = 48;
const digitHeight = 88;
const dotWidth = 8;

class LCD extends React.Component<LCDPropsInterface,LCDState> {
    constructor(props) {
        super(props);
        this.state = {
            val: props.cPresetLCD.sample()
        };
    }

    componentDidMount() {
        this.props.cPresetLCD.listen(str => this.setState({val: str}));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextState.val === this.state.val);
    }

    render() {
        const getDigitX = index => index * digitWidth + (index + 1) * dotWidth * 2;
        const dotIndex = this.state.val.split('').findIndex(str => str === '.');
        const numArr = this.state.val.split('').filter(str => str !== '.');

        const getWidth = () => {
            const hasDot = !!~dotIndex;
            const len = hasDot ? this.state.val.length - 1 : this.state.val.length;
            return getDigitX(len);
        };


        return (
            <div className={style['LCD-container']}>
                <svg viewBox={`0 0 ${getWidth()} ${digitHeight}`}
                     preserveAspectRatio="xMidYMid meet"
                     className={style['LCD-panel']}
                     width={`${getWidth()}px`}
                     height={`${digitHeight}px`}>
                    {~dotIndex ? <Dot x={getDigitX(dotIndex)-12} y={80}/> : null}
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
                <p className={style['LCD-title']}>{String.prototype.toUpperCase.call(this.props.name)}</p>
            </div>

        )
    }
}

export default LCD;