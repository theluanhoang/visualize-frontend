import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Arrow, Group, Rect, Text } from "react-konva";

type SquareProps = {
  x: number;
  y: number;
  branch: string;
};

const Square = ({ x, y, branch }: SquareProps) => {
  const [textSize, setTextSize] = useState({ width: 100, height: 50 });
  const textRef = useRef<Konva.Text>(null); // Dùng kiểu Konva.Text cho ref

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.width();
      const height = textRef.current.height();
      setTextSize({ width: width , height: height + 10 });
    }
  }, [branch]);

  const rectX = 10; // X của Rect
  const rectY = 0; // Y của Rect
  const cornerRadius = 10;

  const arrowStartX = rectX + cornerRadius / 2;
  const arrowStartY = rectY + textSize.height - cornerRadius / 2; // Góc trái dưới của Rect, đã tính cả chiều cao

  const arrowEndX = arrowStartX - 30;
  const arrowEndY = arrowStartY + 30;

  return (
    <Group x={x} y={y}>
      <Arrow
        points={[arrowStartX, arrowStartY, arrowEndX, arrowEndY]} // Vị trí mũi tên
        fill="#FF66D3"
        stroke="#FF66D3"
        strokeWidth={10}
        pointerLength={10}
        pointerWidth={15}
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
        cornerRadius={cornerRadius} // Bo tròn góc
      />
      <Text
        ref={textRef} // Dùng ref để lấy kích thước của Text
        x={rectX} // Căn giữa ngang dựa trên vị trí của Rect
        y={rectY} // Căn giữa dọc dựa trên vị trí của Rect
        width={textSize.width} // Đặt chiều rộng của Text bằng với Rect
        height={textSize.height} // Đặt chiều cao của Text bằng với Rect
        text={branch}
        fontSize={18}
        fill="#000"
        align="center" // Căn giữa ngang
        verticalAlign="middle" // Căn giữa dọc
      />
    </Group>
  );
};

export default Square;
