import * as style from "./style/index.scss";
// const style = require("./style/index.scss");
import * as React from "react";
import * as ReactDOM from "react-dom";

const App = () => (
  <div className={style.app}>
    <div className={style.header} />
    <div className={style.keypad} />
    <div className={style.pump} />
  </div>
);
ReactDOM.render(<App />, document.getElementById("viewport"));
