import * as React from "react";
import { CalculationItem } from "../types";
import { ResultOrb } from "./result-orb";

interface ComponentProps {
    result: CalculationItem;
}

export class ResultView extends React.Component<ComponentProps> {

    renderResults(): JSX.Element {
        let time: number = 0;
        const routes = this.props.result.usedRoutes;

        const resultOrbs = (): JSX.Element[] => routes.map((r, idx) => {
            // First route 
            if (idx === 0) {
                return <ResultOrb key={r.start} wait={time} nextUsed={routes[0].end} colour="green" destination={routes[0].start} />
            }

            // Update time delay each iteration
            time = (3000 * idx);
            return <ResultOrb key={r.start} wait={time} colour={"orange"} destination={r.start} nextUsed={r.end} />
        });

        return <React.Fragment>
            {resultOrbs()}
            <ResultOrb wait={time + 3000} colour="red" destination={this.props.result.current} />
        </React.Fragment>
    }

    render() {
        return <div id="result-view-container">
            {this.renderResults()}
        </div>
    }
}