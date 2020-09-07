import * as React from "react";
import { nameToString, getActiveName } from "../services/CharacterUtils";
import { findCharacterFromGroup, findCharacterFromAll, addAccusation } from "../services/AccusationUtils";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default class AccusationList extends React.Component {

    constructor(props) {
        super(props);

        this.groupList = this.findGroups(props.data);

        this.state = {
            data: props.data,
            accusationType: 2,
            group: this.groupList[0],
            characterId: -1,
            showDialog: false,
            characterIdToAccuse: null,
            accusationHolder: {}
        }
    }

    componentWillReceiveProps(props) {
        this.setState({data: props.data})
    }

    findGroups(data) {
        const groups = [];
        data.forEach(char => {
            if (!groups.includes(char.group)) {
                groups.push(char.group)
            }
        })

        return groups;
    }

    confirmAccusation() {
        const newHolder = addAccusation(this.state.accusationHolder, this.state.characterIdToAccuse, this.state.accusationType !== 3)
        this.setState({showDialog: false, accusationHolder: newHolder});
    }

    findCharacterToAccuse() {
        let foundId = 0;
        switch (this.state.accusationType) {
            case 1:
                foundId = findCharacterFromAll(this.state.data, this.state.accusationHolder);
                break;
            case 2:
                foundId = findCharacterFromGroup(this.state.data, this.state.accusationHolder, this.state.group);
                break;
            case 3:
                foundId = this.state.characterId;
                break;
            default:
                throw new Error("Unknown type " + this.state.accusationType);
        }
        if (foundId > 0) {
            this.setState({showDialog: true, characterIdToAccuse: foundId})
        } else {
            alert("Nepodařilo se najít žádnou odpovídající postavu. Nejprve se musí aktivovat postavy pro daná kritéria.")
        }
    }

    renderGroupSelect() {
        if (this.state.accusationType === 2) {
            return (
                <div className="form-group">
                    <label>Skupina</label>
                    <select className="form-control" value={this.state.group} onChange={(event) => this.setState({group: event.target.value})}>
                        {this.groupList.map((group, i) => {
                            return <option value={group} key={i}>{group}</option>
                        })}
                    </select>
                </div>
            )
        }
    }

    renderCharacterSelect() {
        if (this.state.accusationType === 3) {
            const dataToPrint = JSON.parse(JSON.stringify(this.state.data.filter(char => char.activeState > 0)));
            dataToPrint.sort((a, b) => nameToString(getActiveName(a)).localeCompare(nameToString(getActiveName(b))));

            return (
                <div className="form-group">
                    <label>Postava</label>
                    <select className="form-control" value={this.state.characterId} onChange={(event) => this.setState({characterId: parseInt(event.target.value)})}>
                        <option value="-1">----</option>
                        {dataToPrint.map((char, i) => {
                            return <option value={char.id} key={i}>{nameToString(getActiveName(char))}</option>
                        })}
                    </select>
                </div>
            )
        }
    }

    renderForm() {
        return (
            <div className="w-50 m-auto">
                <div className="form-group">
                    <label>Typ zacílení</label>
                    <select className="form-control" value={this.state.accusationType} onChange={(event) => this.setState({accusationType: parseInt(event.target.value)})}>
                        <option value="1">Náhodně ze všech</option>
                        <option value="2">Náhodně ze skupiny</option>
                        <option value="3">Konkrétní jméno</option>
                    </select>
                </div>
                {this.renderGroupSelect()}
                {this.renderCharacterSelect()}
                <Button variant="primary" onClick={this.findCharacterToAccuse.bind(this)} className="mt-2">
                    Obvinit
                </Button>
            </div>
        )
    }

    renderAccusation(accusations, id) {
        const char = this.state.data.find(char => char.id === id);
        return (
            <div className="row">
                <div className="col-md-4 font-weight-bold">
                    {nameToString(getActiveName(char))}
                </div>
                <div className="col-md-2">
                    {char.group}
                </div>
                <div className="col-md-3">
                    {accusations.random}
                </div>
                <div className="col-md-3">
                    {accusations.direct}
                </div>
            </div>
        )
    }

    renderList() {
        return (
            <div className="w-75 m-auto">
                <div className="row justify-content-md-center">
                    <div className="col-md-4 font-weight-bold">
                        Jméno
                    </div>
                    <div className="col-md-2 font-weight-bold">
                        Skupina
                    </div>
                    <div className="col-md-3 font-weight-bold">
                        Náhodná obvinění
                    </div>
                    <div className="col-md-3 font-weight-bold">
                        Přímá obvinění
                    </div>
                </div>
                {
                    this.state.data.filter(char => char.activeState > 0 && this.state.accusationHolder[char.id]).map((char, i) => {
                        return this.renderAccusation(this.state.accusationHolder[char.id], char.id)
                    })
                }
            </div>
        )
    }

    renderDialog() {
        if (this.state.showDialog) {
            const char = this.state.data.find(char => char.id === this.state.characterIdToAccuse);
            return (
                <Modal show={this.state.showDialog} onHide={() => this.setState({showDialog: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Vybrané obvinění</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Postava k obvinění: {nameToString(getActiveName(char))} ({char.group})
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.confirmAccusation.bind(this)}>
                            Potvrdit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

    render() {
        return (
            <div className="mt-3">
                {this.renderDialog()}
                <h3>Generátor obvinění</h3>
                {this.renderForm()}
                <h3 className="mt-4">Seznam vydaných obvinění</h3>
                {this.renderList()}
            </div>
        );
    }
}