import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {nameToString} from "../services/CharacterUtils";

export default class Character extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            order: props.order,
            showDialog: false,
            overwrite: this.calculateOverwrite(props.data)
        }
    }

    componentWillReceiveProps(props) {
        this.setState({data: props.data, order: props.order, overwrite: this.calculateOverwrite(props.data)})
    }

    calculateOverwrite(data) {
        if (data.overwrite) {
            return JSON.parse(JSON.stringify(data.overwrite));
        } else if (data.activeState === 1) {
            return JSON.parse(JSON.stringify(data.male));
        } else if (data.activeState === 2) {
            return JSON.parse(JSON.stringify(data.female));
        } else {
            return {firstName: "", lastName: "", patronymic: ""};
        }
    }

    renderState() {
        if (this.state.data.activeState) {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.props.updateState(this.state.data.id, 0)} className="mr-1">
                        Deaktivovat
                    </Button>
                    <Button variant="info" onClick={() => this.setState({showDialog: true})} className="mr-1">
                        Upravit jméno
                    </Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button variant="primary" onClick={() => this.props.updateState(this.state.data.id, 1)} className="mr-1">
                        Muž
                    </Button>
                    <Button variant="danger" onClick={() => this.props.updateState(this.state.data.id, 2)} className="mr-1">
                        Žena
                    </Button>
                </div>
            )
        }
    }

    getNameStyle(sex, data) {
        if (data.overwrite || (data.activeState !== 0 && data.activeState !== sex)) {
            return "name-inactive";
        } else {
            return "name-normal";
        }
    }

    renderName() {
        if (this.state.data.overwrite) {
            return (
                <div>
                    {nameToString(this.state.data.overwrite)}
                </div>
            )
        } else {
            return (
                <div>
                    <div className={this.getNameStyle(1, this.state.data)}>{nameToString(this.state.data.male)}</div>
                    <div className={this.getNameStyle(2, this.state.data)}>{nameToString(this.state.data.female)}</div>
                </div>
            )
        }
    }

    handleClose() {
        this.setState({showDialog: false})
    }

    updateCustomName(event) {
        const newOverwrite = JSON.parse(JSON.stringify(this.state.overwrite));
        newOverwrite[event.target.id] = event.target.value;
        this.setState({overwrite: newOverwrite});
    }

    submitCustomName() {
        this.props.overwriteName(this.state.data.id, this.state.overwrite);
        this.handleClose();
    }

    renderDialog() {
        return (
            <Modal show={this.state.showDialog} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>Upravit jméno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Křestní jméno</label>
                    <input id="firstName" className="form-control" type="text" value={this.state.overwrite.firstName} onChange={this.updateCustomName.bind(this)}/>

                    <label>Otčestvo</label>
                    <input id="patronymic" className="form-control" type="text" value={this.state.overwrite.patronymic} onChange={this.updateCustomName.bind(this)}/>

                    <label>Přijmení</label>
                    <input id="lastName" className="form-control" type="text" value={this.state.overwrite.lastName} onChange={this.updateCustomName.bind(this)}/>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.submitCustomName.bind(this)}>
                    Uložit
                  </Button>
                </Modal.Footer>
              </Modal>
        )
    }

    render() {
        const rowClass = this.state.order%2 === 1 ? '' : 'odd-row';
        return (
            <div>
                {this.renderDialog()}
                <div className={`row mt-2 justify-content-md-center ${rowClass}`}>
                    <div className="col-md-3">
                        {this.renderState()}
                    </div>
                    <div className="col-md-2">
                        {this.state.data.group}
                    </div>
                    <div className="col-md-7 text-left">
                        {this.renderName()}
                    </div>
                </div>
            </div>
        )
    }
}