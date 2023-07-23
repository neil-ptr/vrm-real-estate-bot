"use client";

import { useContext, useCallback } from "react";
import { ViewerContext } from "../context/vrmContext";

export interface MetaData {
  role: string;
  id: string;
  area: string;
  budget: string;
  rooms: number;
  bathrooms: number;
  description: string;
  motivation: string;
}

interface VrmViewer {
  model: string;
  metadata: MetaData | undefined;
  evaluate: () => void;
  isLoadingEvaluateChat: boolean;
}

export default function VrmViewer({ model, metadata, evaluate, isLoadingEvaluateChat }: VrmViewer) {
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
    <div className={"absolute top-0 left-0 h-[100svh]"}>
      <canvas ref={canvasRef} className={"h-full w-full"}></canvas>
    </div>
  );
}
