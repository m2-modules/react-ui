import renderer from "react-test-renderer";
import Overlay from "../Overlay";

it("show Overlay on document", () => {
  const component = renderer.create(
    <Overlay
      handleClick={() => {
        console.log("On close");
      }}
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
