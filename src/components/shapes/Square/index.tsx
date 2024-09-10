import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Arrow, Group, Rect, Text } from "react-konva";

type SquareProps = {
  id?: string;
  x: number;
  y: number;
  branch: string;
};

interface DimensionsText {
  width: number;
  height: number;
}

const Square = ({ x, y, branch, id }: SquareProps) => {
  const [textSize, setTextSize] = useState<DimensionsText>({ width: 0, height: 0 });
  const textRef = useRef<Konva.Text>(null);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.width();
      const height = textRef.current.height();
      setTextSize({ width: width + 20, height: height + 10 });
    }
  }, [branch]);

  console.log("{ x, y, branch, id }:::", { x, y, branch, id })

  const rectX = 20;
  const rectY = 0;
  const cornerRadius = 10;

  const arrowStartX = rectX + cornerRadius / 2;
  const arrowStartY = rectY + cornerRadius / 2;

  const arrowEndX = arrowStartX - 20;
  const arrowEndY = arrowStartY - 20;
  return (
    <Group id={id || undefined} x={x} y={y}>
      <Arrow
        points={[arrowStartX, arrowStartY, arrowEndX, arrowEndY]}
        fill="#FF66D3"
        stroke="#FF66D3"
        strokeWidth={10}
        pointerLength={8}
        pointerWidth={8}
        tension={0}
      />
      <Rect
        x={rectX}
        y={rectY}
        width={textSize.width}
        height={textSize.height}
        fill="#FF66D3"
        stroke="white"
        strokeWidth={2}
        cornerRadius={cornerRadius}
      />
      <Text
        ref={textRef}
        x={rectX}
        y={rectY}
        width={textSize.width > 0 ? textSize.width : undefined}
        height={textSize.height > 0 ? textSize.height : undefined}
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
