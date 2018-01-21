import * as React from "react";
import * as ReactModal from "react-modal";
import {StreamSink, Unit} from "sodiumjs";
import Audio from "./components/audio";
import InputPanel from "./components/input_panel";
import LCD from "./components/LCD";
import ModalContent from "./components/modal_content";
import NozzlePanel from "./components/nozzle_panel";
import PricePanel from "./components/price_panel";
import {Fuel, appPropsInterface, appStateInterface, saleInterface} from "./types";
import * as style from "./style/index.scss";

class App extends React.Component<appPropsInterface, appStateInterface> {
    private sCloseModal: StreamSink<Unit>;

    constructor(props) {
        super(props);
        this.state = {isModalOpen: false, sale: null};
        this.props.sSaleComplete.listen((sale: saleInterface) => {
            this.setState({
                isModalOpen: true,
                sale,
            });
        });
        this.sCloseModal = this.props.csClearSale.sample() as StreamSink<Unit>;
    }

    private closeModal() {
        this.sCloseModal.send(Unit.UNIT);
        this.props.csClearSale.send(this.sCloseModal);
        this.setState({
            isModalOpen: false,
            sale: null,
        });
    }

    private render() {
        return (
            <div className={style.app}>
                <ReactModal
                    isOpen={this.state.isModalOpen}
                    portalClassName={`${style.modalPortal} ${this.state.isModalOpen ? style.active : ""}`}
                    overlayClassName={`${style.modalOverlay} ${this.state.isModalOpen ? style.active : ""}`}
                    className={`${style.modal} ${style.active}`}
                    shouldFocusAfterRender={true}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    role="dialog"
                    parentSelector={() => document.body}>
                    <a className={style.closeModal} onClick={this.closeModal.bind(this)}>
                        <svg viewBox="0 0 20 20" className={style.closeModalSvg}>
                            <path fill="#000000"
                                  d="M15.898,\
                                  4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,\
                                  4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,\
                                  0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,\
                                  0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,\
                                  0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,\
                                  4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,\
                                  0.492-0.203c0.273-0.273,0.273-0.715,\
                                  0-0.986l-4.711-4.711l4.711-4.711C16.172,\
                                  4.759,16.172,4.317,15.898,4.045z"/>
                        </svg>
                    </a>
                    {this.state.sale !== null
                        ? (<ModalContent fuelType={Fuel[(this.state.sale as saleInterface).fuel]}
                                         fuelPrice={(this.state.sale as saleInterface).price.toFixed(3)}
                                         dollarsDelivered={(this.state.sale as saleInterface).cost.toFixed(2)}
                                         litersDelivered={(this.state.sale as saleInterface).quantity.toFixed(2)}/>)
                        : null}
                </ReactModal>
                <Audio context={this.props.context} soundsBuffer={this.props.soundsBuffer}
                       cDelivery={this.props.cDelivery}
                       sBeep={this.props.sBeep}/>
                <div className={style.header}>
                    <PricePanel prices={this.props.prices}/>
                </div>
                <div className={style.input}>
                    <InputPanel sClear={this.props.sClear}
                                cActive={this.props.cActive}
                                cValue={this.props.cValue}
                                sBeep={this.props.sBeep}
                                cPresetLCD={this.props.cPresetLCD}
                                sKeypad={this.props.sKeypad}/>
                </div>
                <div className={style.pump}>
                    <div className={style.dollars}>
                        <LCD cPresetLCD={this.props.cSaleCostLCD} name="dollars"/>
                    </div>
                    <div className={style.liters}>
                        <LCD cPresetLCD={this.props.cSaleQuantityLCD} name="liters"/>
                    </div>
                    <NozzlePanel cPriceLCDs={this.props.cPriceLCDs}
                                 sClicks={this.props.sClicks}
                                 cNozzles={this.props.cNozzles}/>
                </div>
            </div>
        );
    }
}

export default App;
