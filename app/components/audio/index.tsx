import * as React from "react";
import {Delivery, audioProps, Optional} from '../../types';
import {Operational, Cell} from 'sodiumjs';

function changes(b: Cell<any>) {
    return Operational.updates(b)
        .snapshot(b, (neu, old) => old === neu ? null : neu)
        .filterNotNull();
}

function makeAudioNode(context, buffer, shouldLoop) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = shouldLoop;
    source.connect(context.destination);
    return source;
}

class Audio extends React.Component<audioProps,{}> {
    playingSource: Optional<number>;
    nodes: AudioBufferSourceNode[];

    constructor(props: audioProps) {
        super(props);
        this.playingSource = null;
        this.nodes = props.soundsBuffer.map((buffer, index) => makeAudioNode(props.context, buffer, !!index));
    }

    playBeep() {
        this.nodes[0].start(0);
        const buffer = this.nodes[0].buffer || {duration: 100};
        const timer = setTimeout(() => {
            this.remakeSource(0);
            clearTimeout(timer);
        }, buffer.duration);
    }

    playSound(index) {
        if (this.nodes[index] === null || this.nodes[index].buffer === null) return;
        this.nodes[index].start(0);
        this.playingSource = index;
    }

    stop() {
        const index = this.playingSource;
        if (index === null) return;
        this.nodes[index].stop();
        this.remakeSource(index);
        this.playingSource = null;
    }

    remakeSource(index) {
        this.nodes[index] = makeAudioNode(this.props.context,
            this.props.soundsBuffer[index], !!index);
    }

    componentDidMount() {
        const props = this.props;
        changes(props.cDelivery).listen(d => {
            switch (d) {
                case Delivery.FAST1:
                case Delivery.FAST2:
                case Delivery.FAST3:
                    this.playSound(1);
                    break;
                case Delivery.SLOW1:
                case Delivery.SLOW2:
                case Delivery.SLOW3:
                    this.playSound(2);
                    break;
                default:
                    this.stop();
                    break;
            }
        });
        props.sBeep.listen(u => {
            this.playBeep();
        });
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return null;
    }
}

export default Audio;