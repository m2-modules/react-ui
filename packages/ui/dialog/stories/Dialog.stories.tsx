import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dialog from "../src/Dialog";

export default {
  title: "Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <h1
      onClick={() => {
        alert("Click");
      }}
    >
      Hello World
    </h1>
  ),
};
