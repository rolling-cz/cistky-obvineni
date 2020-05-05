module.exports.nameToString = (name) => {
    let nameToPrint = name.lastName + ', ' + name.firstName

    if (name.patronymic) {
        nameToPrint += ' ' + name.patronymic;
    }

    return nameToPrint;
}

module.exports.getActiveName = (character) => {
    if (character.activeState === 0) {
        return {firstName: "", lastName: "", patronymic: ""}
    }

    if (character.overwrite) {
        return character.overwrite;
    } else if (character.activeState === 1) {
        return character.male;
    } else {
        return character.female;
    }
}