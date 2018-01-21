import * as React from "react";
import {pricePanelPropsInterface} from "../../types";
import PriceField from "./price_field";
import * as style from "./style.scss";

export default function PricePanel(props: pricePanelPropsInterface) {
    return (
        <div className={style.pricePanel}>
            {props.prices.map(
                ({name, cPrice}, index) => (
                    <PriceField
                        name={name}
                        key={index}
                        cPrice={cPrice}
                    />
                ),
            )}
        </div>
    );
}
