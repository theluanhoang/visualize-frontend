export interface ICanvasProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export interface IContentOfCircle {
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  message?: string;
}

export interface ICircleTemp {
  id: number;
  x: number;
  y: number;
  radius?: number;
  backgroundColor?: string;
  content?: IContentOfCircle;
  strokeColor?: string;
  lineWidth?: number;
}

export interface ICommit {
  label: string;
  hash: string;
  author: string;
  date: Date;
  message: string;
  branch: string[];
}

export interface ICircle {
  x: number;
  y: number;
  commit: ICommit;
}
