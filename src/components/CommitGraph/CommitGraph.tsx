import SHA1 from 'crypto-js/sha1';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { Arrow, Circle as KonvaCircle, Layer, Stage, Text } from 'react-konva';
import { ICircle } from '../../interfaces/ITree';
import './CommitGraph.css';

const CommitGraph: React.FC = () => {
  const stageRef = useRef<any>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<ICircle[]>([]);
  const [coordinates, setCoordinates] = useState<{ x: number, y: number }>({x: 0, y: 0});
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [newCommit, setNewCommit] = useState<ICircle | null>();
  const [currentCommit, setCurrentCommit] = useState<ICircle | null>();
  
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
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    const maxY = Math.max(...circles.map((circle) => circle.y));
    setDynamicHeight(maxY + 100);
  }, [circles]);

  useEffect(() => {
    if (newCommit) {
      const circleNode = stageRef.current.findOne(`#circle-${newCommit.commit.hash}`);
      const textNode = stageRef.current.findOne(`#text-${newCommit.commit.hash}`);

      if (circleNode && textNode) {
        gsap.fromTo(
          circleNode,
          { y: circleNode.y() - 100 }, 
          { y: circleNode.y(), duration: 0.5, ease: 'bounce.out' }
        );

        gsap.fromTo(
          textNode,
          { y: textNode.y() - 100 }, 
          { y: textNode.y(), duration: 0.5, ease: 'bounce.out' }
        );
      }
    }
  }, [newCommit]);

  const handleCommit = () => {
    const circle = {
      x: coordinates.x,
      y: coordinates.y + (circles.length * 100),
      commit: {
        label: `C${circles.length}`,
        hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
        author: 'Hoàng Thế Luân',
        date: new Date(),
        message: `Commit: ${circles.length}`,
        branch: ['main', 'feature-z'],
      },
    };

    setCircles([...circles, circle]);
    setNewCommit(circle);
    setCurrentCommit(circle);
  };

  const handleBranch = () => {
    if (currentCommit) {

        const branchCircle = {
          x: coordinates.x + 100,
          y: currentCommit.y + 100,
          commit: {
            label: `Branch-${circles.length}`,
            hash: SHA1(Math.random().toString(36).slice(-8)).toString(),
            author: 'Hoàng Thế Luân',
            date: new Date(),
            message: `Branch from C${circles.length}`,
            branch: ['main', 'feature-z', 'new-branch'],
          },
        };

        setCircles([...circles, branchCircle]);
        setNewCommit(branchCircle);
    }
  };

  return (
    <>
      <div style={{ display: 'block' }}>
        <button onClick={handleCommit}>Commit</button>
        <button onClick={handleBranch}>Branch</button>
      </div>

      <div ref={parentRef} className='commit-graph-container'>
        <Stage width={dimensions.width} height={dynamicHeight} ref={stageRef}>
          <Layer>
            {circles.map((circle, index) => {
              if (index < circles.length - 1) {
                const nextCircle = circles[index + 1];
                const x = currentCommit?.x || circle.x;
                const y = currentCommit?.y || circle.y;

                return (
                  <Arrow
                    key={`arrow-${circle.commit.hash}`}
                    points={[x, y, nextCircle.x, nextCircle.y - 20]}
                    stroke="black"
                    fill="black"
                    pointerLength={10}
                    pointerWidth={10}
                  />
                );
              }
              return null;
            })}

            {circles.map((circle) => (
              <React.Fragment key={circle.commit.hash}>
                <KonvaCircle
                  id={`circle-${circle.commit.hash}`}
                  x={circle.x}
                  y={circle.y}
                  radius={20}
                  fill="#FF66D3"
                  stroke="#FFFFFF"
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
                />
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default CommitGraph;
