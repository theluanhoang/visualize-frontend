import { Arrow, Group, Rect, Text } from "react-konva";

type SquareProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  branch: string;
};

const Square = ({ x, y, branch, width, height }: SquareProps) => {
  const rectWidth = 100;
  const rectHeight = 50;

  return (
    <Group x={x} y={y}>
      <Arrow
        points={[30, 30, 0, 70]}
        fill="#FF66D3"
        stroke="#FF66D3"
        strokeWidth={10}
        pointerLength={10}
        pointerWidth={15}
        tension={0}
      />
      <Rect
        x={10}
        y={0}
        width={rectWidth}
        height={rectHeight}
        fill="#FF66D3"
        stroke="white"
        strokeWidth={2}
        cornerRadius={10}
      />

      <Text
        x={10}
        y={0}
        width={rectWidth}
        height={rectHeight}
        text={branch}
        fontSize={18}
        fill="#000"
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Square;
