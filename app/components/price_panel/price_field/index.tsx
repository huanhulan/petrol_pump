import * as React from "react";
import {IPricePropsInterface, IPriceStateInterface} from "../../../types";
import * as style from "./style.scss";

const parseDbl = v => {
    const tmp = parseFloat(v);
    return isNaN(tmp) ? 0 : tmp;
};

class PriceField extends React.Component<IPricePropsInterface, IPriceStateInterface> {
    constructor(props) {
        super(props);
        this.state = {
            price: props.cPrice.sample(),
        };
    }

    public componentDidMount() {
        this.props.cPrice.listen(v => this.setState({price: v}));
    }

    public shouldComponentUpdate(nextProps, nextState) {
        return !(nextState.price === this.state.price);
    }

    public render() {
        return (
            <div className={style.priceContainer}>
                <label>{this.props.name}</label>
                <input className={style.priceContainerInput}
                       type="text"
                       value={this.state.price}
                       onChange={this.onChange.bind(this)}
                       autoComplete="off"/>
            </div>
        );
    }

    private onChange(e) {
        return this.props.cPrice.send(parseDbl(e.target.value));
    }
}

export default PriceField;
