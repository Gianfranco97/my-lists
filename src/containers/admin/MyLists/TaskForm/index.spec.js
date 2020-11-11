import React from "react";
import { shallow, mount } from "enzyme";
import TaskForm from "./index.js";
import EnzymeToJson from "enzyme-to-json";

it("The snapshot matches", () => {
  const tree = EnzymeToJson(
    mount(<TaskForm closeModal={() => { }} visible selectedLis={{ id: 123 }} />)
  );
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<TaskForm closeModal={() => { }} visible selectedLis={{ id: 123 }} />);
});
