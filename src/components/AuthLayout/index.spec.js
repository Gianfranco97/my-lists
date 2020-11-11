import React from "react";
import { shallow } from "enzyme";
import AuthLayout from "./index.js";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { AuthenticatedProvider } from "../AuthenticatedContext";

it("The snapshot matches", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <AuthenticatedProvider>
          <AuthLayout>
            <div />
          </AuthLayout>
        </AuthenticatedProvider>
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(
    <AuthLayout>
      <div />
    </AuthLayout>
  );
});
