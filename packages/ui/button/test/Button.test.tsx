import React from "react";
import renderer from "react-test-renderer";
import Button from "../src/Button";

it("show button on document", () => {
  const component = renderer.create(<Button />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
