import React from "react";
import { shallow, mount } from "enzyme";
import MyListsForm from "./index.js";
import EnzymeToJson from "enzyme-to-json";

it("The snapshot matches", () => {
  const tree = EnzymeToJson(
    mount(<MyListsForm closeModal={() => {}} visible selectedLis={{ id: 123 }} />)
  );
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<MyListsForm closeModal={() => {}} visible selectedLis={{ id: 123 }} />);
});
