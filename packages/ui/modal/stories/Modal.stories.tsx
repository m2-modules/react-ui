import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Modal from "../src/Modal";

export default {
  title: "Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {};
