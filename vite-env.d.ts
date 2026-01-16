/// <reference types="vite/client" />

// Figma asset imports
declare module 'figma:asset/*' {
  const content: string;
  export default content;
}

// Motion/React types
declare module 'motion/react' {
  import * as React from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    drag?: any;
    dragConstraints?: any;
    onDragEnd?: any;
    variants?: any;
    custom?: any;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    button: React.ForwardRefExoticComponent<MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;
    img: React.ForwardRefExoticComponent<MotionProps & React.ImgHTMLAttributes<HTMLImageElement>>;
    span: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLSpanElement>>;
    a: React.ForwardRefExoticComponent<MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    h1: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    h2: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    p: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLParagraphElement>>;
    [key: string]: any;
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: 'wait' | 'sync' | 'popLayout';
    initial?: boolean;
  }>;
}
