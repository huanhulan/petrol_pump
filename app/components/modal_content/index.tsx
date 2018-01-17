import * as React from "react";
import modalProps from './interface';

export default function (props: modalProps) {
    return (
        <div>
            <table>
                <tr>
                    <td>Fuel</td>
                    <td>{props.fuleType}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>{props.fulePrice}</td>
                </tr>
                <tr>
                    <td>Dollars Delivered</td>
                    <td>{props.dollarsDelivered}</td>
                </tr>
                <tr>
                    <td>Liters Delivered</td>
                    <td>{props.litersDelivered}</td>
                </tr>
            </table>
        </div>
    );
}