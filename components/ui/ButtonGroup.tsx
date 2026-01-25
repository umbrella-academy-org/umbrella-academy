'use client';

import React from 'react';

export interface ButtonGroupProps {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    spacing?: 'sm' | 'md' | 'lg' | 'none';
    className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
    children,
    orientation = 'horizontal',
    spacing = 'md',
    className = '',
}) => {
    const spacingClasses = {
        none: '',
        sm: orientation === 'horizontal' ? 'gap-2' : 'gap-2',
        md: orientation === 'horizontal' ? 'gap-4' : 'gap-4',
        lg: orientation === 'horizontal' ? 'gap-6' : 'gap-6',
    };

    const orientationClasses = orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col';

    return (
        <div className={`flex ${orientationClasses} ${spacingClasses[spacing]} ${className}`}>
            {children}
        </div>
    );
};

export default ButtonGroup;
