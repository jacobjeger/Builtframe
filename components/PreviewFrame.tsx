'use client';

import { useState, useCallback } from 'react';
import { Crosshair, MousePointer } from 'lucide-react';
import AnnotationPin from './AnnotationPin';
import type { Annotation } from '@/types';

interface PreviewFrameProps {
  websiteUrl: string;
  annotations: Annotation[];
  activeAnnotationId: string | null;
  onAnnotationClick: (annotation: Annotation) => void;
  onCreateAnnotation: (x: number, y: number) => void;
  showModeToggle?: boolean;
}

export default function PreviewFrame({
  websiteUrl,
  annotations,
  activeAnnotationId,
  onAnnotationClick,
  onCreateAnnotation,
  showModeToggle = true,
}: PreviewFrameProps) {
  const [annotationMode, setAnnotationMode] = useState(false);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!annotationMode) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      onCreateAnnotation(x, y);
    },
    [annotationMode, onCreateAnnotation]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Browser chrome */}
      <div className="bg-slate-100 border border-slate-200 rounded-t-xl px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-sm text-slate-500 truncate border border-slate-200">
          {websiteUrl}
        </div>
        {showModeToggle && (
          <button
            onClick={() => setAnnotationMode(!annotationMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              annotationMode
                ? 'bg-primary text-white shadow-sm shadow-primary/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {annotationMode ? (
              <>
                <Crosshair size={14} /> Annotating
              </>
            ) : (
              <>
                <MousePointer size={14} /> Browse
              </>
            )}
          </button>
        )}
      </div>

      {/* Preview area */}
      <div className="relative flex-1 border border-t-0 border-slate-200 rounded-b-xl overflow-hidden bg-white">
        <iframe
          src={websiteUrl}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title="Website preview"
        />

        {/* Annotation overlay */}
        <div
          className={`absolute inset-0 ${
            annotationMode ? 'cursor-crosshair' : 'pointer-events-none'
          }`}
          onClick={handleOverlayClick}
        >
          {annotations.map((annotation, index) => (
            <AnnotationPin
              key={annotation.id}
              x={annotation.x_percent}
              y={annotation.y_percent}
              number={index + 1}
              status={annotation.status}
              isActive={annotation.id === activeAnnotationId}
              onClick={() => onAnnotationClick(annotation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
