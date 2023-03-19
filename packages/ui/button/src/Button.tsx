import React from "react";

export interface ButtonProps {
  text?: string;
}

export default function Button({ text = "Button" }: ButtonProps) {
  return (
    <button
      onClick={() => {
        console.log("Click!");
      }}
    >
      {text}
    </button>
  );
}
