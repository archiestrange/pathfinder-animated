import React from "react";
import { Destination } from "../../types";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ResultOrb } from "../result-orb";

configure({ adapter: new Adapter() });

describe("Result Orb", () => {

    const ResultOrbComponent = (
        <ResultOrb 
            wait={100}
            colour={"green"}
            destination={Destination.A}
            nextUsed={Destination.C}
            finalDestination={false} />
    );

    it("Orb DOESN'T render before wait time", async () => {
        const component = shallow(ResultOrbComponent);
        await new Promise(resolve => {
            setTimeout(() => {
                component.update();
                resolve();
            }, 10);
        });
        expect(component.state("resultDisplay")).toEqual(false);
    });

    it("Orb DOES render after wait time", async () => {
        const component = shallow(ResultOrbComponent);
        await new Promise(resolve => {
            setTimeout(() => {
                component.update();
                resolve();
            }, 250);
        });
        expect(component.state("resultDisplay")).toEqual(true);
    });

    it("Orb options DOESN'T render before wait time", async () => {
        const component = shallow(ResultOrbComponent);
        await new Promise(resolve => {
            setTimeout(() => {
                component.update();
                resolve();
            }, 10);
        });
        expect(component.state("optionsDisplay")).toEqual(false);
    });

    it("Orb options DOES render after wait time", async () => {
        const component = shallow(ResultOrbComponent);
        await new Promise(resolve => {
            setTimeout(() => {
                component.update();
                resolve();
            }, 1100);
        });
        expect(component.state("optionsDisplay")).toEqual(true);
    });

});