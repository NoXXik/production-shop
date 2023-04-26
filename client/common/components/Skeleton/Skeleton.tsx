import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

type SkeletonProps = {
    width?: string;
    height?: string;
    borderRadius?: string;
    animationDuration?: number;
    backgroundColor?: string;
};

const skeletonLoading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const SkeletonElement = styled.div<SkeletonProps>`
  width: ${({ width }: {width: string | undefined}) => width || '100%'};
  height: ${({ height }: {height: string | undefined}) => height || '100%'};
  border-radius: ${({ borderRadius }: {borderRadius: string | undefined}) => borderRadius || '0'};
  background-color: ${({ backgroundColor }: {backgroundColor: string | undefined}) => backgroundColor || '#e5e5e5'};
  animation: ${skeletonLoading} ${({ animationDuration }: {animationDuration: number | undefined}) => animationDuration || 1}s ease-in-out infinite;
`;

const Skeleton: FC<SkeletonProps> = ({ width, height, borderRadius, animationDuration, backgroundColor }: SkeletonProps) => {
    return (
        <SkeletonElement width={width} height={height} borderRadius={borderRadius} animationDuration={animationDuration} backgroundColor={backgroundColor} />
    );
};

export default Skeleton;
