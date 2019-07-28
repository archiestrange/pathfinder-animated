import * as React from "react";
import { Destination, CalculationItem } from "../types";
import { getConnectingRoutes } from "../functions/get-connection-routes";
import { routesAvailable } from "../functions/get-available-routes";

interface ComponentProps {
    wait: number;
    optionsWait: number;
    colour: string;
    destination: Destination;
    route: CalculationItem;
}

interface LocalState {
    optionsDisplay: boolean;
    resultDisplay: boolean;
}

export class ResultOrb extends React.Component<ComponentProps, LocalState> {

    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            optionsDisplay: false,
            resultDisplay: false
        }
    }

    componentDidMount() {
        var that = this;
        setTimeout(function() {
            that.showResult();
        }, that.props.wait);
        setTimeout(function() {
            that.toggleOptions();
        }, that.props.optionsWait);
        setTimeout(function() {
            that.toggleOptions();
        }, that.props.optionsWait + 1000);
    }

    toggleOptions() {
        this.setState({ optionsDisplay: !this.state.optionsDisplay });
    }

    showResult() {
        this.setState({ resultDisplay: true });
    }

    renderOptions() {
        if (this.state.optionsDisplay) {
            const connections = routesAvailable(this.props.destination);
            return connections.map(r => <div key={r.destination}>{r.destination}</div>);
        }
    }

    render() {

        if (this.state.resultDisplay) {
            return <React.Fragment>
                <div className="wrapper">
                    <div className="left"></div>
                    <div className="right"></div>
                    <div className={"middle " + this.props.colour}>{this.props.destination}</div>
                    <div className="popover"></div>
                </div>
                {this.renderOptions()}
            </React.Fragment>
        }

        return null;
    }
}