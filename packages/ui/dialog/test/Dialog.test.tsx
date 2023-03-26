import React from "react";
import renderer from "react-test-renderer";
import Dialog from "../src/Dialog";

it("show Dialog on document", () => {
  const component = renderer.create(<Dialog />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
