import React from "react";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Pathfinder } from "../pathfinder";

configure({adapter: new Adapter()});

describe("Orb Selection", () => {

    it("Orb A renders with class 'green' when selected first", () => {
        const pathfinderComponent = (
            <Pathfinder />
        );

        const component = mount(pathfinderComponent);

        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("green")).toEqual(false);

        orbA.simulate("click");

        component.update();
        
        const orbAPostUpdate = component.find("div#container-a");
        expect(orbAPostUpdate.hasClass("green")).toEqual(true);
    });

});