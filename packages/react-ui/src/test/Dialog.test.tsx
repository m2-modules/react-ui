import renderer from "react-test-renderer";
import Dialog from "../Dialog";

it("show Dialog on document", () => {
  const component = renderer.create(
    <Dialog
      onClose={() => {
        console.log("on close");
      }}
    >
      <h1>Dialog</h1>
    </Dialog>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
