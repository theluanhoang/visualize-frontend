import React, { useEffect, useRef } from "react";
import { ICanvasProps, ICircleTemp } from "../../interfaces/ITree";

const TreeGithub: React.FC<ICanvasProps> = ({ width, height, style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef= useRef<CanvasRenderingContext2D | null>(null);

  const drawCommit = (circle?: ICircleTemp) => {
    const ctx = contextRef.current;
    if (ctx) {
      const defaultCircle: ICircleTemp = {
        x: 50,
        y: 100,
        radius: 20,
        backgroundColor: "#FF66D3",
        strokeColor: "#FFFFFF",
        lineWidth: 3,
        content: {
          message: "C0"
        },
        id: 0
      };
  
      const drawnCircle = circle || defaultCircle;
  
      const radius = drawnCircle.radius;
      ctx.fillStyle = drawnCircle.backgroundColor;
      ctx.strokeStyle = drawnCircle.strokeColor;
      ctx.lineWidth = drawnCircle.lineWidth;
      ctx.beginPath();
      ctx.arc(drawnCircle.x, drawnCircle.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
  
      if (drawnCircle.content) {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `${drawnCircle.content.fontSize || 12}px ${drawnCircle.content.fontFamily || "Arial"}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(drawnCircle.content.message, drawnCircle.x, drawnCircle.y);
      }
    }
  };

  // const drawCommitDetails = (commit: ICommit) => {

  // }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        contextRef.current = context;
      }
    }
  }, []);

  // useEffect(() => {
  //   drawCommit();
  // }, [])

  const handleOnClick = () => {
    drawCommit();
  }

  return (
    <>
      <canvas
      id="canvas"
      ref={canvasRef}
      width={width}
      height={height}
      style={style}
    />
    <button onClick={handleOnClick}>Click</button>
    </>
  );
};

export default TreeGithub;