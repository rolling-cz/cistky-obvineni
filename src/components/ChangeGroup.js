import * as React from "react";
import {getActiveName, listGroups, nameToString} from "../services/CharacterUtils";
import Button from "react-bootstrap/Button";

export default class ChangeGroup extends React.Component {

    constructor(props) {
        super(props);

        this.groupList = listGroups(props.data);

        this.state = {
            group: -1,
            characterId: -1,
            data: props.data
        }
    }

    componentWillReceiveProps(props) {
        this.setState({data: props.data})
    }

    changeGroup() {
        this.props.updateGroup(this.state.characterId, this.state.group);
    }

    selectCharacter(event) {
        const characterId =  parseInt(event.target.value);
        const char = this.state.data.find(char => char.id === characterId);

        this.setState({characterId:characterId, group: char.group})
    }

    renderCharacterList() {
        const dataToPrint = JSON.parse(JSON.stringify(this.state.data.filter(char => char.activeState > 0)));
        dataToPrint.sort((a, b) => nameToString(getActiveName(a)).localeCompare(nameToString(getActiveName(b))));

        return (

            <select className="form-control" value={this.state.characterId}
                    onChange={this.selectCharacter.bind(this)}>
                <option value="-1">----</option>
                {dataToPrint.map((char, i) => {
                    return <option value={char.id} key={i}>{nameToString(getActiveName(char))}</option>
                })}
            </select>
        )
    }

    renderGroupList() {
        if (this.state.characterId >= 0) {
            return (
                <select className="form-control" value={this.state.group}
                        onChange={(event) => this.setState({group: event.target.value})}>
                    {this.groupList.map((group, i) => {
                        return <option value={group} key={i}>{group}</option>
                    })}
                </select>
            )
        }
    }

    renderSubmit() {
        if (this.state.characterId >= 0) {
            const char = this.state.data.find(char => char.id === this.state.characterId);
            if (char &&  char.group !== this.state.group) {
                return (
                    <Button variant="primary" onClick={this.changeGroup.bind(this)} className="mt-2">
                        Přesunout
                    </Button>
                )
            }
        }
    }

    render() {

        return (
            <div className="mt-3">
                <h3>Změnit skupinu postavy</h3>
                <div className="row form-group mt-3">
                    <div className="col-md-4 font-weight-bold">
                        <label>Postava</label>
                    </div>
                    <div className="col-md-4">
                        {this.renderCharacterList()}
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-4 font-weight-bold">
                        <label>Skupina</label>
                    </div>
                    <div className="col-md-4">
                        {this.renderGroupList()}
                    </div>
                </div>

                {this.renderSubmit()}
            </div>
        );
    }
}