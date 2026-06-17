'use client';

import React, { useRef, useEffect } from 'react';

interface CanvasImageProps {
    src: string;
    alt?: string;
    className?: string;
}

/**
 * 브라우저 개발자 도구에서 실제 이미지 URL을 바로 보기 어렵게 만드는 Canvas 기반 이미지 컴포넌트
 */
export const CanvasImage: React.FC<CanvasImageProps> = ({ src, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    }, [src]);

    return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: 'auto', display: 'block' }} />;
};

interface CanvasVideoProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
}

/**
 * 비디오 소스를 Canvas에 렌더링하여 구조를 숨기는 컴포넌트
 */
export const CanvasVideo: React.FC<CanvasVideoProps> = ({ src, className, autoPlay = true, loop = true, muted = true }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = autoPlay;
        video.loop = loop;
        video.muted = muted;
        video.playsInline = true;
        videoRef.current = video;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const renderFrame = () => {
            if (video.readyState >= video.HAVE_CURRENT_DATA) {
                if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }
                ctx.drawImage(video, 0, 0);
            }
            animationId = requestAnimationFrame(renderFrame);
        };

        video.play().then(() => {
            renderFrame();
        });

        return () => {
            cancelAnimationFrame(animationId);
            video.pause();
            video.src = "";
            video.load();
        };
    }, [src, autoPlay, loop, muted]);

    return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
};
