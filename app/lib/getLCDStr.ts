function getLCDStr(num: number, len: number) {
    let res = '';
    if (isNaN(num) || !num) {
        for (let i = 0; i < len; i++) {
            res += i === 1 ? '.0' : '0'
        }
    } else {
        const tmp = num.toString();
        let dotPos = tmp.indexOf('.');
        let tmpWithoutDot = tmp.split('').filter((str) => str !== '.');
        if (tmpWithoutDot.length >= len) {
            tmpWithoutDot = tmpWithoutDot.slice(0, len);
        } else {
            const margin = len - tmpWithoutDot.length;
            dotPos = tmpWithoutDot.length;
            for (let i = 0; i < margin; i++) {
                tmpWithoutDot.push('0');
            }
        }
        if (dotPos < len && ~dotPos) {
            const start = tmpWithoutDot.slice(0, dotPos);
            const end = tmpWithoutDot.slice(dotPos, len);
            tmpWithoutDot = start.concat(['.'], end);
        }
        res = tmpWithoutDot.join('');
    }
    return res;
}

export default getLCDStr;