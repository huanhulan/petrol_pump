import * as React from "react";
import {keys, keypadProps} from './interface'
import * as style from './style.scss';

export default function (props: keypadProps) {
    function onClickFactory(key) {
        return () => props.onClick(key)
    }

    return (
        <div className={style.keypad}>
            {
                [
                    keys.ONE,
                    keys.TWO,
                    keys.THREE,
                    keys.FOUR,
                    keys.FIVE,
                    keys.SIX,
                    keys.SEVEN,
                    keys.EIGHT,
                    keys.NINE,
                    keys.ZERO,
                    keys.CLEAR
                ].map((key, index) => (
                    <button className={style.button} onClick={onClickFactory(key)} key={key}>
                        {key === keys.CLEAR ? keys[10] : key}
                    </button>)
                )
            }
        </div>
    )
}