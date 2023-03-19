import React from "react";
import renderer from "react-test-renderer";
import Modal from "../src/Modal";

it("show Modal on document", () => {
  const component = renderer.create(<Modal />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
