import SHA1 from "crypto-js/sha1";
import gsap from "gsap";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Arrow, Circle as KonvaCircle, Layer, Stage, Text } from "react-konva";
import { ICircle } from "../../interfaces/ITree";
import Square from "../shapes/Square";
import "./CommitGraph.css";

interface IConnection {
  from: ICircle;
  to: ICircle;
  isBranch: boolean;
}

const CommitGraph: React.FC = () => {
  const stageRef = useRef<any>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<ICircle[]>([]);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [dynamicWidth, setDynamicWidth] = useState(0);
  const [newCommit, setNewCommit] = useState<ICircle | null>();
  const [currentCommit, setCurrentCommit] = useState<ICircle | null>();
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [HEAD, setHEAD] = useState("");

  useEffect(() => {
    const updateSize = () => {
      if (parentRef.current) {
        setDimensions({
          width: parentRef.current.offsetWidth,
          height: parentRef.current.offsetHeight,
        });
        setCoordinates({
          x: parentRef.current.offsetWidth / 2 - 10,
          y: 50,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    if (circles.length > 0) {
      const maxX = Math.max(...circles.map((circle) => circle.x));
      const minX = Math.min(...circles.map((circle) => circle.x));
      
      const extraSpace = 200;
      setDynamicWidth(Math.max(dimensions.width, maxX - minX + extraSpace));
  
      const maxY = Math.max(...circles.map((circle) => circle.y));
      setDynamicHeight(maxY + 100);
    }
  }, [circles, dimensions.width]);

  useEffect(() => {
    if (newCommit) {
      const circleNode = stageRef.current.findOne(
        `#circle-${newCommit.commit.hash}`
      );
      const textNode = stageRef.current.findOne(
        `#text-${newCommit.commit.hash}`
      );
      const tagNode = stageRef.current.findOne(
        `#tag-branch-${newCommit.commit.hash}`
      );

      if (circleNode && textNode) {
        gsap.fromTo(
          circleNode,
          { y: circleNode.y() - 100 },
          { y: circleNode.y(), duration: 0.5, ease: "bounce.out" }
        );

        gsap.fromTo(
          textNode,
          { y: textNode.y() - 100 },
          { y: textNode.y(), duration: 0.5, ease: "bounce.out" }
        );

        gsap.fromTo(
          tagNode,
          { y: tagNode.y() - 100 },
          { y: tagNode.y(), duration: 0.5, ease: "bounce.out" }
        );
      }
    }
  }, [newCommit]);

  useEffect(() => {
    if (coordinates.x && coordinates.y) {
      const initialCommit = {
        x: coordinates.x,
        y: coordinates.y,
        commit: {
          label: "C0",
          hash: SHA1("initial-commit").toString(),
          author: "Hoàng Thế Luân",
          date: new Date(),
          message: "Initial commit",
          branch: ["main"],
        },
      };

      setCircles([initialCommit]);
      setCurrentCommit(initialCommit);
      setNewCommit(initialCommit);
      setHEAD(initialCommit.commit.hash);
    }
  }, [coordinates.x, coordinates.y]);
  
  const setCursorPointer = (e: Konva.KonvaEventObject<MouseEvent>, cursorType: string) => {
    const container = e.target.getStage()?.container();
    if (container) {
      container.style.cursor = cursorType;
    }
  };

  const handleCommit = () => {
    const circle = {
      x: currentCommit ? currentCommit.x : coordinates.x,
      y: currentCommit
        ? currentCommit.y + 100
        : coordinates.y + circles.length * 100,
      commit: {
        label: `C${circles.length}`,
        hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
        author: "Hoàng Thế Luân",
        date: new Date(),
        message: `Commit: ${circles.length}`,
        branch: ["main", "feature-z"],
        isHEAD: true,
      },
    };

    if (currentCommit) {
      const newConnection: IConnection = {
        from: currentCommit,
        to: circle,
        isBranch: false,
      };
      setConnections([...connections, newConnection]);
    }

    setCircles([...circles, circle]);
    setNewCommit(circle);
    setCurrentCommit(circle);
    setHEAD(circle.commit.hash);
  };

  const handleBranch = () => {
    if (currentCommit) {
      const rightBranchCircle = {
        x: currentCommit.x + 100,
        y: currentCommit.y + 100,
        commit: {
          label: `C${circles.length}`,
          hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
          author: "Hoàng Thế Luân",
          date: new Date(),
          message: `Branch from C${circles.length}`,
          branch: ["main", "feature-z", "new-branch"],
        },
      };

      const leftBranchCircle = {
        x: currentCommit.x - 100,
        y: currentCommit.y + 100,
        commit: {
          label: `C${circles.length + 1}`,
          hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
          author: "Hoàng Thế Luân",
          date: new Date(),
          message: `Branch from C${circles.length + 1}`,
          branch: ["main", "feature-z", "new-branch"],
        },
      };

      const newConnections: IConnection[] = [
        { from: currentCommit, to: rightBranchCircle, isBranch: true },
        { from: currentCommit, to: leftBranchCircle, isBranch: true },
      ];

      setConnections([...connections, ...newConnections]);
      setCircles([...circles, rightBranchCircle, leftBranchCircle]);
      setNewCommit(rightBranchCircle);
      setCurrentCommit(rightBranchCircle);
    }
  };

  return (
    <>
      <div style={{ display: "block" }}>
        <button onClick={handleCommit}>Commit</button>
        <button onClick={handleBranch}>Branch</button>
      </div>

      <div ref={parentRef} className="commit-graph-container">
        <Stage
          width={dynamicWidth}
          height={dynamicHeight}
          ref={stageRef}
          className="canvas-wrapper"
        >
          <Layer>
            {connections.map((connection) => {
              const { from, to, isBranch } = connection;
              const x = from.x;
              const y = from.y;
              let points = [x, y, to.x, to.y - 20];

              if (isBranch) {
                points = [x, y, x, y + 50, to.x, y + 50, to.x, to.y - 20];
              }

              return (
                <Arrow
                  key={`arrow-${from.commit.hash}-${to.commit.hash}`}
                  points={points}
                  stroke="black"
                  fill="black"
                  strokeWidth={2}
                  pointerLength={10}
                  pointerWidth={10}
                />
              );
            })}

            {circles.map((circle) => (
              <div
                key={circle.commit.hash}
                onClick={() => setCurrentCommit(circle)}
              >
                <KonvaCircle
                  id={`circle-${circle.commit.hash}`}
                  x={circle.x}
                  y={circle.y}
                  radius={20}
                  fill="#FF66D3"
                  stroke="#FFFFFF"
                  onMouseEnter={(e) => {
                    setCursorPointer(e, "pointer");
                  }}
                  onMouseLeave={(e) => {
                    setCursorPointer(e, "default");
                  }}
                />
                <Text
                  id={`text-${circle.commit.hash}`}
                  x={circle.x}
                  y={circle.y}
                  text={circle.commit.label}
                  align="center"
                  verticalAlign="middle"
                  fill="black"
                  offsetX={6}
                  offsetY={5}
                  fontStyle="bold"
                  onMouseEnter={(e) => {
                    setCursorPointer(e, "pointer");
                  }}
                  onMouseLeave={(e) => {
                    setCursorPointer(e, "default");
                  }}
                />
                {
                  circle.commit.hash === HEAD && <Square id={`tag-branch-${circle.commit.hash}`} x={circle.x + 20} y={circle.y + 40} branch={"main"} />
                }

              </div>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default CommitGraph;
