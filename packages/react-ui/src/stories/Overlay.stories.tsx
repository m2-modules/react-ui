import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import Overlay, { OverlayProps } from "../Overlay";

const componentMeta: ComponentMeta<typeof Overlay> = {
  title: "Overlay",
  component: Overlay,
  argTypes: {
    background: { control: "color" },
    active: { control: "none" },
    activateTransitionClass: { control: "none" },
    inactivateTransitionClass: { control: "none" },
    transitionDuration: { control: "none" },
  },
};

export default componentMeta;

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

export const Opacity = Template.bind({});
export const Scale = Template.bind({});
Scale.args = {
  activateTransitionClass: "scale-1",
  inactivateTransitionClass: "scale-0",
};
