import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dialog from "../src/Dialog";
import { act } from "react-test-renderer";

export default {
  title: "Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setActive(true);
        }}
      >
        Activate
      </button>
      <Dialog
        active={active}
        onClose={() => {
          setActive(false);
        }}
      >
        <section className="bg-white p-5">
          <h1>Hello World</h1>
        </section>
      </Dialog>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
