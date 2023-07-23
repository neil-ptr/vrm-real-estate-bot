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
      {metadata && (
        <div className="absolute bottom-0 w-full z-1">
          <div className="flex justify-center pb-8">
            <div className="flex flex-col">
              <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6 mt-4 text-black">
                <h2 className="text-xl font-semibold mb-4">Client Information</h2>
                <p>
                  <strong>Role:</strong> {metadata.role}
                </p>

                <p>
                  <strong>Area:</strong> {metadata.area}
                </p>
                <p>
                  <strong>Budget:</strong> {metadata.budget}
                </p>
                <p>
                  <strong>Rooms:</strong> {metadata.rooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {metadata.bathrooms}
                </p>
                <p>
                  <strong>Description:</strong> {metadata.description}
                </p>
                <p>
                  <strong>Motivation:</strong> {metadata.motivation}
                </p>
              </div>

              <button
                disabled={isLoadingEvaluateChat}
                onClick={() => {
                  evaluate();
                }}
                className="rounded-lg bg-white text-black py-2 mt-2 cursor-pointer z-20"
              >
                {isLoadingEvaluateChat ? "Evaluating..." : "Evaluate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
