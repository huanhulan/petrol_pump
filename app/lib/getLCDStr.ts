function getLCDStr(v: number|null, toFixed = 3) {
    if (v === null) {
        return "";
    }
    const str = v.toFixed(toFixed);
    if (str.length >= 3) {
        return str;
    }
    return (new Array(4 - str.length)).join(" ") + str;
}

export default getLCDStr;
