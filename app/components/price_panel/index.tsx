import PriceField from './price_field';
import * as React from "react";
import * as style from './style.scss';

function PricePanel(props) {
    return (
        <div className={style['price-panel']}>
            {props.prices.map(
                ({name, price, cPrice}, index) => (
                    <PriceField
                        name={name}
                        key={index}
                        price={price}
                        cPrice={cPrice}
                    />
                )
            )}
        </div>
    )
}

export {PricePanel};