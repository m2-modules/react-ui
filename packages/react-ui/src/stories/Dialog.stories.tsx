import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import Dialog, { DialogProps } from "../Dialog";

const componentMeta: ComponentMeta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  argTypes: {
    active: { control: "none" },
  },
};

export default componentMeta;

const Template: ComponentStory<typeof Dialog> = (args: DialogProps) => {
  const [active, setActive] = useState(false);

  return (
    <>
      {!active && (
        <button
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
        onClose={() => {
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
    </>
  );
};

export const Opacity = Template.bind({});
export const Scale = Template.bind({});
Scale.args = {
  activateTransitionClasses: ["scale-1"],
  inactivateTransitionClasses: ["scale-0"],
};
export const TransformY = Template.bind({});
TransformY.args = {
  activateTransitionClasses: ["opacity-1", "translate-y-0"],
  inactivateTransitionClasses: ["opacity-0", "translate-y-10"],
};
