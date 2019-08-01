import * as React from "react";
import { Destination } from "../types";
import { routesAvailable } from "../functions/get-available-routes";

interface ComponentProps {
    wait: number;
    colour: string;
    destination: Destination;
    nextUsed?: Destination;
    finalDestination?: boolean;
}

interface LocalState {
    optionsDisplay: boolean;
    resultDisplay: boolean;
}

const initialState: LocalState = {
    optionsDisplay: false,
    resultDisplay: false
}

export class ResultOrb extends React.Component<ComponentProps, LocalState> {

    constructor(props: ComponentProps) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        var that = this;
        // Show results after parsed wait time
        setTimeout(function() {
            that.showResult();
        }, that.props.wait);
        // Show options after parsed wait time
        setTimeout(function() {
            that.toggleOptionsDisplay();
        }, that.props.wait + 1000);
        // Hide results after parsed wait time
        setTimeout(function() {
            that.toggleOptionsDisplay();
        }, that.props.wait + 3000);
    }

    showResult() {
        this.setState({ resultDisplay: true });
    }

    toggleOptionsDisplay() {
        this.setState({ optionsDisplay: !this.state.optionsDisplay });
    }

    renderOptions(): JSX.Element | undefined {
        // When display is true and it isn't the last destination
        if (this.state.optionsDisplay && this.props.nextUsed) {
            const { destination } = this.props;
            const connections = routesAvailable(destination);

            const orbs = connections.map(r => {
                const chosenOne = r.destination === this.props.nextUsed;
                const className = "destination-orb " + (chosenOne ?  "chosen-one" : "");
                return <div className={className} key={r.destination}>{r.destination}</div>;
            });

            return <div className="possible-destinations-container">
                {orbs}
            </div>;
        }
    }

    renderOrb(): JSX.Element {
        // When last destination
        if (!this.props.nextUsed) {
            return <div className="wrapper">
                <div className={"middle " + this.props.colour}>{this.props.destination}</div>
            </div>;
        }

        return <div className="wrapper">
            <div className="left"></div>
            <div className="right"></div>
            <div className={"middle " + this.props.colour}>{this.props.destination}</div>
            <div className="popover"></div>
        </div>;
    }

    render() {

        if (this.state.resultDisplay) {
            return <React.Fragment>
                {this.renderOrb()}
                {this.renderOptions()}
            </React.Fragment>;
        }

        return null;
    }
}