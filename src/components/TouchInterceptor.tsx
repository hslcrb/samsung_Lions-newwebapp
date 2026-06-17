'use client';

import React from 'react';

/**
 * 터치 및 클릭 인터셉터 레이어. 
 * 배경 영상 등의 조작을 방지하기 위해 상단에 투명하게 배치됩니다.
 */
export const TouchInterceptor: React.FC = () => {
    return (
        <div
            className="absolute inset-0 z-[15] bg-transparent cursor-default select-none"
            onContextMenu={(e) => e.preventDefault()}
        />
    );
};
