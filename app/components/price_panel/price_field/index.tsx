import * as React from "react";
import {PricePropsInterface, PriceStateInterface} from './interface';
import * as style from './style.scss';

const parseDbl = v => {
    const tmp = parseFloat(v);
    return isNaN(tmp) ? 0 : tmp;
};


class PriceField extends React.Component<PricePropsInterface,PriceStateInterface> {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price
        };
    }

    onChange(e) {
        let newPrice = parseDbl(e.target.value);

        this.setState({
            price: newPrice
        });
        return this.props.cPrice.send(newPrice);
    };

    render() {
        return (
            <div className={style['price_container']}>
                <label>{this.props.name}</label>
                <input className={style['price_container__input']}
                       type="number"
                       value={this.state.price}
                       onChange={this.onChange.bind(this)}
                       autoComplete="off"/>
            </div>
        );
    }
}

export default PriceField;