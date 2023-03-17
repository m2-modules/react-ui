import React from "react";

export interface ButtonProps {
  text?: string;
}

export default function Button({ text = "Button" }: ButtonProps) {
  console.log("test");
  return <button>{text}</button>;
}
