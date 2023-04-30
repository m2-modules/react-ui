import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import Overlay, { OverlayProps } from "../Overlay";

const meta: Meta<typeof Overlay> = {
  title: "Overlay",
  component: Overlay,
  argTypes: {
    background: { control: "color" },
    active: { control: "none" },
    activateTransitionClasses: { control: "none" },
    inactivateTransitionClasses: { control: "none" },
    transitionDuration: { control: "none" },
  },
};

export default meta;

type Story = StoryFn<typeof Overlay>;

const Template: Story = (args: OverlayProps) => {
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
        handleClick={() => {
          setActive(false);
        }}
      />
    </>
  );
};

export const Opacity: Story = Template.bind({});
export const Scale: Story = Template.bind({});
Scale.args = {
  activateTransitionClasses: ["opacity-1", "scale-1"],
  inactivateTransitionClasses: ["opacity-0", "scale-0"],
};
