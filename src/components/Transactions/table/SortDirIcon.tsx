import styled from "@emotion/styled";
import { animated, useSpring } from "react-spring";

export type SortDirIconProps = {
  dir: "asc" | "desc" | "none";
};

export const SortDirIcon = ({ dir }: SortDirIconProps) => {
  const spring = useSpring({
    ...springMap[dir],
    config: {
      mass: 0.5,
      tension: 1300,
      friction: 60,
    },
  });

  return (
    <Svg
      style={spring}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="#41A578"
    >
      <path d="M8 13a.499.499 0 01-.354-.146l-5-5a.5.5 0 11.707-.708L8 11.793l4.646-4.646a.5.5 0 11.707.707l-5 5A.499.499 0 018 13zm.353-4.146l5-5a.5.5 0 10-.707-.708L8 7.793 3.353 3.146a.5.5 0 10-.707.708l5 5a.499.499 0 00.707 0z" />
    </Svg>
  );
};

const springMap: Record<SortDirIconProps["dir"], object> = {
  asc: { opacity: 1, rotate: 0 },
  desc: { opacity: 1, rotate: 180 },
  none: { opacity: 0, rotate: 90 },
};

export const Svg = styled(animated.svg)`
  margin-left: 4px;
`;
