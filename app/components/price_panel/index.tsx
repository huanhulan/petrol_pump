import PriceField from './price_field';
import * as React from "react";
import * as style from './style.scss';
import {pricePanelPropsInterface} from '../../types'

function PricePanel(props: pricePanelPropsInterface) {
    return (
        <div className={style.pricePanel}>
            {props.prices.map(
                ({name, cPrice}, index) => (
                    <PriceField
                        name={name}
                        key={index}
                        cPrice={cPrice}
                    />
                )
            )}
        </div>
    )
}

export default PricePanel;