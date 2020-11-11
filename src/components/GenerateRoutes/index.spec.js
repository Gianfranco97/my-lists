import React from "react";
import { shallow } from "enzyme";
import GenerateRoutes from "./index.js";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { AuthenticatedProvider } from "../AuthenticatedContext";

const demoRoutes = [
  {
    path: "/",
    exact: true,
    component: <div />,
    isPrivate: true,
    name: "Admin",
  },
  {
    path: "/products",
    isPrivate: true,
    component: <div />,
    name: "Products",
  },
];

it("The snapshot matches", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <AuthenticatedProvider>
          <GenerateRoutes routes={demoRoutes} />
        </AuthenticatedProvider>
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(
    <AuthenticatedProvider>
      <GenerateRoutes routes={demoRoutes} />
    </AuthenticatedProvider>
  );
});
