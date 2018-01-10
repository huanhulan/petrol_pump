import * as React from "react";
import * as ReactDOM from "react-dom";
import * as style from "./style/index.scss";
import {cPriceArr, PricePanel} from './components/price_panel';

const App = () => (
    <div className={style.app}>
        <div className={style.header}>
            <PricePanel/>
        </div>
        <div className={style.keypad}/>
        <div className={style.pump}/>
    </div>
);
ReactDOM.render(<App />, document.getElementById("viewport"));
