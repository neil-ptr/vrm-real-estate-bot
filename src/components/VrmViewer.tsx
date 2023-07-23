'use client';

import { useContext, useCallback } from 'react';
import { ViewerContext } from '../context/vrmContext';

interface VrmViewer {
  model: string;
}

export default function VrmViewer() {
  const { viewer } = useContext(ViewerContext);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        viewer.loadVrm('/models/8988580958909680445.vrm');
      }
    },
    [viewer]
  );

  return (
    <div className={'absolute top-0 left-0 h-[100svh] -z-10'}>
      <canvas ref={canvasRef} className={'h-full w-full'}></canvas>
    </div>
  );
}
