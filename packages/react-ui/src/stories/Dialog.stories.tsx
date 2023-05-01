import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Dialog, DialogProps } from "../Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  argTypes: {
    active: { control: "none" },
  },
};

export default meta;

type Story = StoryFn<typeof Dialog>;

const Template: Story = (args: DialogProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      {!active && (
        <button
          className="bg-green-500 rounded shadow text-white px-3 py-1"
          onClick={() => {
            setActive(true);
          }}
        >
          Show Dialog
        </button>
      )}

      <Dialog
        {...args}
        active={active}
        handleClick={() => {
          setActive(false);
        }}
      >
        <div className="bg-white p-5 rounded shadow">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
            earum recusandae libero dolorem distinctio possimus voluptas nisi
            laboriosam consequatur in sit delectus nemo a, quaerat, inventore
            maiores minima laborum aliquam.
          </p>
          <button
            className="bg-green-500 rounded shadow text-white px-3 py-1 grid ml-auto mt-5"
            onClick={() => {
              setActive(false);
            }}
          >
            OK
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export const Opacity: Story = Template.bind({});
export const Scale: Story = Template.bind({});
Scale.args = {
  activateTransitionClasses: ["scale-1"],
  inactivateTransitionClasses: ["scale-0"],
};
export const TranslateY: Story = Template.bind({});
TranslateY.args = {
  activateTransitionClasses: ["opacity-1", "translate-y-0"],
  inactivateTransitionClasses: ["opacity-0", "translate-y-10"],
};
