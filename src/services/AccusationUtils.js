module.exports.findCharacterFromGroup = (data, accusationHolder, group) => {
    let min = Number.MAX_SAFE_INTEGER
    data.filter(char => char.activeState > 0 && char.group === group).forEach(char => {
        min = Math.min(min, getNumberOfRandomAccusations(char.id, accusationHolder));
    })

    const possibleCharIds = data
        .filter(char => char.activeState > 0 && char.group === group && getNumberOfRandomAccusations(char.id, accusationHolder) === min)
        .map(char => char.id);

    return possibleCharIds[getRandomInt(possibleCharIds.length)];
}

module.exports.findCharacterFromAll = (data, accusationHolder) => {
    let min = Number.MAX_SAFE_INTEGER
    data.filter(char => char.activeState > 0).forEach(char => {
        min = Math.min(min, getNumberOfRandomAccusations(char.id, accusationHolder));
    })

    const possibleCharIds = data
        .filter(char => char.activeState > 0 && getNumberOfRandomAccusations(char.id, accusationHolder) === min)
        .map(char => char.id);

    return possibleCharIds[getRandomInt(possibleCharIds.length)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getNumberOfRandomAccusations(charId, accusationHolder) {
    if (!accusationHolder[charId]) {
        return 0
    } else {
        return accusationHolder[charId].random;
    }
}

module.exports.addAccusation = (accusationHolder, charId, isRandom) => {
    const newHolder = JSON.parse(JSON.stringify(accusationHolder));
    if (!newHolder[charId]) {
        newHolder[charId] = {
            "random": 0,
            "direct": 0
        }
    }

    isRandom ? newHolder[charId].random++ : newHolder[charId].direct++;
    return newHolder
}