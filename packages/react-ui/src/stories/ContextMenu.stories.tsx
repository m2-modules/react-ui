import { Meta, StoryFn } from "@storybook/react";
import { MouseEvent, useState } from "react";
import ContextMenu, { ContextMenuProps } from "../ContextMenu";

const componentMeta: Meta<typeof ContextMenu> = {
  title: "Context menu",
  component: ContextMenu,
  argTypes: {
    active: { type: "boolean" },
  },
};

export default componentMeta;

const Template: StoryFn<typeof ContextMenu> = (args) => {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState<ContextMenuProps["position"]>({
    left: 0,
    top: 0,
  });

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!active) {
      setActive(true);
      const { clientX, clientY } = event;
      setPosition({ left: clientX, top: clientY });
    }
  };

  return (
    <div
      className="boundary bg-slate-200 h-screen w-screen grid place-items-center"
      onClick={onClick}
    >
      <span>Click anywhere to open up Context Menu</span>
      <ContextMenu {...args} active={active} position={position}>
        <div
          className="bg-white shadow rounded-md p-3 flex flex-col gap-2"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h1 className="text-2xl">Context Menu</h1>
          <button
            className="absolute right-3"
            onClick={() => {
              setActive(false);
            }}
          >
            X
          </button>
          <p className="max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            similique ratione voluptatem ab nostrum dolores odit mollitia,
            consequatur odio aliquam dolorum? Consectetur officiis totam debitis
            placeat omnis tempore nobis maiores.
          </p>
        </div>
      </ContextMenu>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
