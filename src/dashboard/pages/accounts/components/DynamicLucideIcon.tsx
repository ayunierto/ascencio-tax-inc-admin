// src/components/DynamicLucideIcon.tsx

import React from 'react';
import * as icons from 'lucide-react';
import { type LucideProps, type LucideIcon } from 'lucide-react';

interface DynamicLucideIconProps extends LucideProps {
  name: string;
}

type IconCollection = { [key: string]: LucideIcon };

const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({
  name,
  ...props
}) => {
  const allIcons = icons as IconCollection;

  const IconComponent = allIcons[name];

  if (!IconComponent) {
    return <icons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

export default DynamicLucideIcon;
