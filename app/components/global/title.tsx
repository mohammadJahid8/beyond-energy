import React from "react";

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const headingClasses = [
  "text-5xl md:text-8xl font-bold ", // h1
  "text-4xl md:text-6xl  font-bold", // h2
  "text-2xl md:text-4xl font-semibold", // h3
  "text-xl md:text-3xl font-semibold", // h4
  "text-lg md:text-2xl font-medium", // h5
  "text-base md:text-xl font-medium", // h6
];

const Title: React.FC<TitleProps> = ({
  level = 1,
  children,
  className = "",
}) => {
  const tagMap = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
  const Tag = tagMap[(level - 1) as 0 | 1 | 2 | 3 | 4 | 5];
  const classes = `${headingClasses[level - 1]} ${className}`;
  return React.createElement(Tag, { className: classes }, children);
};

export default Title;
