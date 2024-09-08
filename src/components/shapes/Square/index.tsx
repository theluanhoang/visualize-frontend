import { Arrow, Group, Rect } from "react-konva";

const Square = () => {
  return (
    <Group x={100} y={50}>
      <Arrow
        points={[60, 30, 20, 70]}
        fill="#FF66D3"
        stroke="#FF66D3"
        strokeWidth={10}
        pointerLength={10}
        pointerWidth={15}
        tension={0}
      />
      <Rect
        // x={150}
        // y={50}
        width={100}
        height={50}
        fill="#FF66D3"
        stroke="white"
        strokeWidth={2}
        cornerRadius={10}
      />
    </Group>
  );
};

export default Square;
