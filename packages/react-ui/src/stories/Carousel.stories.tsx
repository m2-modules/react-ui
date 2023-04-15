import { ComponentMeta, ComponentStory } from "@storybook/react";
import Carousel from "../Carousel";

const componentMeta: ComponentMeta<typeof Carousel> = {
  title: "Carousel",
  component: Carousel,
};

export default componentMeta;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <div
    style={{
      display: "grid",
      placeItems: "center",
    }}
  >
    <Carousel {...args} />
  </div>
);

export const HorizontalScrollCarousel = Template.bind({});
HorizontalScrollCarousel.args = {
  width: 300,
  height: 450,
  direction: "horizontal",
  items: Array.from({ length: 5 }).map((_, index) => (
    <img
      key={`random-img-${index}`}
      src={`https://picsum.photos/id/${Math.floor(Math.random() * 30)}/300/450`}
      alt={`random-img-${index}`}
    />
  )),
};

export const VerticalScrollCarousel = Template.bind({});
VerticalScrollCarousel.args = {
  width: 300,
  height: 450,
  direction: "vertical",
  items: Array.from({ length: 5 }).map((_, index) => (
    <img
      key={`random-img-${index}`}
      src={`https://picsum.photos/id/${Math.floor(Math.random() * 30)}/300/450`}
      alt={`random-img-${index}`}
    />
  )),
};

export const CustomizedIndicatorCarousel = Template.bind({});
CustomizedIndicatorCarousel.args = {
  width: 300,
  height: 450,
  direction: "horizontal",
  items: Array.from({ length: 5 }).map((_, index) => (
    <img
      key={`random-img-${index}`}
      src={`https://picsum.photos/id/${Math.floor(Math.random() * 30)}/300/450`}
      alt={`random-img-${index}`}
    />
  )),
  indexIndicator: (isActive: boolean) => (
    <div
      className={`rounded w-2 h-2 bg-white shadow-sm outline outline-3 ${
        isActive ? "outline-blue-400" : "outline-transparent"
      }`}
    />
  ),
};

export const InfiniteCarousel = Template.bind({});
InfiniteCarousel.args = {
  width: 300,
  height: 450,
  direction: "horizontal",
  infiniteRolling: true,
  items: Array.from({ length: 5 }).map((_, index) => (
    <img
      key={`random-img-${index}`}
      src={`https://picsum.photos/id/${Math.floor(Math.random() * 30)}/300/450`}
      alt={`random-img-${index}`}
    />
  )),
};

export const RoundTripCarousel = Template.bind({});
RoundTripCarousel.args = {
  width: 300,
  height: 450,
  direction: "horizontal",
  travelingMode: "round-trip",
  items: Array.from({ length: 5 }).map((_, index) => (
    <img
      key={`random-img-${index}`}
      src={`https://picsum.photos/id/${Math.floor(Math.random() * 30)}/300/450`}
      alt={`random-img-${index}`}
    />
  )),
};
