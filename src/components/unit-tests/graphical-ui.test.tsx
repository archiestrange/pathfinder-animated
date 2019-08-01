import React from "react";
import { GraphicalUI } from "../graphical-ui";
import { Destination } from "../../types";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Graphical UI", () => {

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