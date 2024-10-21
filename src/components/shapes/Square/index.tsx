import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Arrow, Group, Rect, Text } from "react-konva";

type SquareProps = {
  id?: string;
  x: number;
  y: number;
  branch: string;
  direction: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-middle' | 'left-middle' | 'right-middle' | 'bottom-middle';
  backgroundColor?: string;
};

interface DimensionsText {
  width: number;
  height: number;
}

const TagComponent = ({ x, y, branch, id, direction, backgroundColor }: SquareProps) => {
  const [textSize, setTextSize] = useState<DimensionsText>({ width: 0, height: 0 });
  const textRef = useRef<Konva.Text>(null);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.width();
      const height = textRef.current.height();
      setTextSize({ width: width + 20, height: height + 10 });
    }
  }, [branch]);

  const rectX = 20;
  const rectY = 0;
  const cornerRadius = 10;

  let arrowStartX = rectX + cornerRadius / 2;
  let arrowStartY = rectY + cornerRadius / 2;
  let arrowEndX = arrowStartX - 20;
  let arrowEndY = arrowStartY - 20;

  switch (direction) {
    case 'top-left':
      arrowStartX = rectX + cornerRadius / 2;
      arrowStartY = rectY + cornerRadius / 2;
      arrowEndX = arrowStartX - 20;
      arrowEndY = arrowStartY - 20;
      break;
    case 'top-middle':
      arrowStartX = rectX + textSize.width / 2;
      arrowStartY = rectY + cornerRadius / 2;
      arrowEndX = arrowStartX;
      arrowEndY = arrowStartY - 20;
      break;
    case 'top-right':
      arrowStartX = rectX + textSize.width - cornerRadius / 2;
      arrowStartY = rectY + cornerRadius / 2;
      arrowEndX = arrowStartX + 20;
      arrowEndY = arrowStartY - 20;
      break;
    case 'left-middle':
      arrowStartX = rectX + cornerRadius / 2;
      arrowStartY = rectY + textSize.height / 2;
      arrowEndX = arrowStartX - 30;
      arrowEndY = arrowStartY;
      break;
    case 'right-middle':
      arrowStartX = rectX + textSize.width - cornerRadius / 2;
      arrowStartY = rectY + textSize.height / 2;
      arrowEndX = arrowStartX + 20;
      arrowEndY = arrowStartY;
      break;
    case 'bottom-left':
      arrowStartX = rectX + cornerRadius / 2;
      arrowStartY = rectY + textSize.height - cornerRadius / 2;
      arrowEndX = arrowStartX - 20;
      arrowEndY = arrowStartY + 20;
      break;
    case 'bottom-middle':
      arrowStartX = rectX + textSize.width / 2;
      arrowStartY = rectY + textSize.height - cornerRadius / 2;
      arrowEndX = arrowStartX;
      arrowEndY = arrowStartY + 20;
      break;
    case 'bottom-right':
      arrowStartX = rectX + textSize.width - cornerRadius / 2;
      arrowStartY = rectY + textSize.height - cornerRadius / 2;
      arrowEndX = arrowStartX + 20;
      arrowEndY = arrowStartY + 20;
      break;
  }

  return (
    <Group id={id || undefined} x={x} y={y}>
      <Arrow
        points={[arrowStartX, arrowStartY, arrowEndX, arrowEndY]}
        fill={backgroundColor || "#FF66D3"}
        stroke={backgroundColor || "#FF66D3"}
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
        fill={backgroundColor || "#FF66D3"}
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

export default TagComponent;
