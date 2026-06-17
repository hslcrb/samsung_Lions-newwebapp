'use client';

import React, { ReactNode } from 'react';

interface RevealSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const RevealSection: React.FC<RevealSectionProps> = ({ children, className = '', id }) => {
    return (
        <section id={id} className={`reveal-section ${className}`}>
            <div className="container">
                {children}
            </div>
        </section>
    );
};
