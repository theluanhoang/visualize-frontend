type ColorKey = 
  | 'goldenSand' 
  | 'blossomPink' 
  | 'violetDream' 
  | 'royalPurple' 
  | 'vividPink' 
  | 'softMint' 
  | 'sunsetOrange' 
  | 'earthBrown' 
  | 'peachCream' 
  | 'tealGreen' 
  | 'sageGreen' 
  | 'rustRed' 
  | 'lavenderDream' 
  | 'forestGreen' 
  | 'lightEmerald';

const colors: Record<ColorKey, string> = {
  goldenSand: "#E6D9A2",
  blossomPink: "#CB80AB",
  violetDream: "#8967B3",
  royalPurple: "#624E88",
  vividPink: "#FF66D3",
  softMint: "#C9DABF",
  sunsetOrange: "#FF8343",
  earthBrown: "#A28B55",
  peachCream: "#FFDBB5",
  tealGreen: "#229799",
  sageGreen: "#6A9C89",
  rustRed: "#C96868",
  lavenderDream: "#A594F9",
  forestGreen: "#347928",
  lightEmerald: "#73EC8B",
};

export default colors;
