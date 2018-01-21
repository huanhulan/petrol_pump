import * as React from "react";
import {svgPropsInterface, digitPropsInterface} from '../../../types';
import * as style from './style.scss';

function DigitNumber(props: digitPropsInterface) {
    const digits = [
        [1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 0],
        [1, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0]
    ];
    const points = [
        "48 38 44 42 40 38 40 10 44 6 48 10 48 38",
        "38 0 42 4 38 8 10 8 6 4 10 0 38 0",
        "8 38 4 42 0 38 0 10 4 6 8 10 8 38",
        "38 40 42 44 38 48 10 48 6 44 10 40 38 40",
        "48 78 44 82 40 78 40 50 44 46 48 50 48 78",
        "38 80 42 84 38 88 10 88 6 84 10 80 38 80",
        "8 78 4 82 0 78 0 50 4 46 8 50 8 78"
    ];

    const isDigitOn = (index) => {
        return digits[props.val] && digits[props.val][index]
            ? style.dotsOn
            : style.dotsOff;
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 48 88"
             width="48px"
             height="88px"
             x={`${props.x}px`}
             y={`${props.y}px`}>
            {points.map((point, index) => {
                return (<polygon
                    key={index}
                    className={isDigitOn(index)}
                    points={points[index]}/>)
            })}
        </svg>
    )
}

function Dot(props: svgPropsInterface) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width="8px"
             height="8px"
             x={`${props.x}px`}
             y={`${props.y}px`}
             viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" className={style.dotsOn}/>
        </svg>
    )
}

export {Dot, DigitNumber}