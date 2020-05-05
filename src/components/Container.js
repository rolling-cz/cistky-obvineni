import * as React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { loadData } from "../services/Loader";
import CharacterList from "./CharacterList"
import AccusationList from "./AccusationList"

export default class Container extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.copyAndSortData(loadData()),
            tab: "characters"
        }
    }

    copyAndSortData(data) {
        const usedData = JSON.parse(JSON.stringify(data))
        usedData.sort(this.compareFunction);
        return usedData;
    }

    compareFunction(a, b){
        if (a.group === b.group) {
            let leftName = a.overwrite ? a.overwrite : a.male;
            let rightName = b.overwrite ? b.overwrite : b.male;
            return leftName.lastName.localeCompare(rightName.lastName)
        } else {
            return a.group.localeCompare(b.group);
        }
    }

    updateCharacterState(id, newActiveState) {
        const newData = JSON.parse(JSON.stringify(this.state.data));
        const char = newData.find(char => char.id === id);
        char.activeState = newActiveState
        if (newActiveState === 0) {
            char.overwrite = null;
            newData.sort(this.compareFunction);
        }

        this.setState({data: newData});
    }

    overwriteCharacterName(id, newName) {
        const newData = JSON.parse(JSON.stringify(this.state.data));
        const char = newData.find(char => char.id === id);
        char.overwrite = newName;

        newData.sort(this.compareFunction);
        this.setState({data: newData});
    }

    render() {
        return (
            <div className="container mt-2" >
                <Tabs
                    id="tabs"
                    activeKey={this.state.tab}
                    onSelect={key => this.setState({ tab: key })}
                >
                    <Tab eventKey="characters" title="Postavy">
                        <CharacterList
                            data={this.state.data}
                            updateState={this.updateCharacterState.bind(this)}
                            overwriteName={this.overwriteCharacterName.bind(this)}
                        />
                    </Tab>
                    <Tab eventKey="accusations" title="Obvinění">
                        <AccusationList data={this.state.data} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}