function calculateSMA(data, period) {
    let smaValues = [];
    for (let i = 0; i <= data.length - period; i++) {
        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i + j];
        }
        smaValues.push(sum / period);
    }
    return smaValues;
}

module.exports = { calculateSMA };
