import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Overlay from "../src/Overlay";

export default {
  title: "Overlay",
  component: Overlay,
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => (
  <Overlay {...args} />
);

export const Default = Template.bind({});
Default.args = {};
