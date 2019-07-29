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
            if (this.props.siteB || destination === this.props.siteA) {
                return;
            } else {
                this.props.updateInputB(destination);
            }
        } else {
            this.props.updateInputA(destination);
        }
    }

    render() {
        // Octagon of orbs to choose from
        return <div id="graphical-pathfinder-container">
            <div className="squeeze-row">
                <div id={getOrbIdValue(Destination.A)}
                    className={this.getOrbClasses(Destination.A) + " destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.A)}>A</div>
                    
                <div id={getOrbIdValue(Destination.B)}
                    className={this.getOrbClasses(Destination.B) + " destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.B)}>B</div>

            </div>

            <div className="loose-row">
                <div id={getOrbIdValue(Destination.C)}
                    className={this.getOrbClasses(Destination.C) + " destination-orb wide-left-section"}
                    onClick={() => this.setSiteInfo(Destination.C)}>C</div>

                <div id={getOrbIdValue(Destination.D)}
                    className={this.getOrbClasses(Destination.D) + " destination-orb wide-right-section"}
                    onClick={() => this.setSiteInfo(Destination.D)}>D</div>

            </div>

            <div className="loose-row">
                <div id={getOrbIdValue(Destination.E)}
                    className={this.getOrbClasses(Destination.E) + " destination-orb wide-left-section"}
                    onClick={() => this.setSiteInfo(Destination.E)}>E</div>
                    
                <div id={getOrbIdValue(Destination.F)}
                    className={this.getOrbClasses(Destination.F) + " destination-orb wide-right-section"}
                    onClick={() => this.setSiteInfo(Destination.F)}>F</div>

            </div>

            <div className="squeeze-row">
                <div id={getOrbIdValue(Destination.G)}
                    className={this.getOrbClasses(Destination.G) + " destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.G)}>G</div>

                <div id={getOrbIdValue(Destination.H)}
                    className={this.getOrbClasses(Destination.H) + " destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.H)}>H</div>

            </div>
        </div>
    }
}