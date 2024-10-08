import React from 'react';

import { Tooltip, TooltipPosition } from '@patternfly/react-core';

import UrlDecoratorIcon from '../../Icons/UrlDecoratorIcon';
import Decorator from './Decorator';

interface DefaultDecoratorProps {
  url?: string;
  radius: number;
  x: number;
  y: number;
}

export const UrlDecorator = ({ url, radius, x, y }: DefaultDecoratorProps) => {
  const decoratorRef = React.useRef<SVGGElement | null>(null);

  if (!url) {
    return null;
  }
  const label = 'Open URL';
  return (
    <Tooltip
      key="route"
      content={label}
      position={TooltipPosition.right}
      triggerRef={decoratorRef}
    >
      <g ref={decoratorRef}>
        <Decorator
          x={x}
          y={y}
          radius={radius}
          href={url}
          external
          ariaLabel={label}
        >
          <g transform={`translate(-${radius / 2}, -${radius / 2})`}>
            <UrlDecoratorIcon style={{ fontSize: radius }} />
          </g>
        </Decorator>
      </g>
    </Tooltip>
  );
};
