import * as React from "react";
import {pricePropsInterface, priceStateInterface} from '../../../types';
import * as style from './style.scss';

const parseDbl = v => {
    const tmp = parseFloat(v);
    return isNaN(tmp) ? 0 : tmp;
};


class PriceField extends React.Component<pricePropsInterface,priceStateInterface> {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price
        };
    }

    componentDidMount() {
        this.props.cPrice.listen(v => this.setState({price: v}));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextState.price === this.state.price);
    }

    onChange(e) {
        let newPrice = parseDbl(e.target.value);

        return this.props.cPrice.send(newPrice);
    };

    render() {
        return (
            <div className={style['price_container']}>
                <label>{this.props.name}</label>
                <input className={style['price_container__input']}
                       type="text"
                       value={this.state.price}
                       onChange={this.onChange.bind(this)}
                       autoComplete="off"/>
            </div>
        );
    }
}

export default PriceField;