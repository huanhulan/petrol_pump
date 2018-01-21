import * as React from "react";
import {keypadProps, Keys} from "../../../types";
import * as style from "./style.scss";

function Keypad(props: keypadProps) {
    function onClickFactory(key) {
        return () => props.onClick(key);
    }

    return (
        <div className={style.keypad}>
            {
                [
                    Keys.ONE,
                    Keys.TWO,
                    Keys.THREE,
                    Keys.FOUR,
                    Keys.FIVE,
                    Keys.SIX,
                    Keys.SEVEN,
                    Keys.EIGHT,
                    Keys.NINE,
                    Keys.ZERO,
                    Keys.CLEAR,
                ].map((key, index) => (
                        <button className={style.button} onClick={onClickFactory(key)} key={key}>
                            {key === Keys.CLEAR ? Keys[10] : key}
                        </button>
                    ),
                )
            }
        </div>
    );
}

export default Keypad;
