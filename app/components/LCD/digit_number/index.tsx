import * as React from "react";
import digitProps from './interface';
import * as style from './style.scss';

export default function DigitNumber(props: digitProps) {
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
        return digits[props.val][index] ? style['dots-on'] : style['dots-off'];
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 88">
            <g id="digit">
                {points.map((points, index) => (<polygon
                    key={index}
                    className={isDigitOn(index)}
                    points="48 38 44 42 40 38 40 10 44 6 48 10 48 38"/>))}
            </g>
        </svg>
    )
}