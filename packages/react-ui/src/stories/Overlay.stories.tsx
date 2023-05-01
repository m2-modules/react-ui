import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Overlay, OverlayProps } from "../Overlay";

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
    <div
      style={{
        display: "grid",
        height: "100vh",
        placeItems: "center",
      }}
    >
      <button
        className="bg-green-500 rounded shadow text-white px-3 py-1"
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
    </div>
  );
};

export const Opacity: Story = Template.bind({});
export const Scale: Story = Template.bind({});
Scale.args = {
  activateTransitionClasses: ["opacity-1", "scale-1"],
  inactivateTransitionClasses: ["opacity-0", "scale-0"],
};
