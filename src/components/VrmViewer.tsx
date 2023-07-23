'use client';

import { useContext, useCallback } from 'react';
import { ViewerContext } from '../context/vrmContext';

interface VrmViewer {
  model: string;
}

export default function VrmViewer({ model }: VrmViewer) {
  const { viewer } = useContext(ViewerContext);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.unloadVRM();
        viewer.setup(canvas);
        viewer.loadVrm(`/models/${model}.vrm`);
      }
    },
    [viewer, model]
  );

  return (
    <div className={'absolute top-0 left-0 h-[100svh] -z-10'}>
      <canvas ref={canvasRef} className={'h-full w-full'}></canvas>
    </div>
  );
}
