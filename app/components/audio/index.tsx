import * as React from "react";
import {delivery, audioProps} from './interface';
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
    playingSource: AudioBufferSourceNode|null;

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
                case delivery.FAST1:
                case delivery.FAST2:
                case delivery.FAST3:
                    this.playSound(nodes[1]);
                    break;
                case delivery.SLOW1:
                case delivery.SLOW2:
                case delivery.SLOW3:
                    this.playSound(nodes[2]);
                    break;
                default:
                    this.stop()
                    break;
            }
        });
        props.sBeep.filterNotNull().listen(u => {
            console.log('BEEP!');
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