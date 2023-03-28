import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import Overlay, { OverlayProps } from "../Overlay";

export default {
  title: "Overlay",
  component: Overlay,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args: OverlayProps) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <button
        className="hover:bg-red-400 hover:text-white p-3"
        onClick={() => {
          setActive(!active);
        }}
      >
        {active ? "Inactivate" : "Activate"}
      </button>

      <Overlay
        {...args}
        active={active}
        onClose={() => {
          setActive(false);
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
