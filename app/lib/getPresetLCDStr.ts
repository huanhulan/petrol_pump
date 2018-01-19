function getPresetLCDStr(v: number|null) {
    if (v === null) return '';
    const str = v.toString();
    if (str.length >= 3) return str + '.00';
    return (new Array(4 - str.length)).join(' ') + str + '.00';
}
export default getPresetLCDStr;