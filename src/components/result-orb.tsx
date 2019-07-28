import * as React from "react";
import { Destination, CalculationItem } from "../types";
import { getConnectingRoutes } from "../functions/get-connection-routes";
import { routesAvailable } from "../functions/get-available-routes";

interface ComponentProps {
    wait: number;
    optionsWait: number;
    colour: string;
    destination: Destination;
    nextUsed?: Destination;
    finalDestination?: boolean;
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
        }, that.props.optionsWait + 2000);
    }

    toggleOptions() {
        this.setState({ optionsDisplay: !this.state.optionsDisplay });
    }

    showResult() {
        this.setState({ resultDisplay: true });
    }

    renderOptions() {
        if (this.state.optionsDisplay && this.props.nextUsed) {
            const { destination } = this.props;
            const connections = routesAvailable(destination);
            const orbs = connections.map(r => {
                const chosenOne = r.destination === this.props.nextUsed;
                const className = "destination-orb " + (chosenOne ?  "chosen-one" : "");
                return <div className={className} key={r.destination}>{r.destination}</div>
            });
            return <div className="possible-destinations-container">
                {orbs}
            </div>
        }
    }


    renderOrb() {
        if (!this.props.nextUsed) {
            return <div className="wrapper">
                <div className={"middle " + this.props.colour}>{this.props.destination}</div>
            </div>
        }
        return <div className="wrapper">
            <div className="left"></div>
            <div className="right"></div>
            <div className={"middle " + this.props.colour}>{this.props.destination}</div>
            <div className="popover"></div>
        </div>
    }

    render() {

        if (this.state.resultDisplay) {
            return <React.Fragment>
                {this.renderOrb()}
                {this.renderOptions()}
            </React.Fragment>
        }

        return null;
    }
}