import React from "react";
import renderer from "react-test-renderer";
import Overlay from "../src/Overlay";

it("show Overlay on document", () => {
  const component = renderer.create(<Overlay />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
