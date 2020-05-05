import * as React from "react";
import Character from "./Character"

export default class CharacterList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }
    }

    componentWillReceiveProps(props) {
        this.setState({data: props.data})
    }

    render() {
        let order = 0;
        return (
            <div className="mt-3">
                <h3>Seznam postav</h3>
                <div className="row justify-content-md-center">
                    <div className="col-md-3 font-weight-bold">
                        Stav
                    </div>
                    <div className="col-md-2 font-weight-bold">
                        Skupina
                    </div>
                    <div className="col-md-7 font-weight-bold text-left">
                        Jméno
                    </div>
                </div>
                {
                    this.state.data.map((character, i) => {
                        return <Character
                            data={character}
                            key={i}
                            order={order++}
                            updateState={this.props.updateState}
                            overwriteName={this.props.overwriteName}/>
                    })
                }
            </div>
        );
    }
}