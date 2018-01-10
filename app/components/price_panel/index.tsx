import PriceField from './price_field';
import * as React from "react";
import {PricePropsInterface} from './price_field/interface'
import {CellSink} from 'sodiumjs';
import * as style from './style.scss';

const pricePropsFactory = ({name, price}) => {
    return {
        name,
        price,
        cPrice: new CellSink(price)
    }
};

const prices: PricePropsInterface[] = [{
    name: 'price1',
    price: 2.149,
}, {
    name: 'price2',
    price: 2.341,
}, {
    name: 'price3',
    price: 1.499,
}].map(conf => pricePropsFactory(conf));

const cPriceArr = prices.map(price => price.cPrice);

function PricePanel() {
    return (
        <div className={style['price_panel']}>
            {prices.map(
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

export {cPriceArr, PricePanel};