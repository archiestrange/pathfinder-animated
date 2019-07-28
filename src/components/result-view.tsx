import * as React from "react";
import { Destination, CalculationItem } from "../types";
import { ResultOrb } from "./result-orb";

interface ComponentProps {
    result: CalculationItem;
}

export class ResultView extends React.Component<ComponentProps> {

    renderResults(): JSX.Element {
        let time: number = 0;
        const routes = this.props.result.usedRoutes;
        return <React.Fragment>
            <ResultOrb route={this.props.result} wait={time} optionsWait={time + 1000} colour="green" destination={routes[0].start} />
            {
                routes.map((r, idx) => {
                    if (idx === 0) {
                        return null;
                    }
                    time = (2250 * idx);
                    return <ResultOrb route={this.props.result}  key={r.start} wait={time} optionsWait={time + 1000} colour={"orange"} destination={r.start} />
                })
            }
            <ResultOrb route={this.props.result}  wait={time + 2250} optionsWait={time + 1000} colour="red" destination={this.props.result.current} />
        </React.Fragment>
    }

    render() {
        return <div id="result-view-container">
            {this.renderResults()}
        </div>
    }
}