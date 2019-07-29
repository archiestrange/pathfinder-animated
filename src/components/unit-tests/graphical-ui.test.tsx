import React from "react";
import { GraphicalUI } from "../graphical-ui";
import { Destination, CalculationItem } from "../../types";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Graphical UI", () => {

    const result: CalculationItem = {
        current: Destination.E,
        foundDestination: true,
        total: 14,
        used: false,
        usedRoutes: [
            { start: Destination.A, end: Destination.C },
            { start: Destination.C, end: Destination.D },
            { start: Destination.D, end: Destination.B },
            { start: Destination.B, end: Destination.E }
        ]
    }

    it("Orb A renders with class 'green' when selected first", () => {
        const graphicalUIComponent = (
            <GraphicalUI
                siteA={Destination.A}
                siteB={undefined}
                result={undefined}
                calculate={() => {}}
                updateInputA={() => {}}
                updateInputB={() => {}} />
        );

        const component = shallow(graphicalUIComponent);
        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("green")).toEqual(true);
    });
});