import React from "react";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Pathfinder } from "../pathfinder";

configure({adapter: new Adapter()});

describe("Orb Selection", () => {

    const pathfinderComponent = (
        <Pathfinder />
    );

    it("Orb A renders with class 'green' when selected first", () => {

        const component = mount(pathfinderComponent);

        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("green")).toEqual(false);

        orbA.simulate("click");

        component.update();
        
        const orbAPostUpdate = component.find("div#container-a");
        expect(orbAPostUpdate.hasClass("green")).toEqual(true);
    });

    it("Orb container hides after view switch", () => {

        const component = mount(pathfinderComponent);

        const orbContainer = component.find("div#graphical-pathfinder-container");
        expect(orbContainer.exists()).toEqual(true);

        const viewSwitcher = component.find("button#view-switcher");
        viewSwitcher.simulate("click");

        component.update();

        const orbContainerPostUpdate = component.find("div#graphical-pathfinder-container");
        expect(orbContainerPostUpdate.exists()).toEqual(false);
    });
    
});