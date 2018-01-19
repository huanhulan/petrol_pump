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
    playingSource: Optional<AudioBufferSourceNode>;

    constructor(props: audioProps) {
        super(props);
        this.playingSource = null;
    }

    playSound(source) {
        source.start(0);
        this.playingSource = source;
    }

    stop() {
        if (!this.playingSource) return;
        this.playingSource.stop();
        this.playingSource = null;
    }

    componentDidMount() {
        const props = this.props;
        const nodes = props.soundsBuffer.map((buffer, index) => makeAudioNode(props.context, buffer, !!index));
        changes(props.cDelivery).listen(d => {
            switch (d) {
                case Delivery.FAST1:
                case Delivery.FAST2:
                case Delivery.FAST3:
                    this.playSound(nodes[1]);
                    break;
                case Delivery.SLOW1:
                case Delivery.SLOW2:
                case Delivery.SLOW3:
                    this.playSound(nodes[2]);
                    break;
                default:
                    this.stop();
                    break;
            }
        });
        props.sBeep.listen(u => {
            this.playSound(nodes[0]);
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