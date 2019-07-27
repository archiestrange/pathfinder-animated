import * as React from "react";
import { Destination } from "../types";

interface ComponentProps {
    wait: number;
    colour: string;
    destination: Destination;
}

interface LocalState {
    display: boolean;
}

export class ResultOrb extends React.Component<ComponentProps, LocalState> {

    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            display: false
        }
    }

    componentDidMount() {
        var that = this;
        setTimeout(function() {
            that.show();
        }, that.props.wait);
    }

    show() {
        this.setState({ display: true });
    }

    render() {
        if (this.state.display) {
            return <div className="wrapper">
                <div className="left"></div>
                <div className="right"></div>
                <div className={"middle " + this.props.colour}>{this.props.destination}</div>
                <div className="popover"></div>
            </div>
        }
        return null;
    }
}