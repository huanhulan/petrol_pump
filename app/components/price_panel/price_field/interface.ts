import {CellSink} from 'sodiumjs'

interface PriceStateInterface {
    price: number
}

interface PricePropsInterface extends PriceStateInterface {
    name: string,
    cPrice: CellSink<number>
}

export {PricePropsInterface, PriceStateInterface};