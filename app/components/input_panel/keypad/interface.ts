import {Stream, Cell} from  'sodiumjs'
enum keys{
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    CLEAR
}

interface keypadProps {
    onClick: (keys) => any
}

export {keys, keypadProps};