import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe('Circle component tests', () => {
    it("circle without text", () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle with text", () => {
        const tree = renderer.create(<Circle letter={'abc'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle with head", () => {
        const tree = renderer.create(<Circle head={"abc"} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle with React element as head", () => {
        const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle with tail", () => {
        const tree = renderer.create(<Circle tail={"abc"} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle with React element as tail", () => {
        const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle with index", () => {
        const tree = renderer.create(<Circle index={1} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle with isSmall prop", () => {
        const tree = renderer.create(<Circle isSmall />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle in default state", () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle in changing state", () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("circle in modified state", () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})