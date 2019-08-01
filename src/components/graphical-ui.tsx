import * as React from "react";
import { Destination, CalculationItem } from "../types";
import { getOrbIdValue } from "../functions/utils";

interface ComponentProps {
    siteA?: Destination;
    siteB?: Destination;
    result?: CalculationItem;
    calculate: () => void;
    updateInputA: (siteA: Destination) => void;
    updateInputB: (siteB: Destination) => void;
}

export class GraphicalUI extends React.Component<ComponentProps> {

    getOrbClasses(orb: Destination): string {
        // Give green class to the starting destination orb
        if (this.props.siteA === orb){
            return "green";
        }

        // Give red class to the ending destination orb
        if (this.props.siteB === orb) {
            return "red";
        }

        // Post calculation
        if (this.props.result) {
            const allStarts = this.props.result.usedRoutes.map(r => r.start);
            const allEnds = this.props.result.usedRoutes.map(r => r.end);
            
            // Give any orbs existing in the results used path an orange class; hide the rest
            if (allStarts.includes(orb) || allEnds.includes(orb)) {
                return "orange";
            } else {
                return "hidden";
            }
        }
        
        // Classes for hovering over orbs when selecting
        if (this.props.siteA) {
            if(!this.props.siteB) {
                return "second-select"
            }
        } else {
            return "first-select"
        }

        return "";
    }

    setSiteInfo(destination: Destination) {
        if(this.props.siteA) {
            // Make sure the same destination isn't being selected twice
            if (this.props.siteB || destination === this.props.siteA) {
                return;
            } else {
                this.props.updateInputB(destination);
            }
        } else {
            this.props.updateInputA(destination);
        }
    }

    // Render orb item with additional class for wide section of the octagon
    renderSqueezeRowItem(d: Destination, extraClass?: string) {
        return <div id={getOrbIdValue(Destination[d])}
            className={this.getOrbClasses(Destination[d]) + " destination-orb " + extraClass}
            onClick={() => this.setSiteInfo(Destination[d])}>{d}</div>
    }

    render() {
        // Octagon of destination orbs to choose from
        return <div id="graphical-pathfinder-container">
            <div className="squeeze-row">
                {this.renderSqueezeRowItem(Destination.A)}
                {this.renderSqueezeRowItem(Destination.B)}
            </div>

            <div className="loose-row">
                {this.renderSqueezeRowItem(Destination.C, "wide-left-section")}
                {this.renderSqueezeRowItem(Destination.D, "wide-right-section")}
            </div>

            <div className="loose-row">
                {this.renderSqueezeRowItem(Destination.E, "wide-left-section")}
                {this.renderSqueezeRowItem(Destination.F, "wide-right-section")}
            </div>

            <div className="squeeze-row">
                {this.renderSqueezeRowItem(Destination.G)}
                {this.renderSqueezeRowItem(Destination.H)}
            </div>
        </div>
    }
}