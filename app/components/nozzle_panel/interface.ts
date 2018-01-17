import {Cell, CellLoop} from 'sodiumjs';
import {Component} from "react";
import {StreamSink} from 'sodiumjs';
import * as React from "react";

enum UpDown {
    Up = 1,
    Down,
}

interface nozzleProps {
    cPriceLCD: Cell<string>,
    name: string,
    src: string
}

interface nozzleState {
    direction: UpDown
}

interface nozzlePanelInterface {
    cPriceLCDs: Cell<string>[]
}

export {UpDown, nozzleProps, nozzleState, nozzlePanelInterface}