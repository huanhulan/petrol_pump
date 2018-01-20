function getPresetLCDStr(v: number|null) {
    if (v === null) return '';
    const str = v.toFixed(2);
    if (str.length >= 3) return str;
    return (new Array(4 - str.length)).join(' ') + str;
}
export default getPresetLCDStr;