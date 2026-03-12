'use client';

import { useState, useCallback } from 'react';
import { Crosshair, MousePointer, Download, Smartphone } from 'lucide-react';
import AnnotationPin from './AnnotationPin';
import type { Annotation } from '@/types';

interface PreviewFrameProps {
  websiteUrl: string;
  previewType?: 'website' | 'android' | 'ios';
  apkUrl?: string | null;
  annotations: Annotation[];
  activeAnnotationId: string | null;
  onAnnotationClick: (annotation: Annotation) => void;
  onCreateAnnotation: (x: number, y: number) => void;
  showModeToggle?: boolean;
}

export default function PreviewFrame({
  websiteUrl,
  previewType = 'website',
  apkUrl,
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

  // Android APK preview — no iframe, show download card
  if (previewType === 'android' && !websiteUrl) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-slate-100 border border-slate-200 rounded-t-xl px-4 py-2.5 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-sm text-slate-500 truncate border border-slate-200 flex items-center gap-2">
            <Smartphone size={14} />
            Android App Preview
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
                <><Crosshair size={14} /> Annotating</>
              ) : (
                <><MousePointer size={14} /> Browse</>
              )}
            </button>
          )}
        </div>

        {/* Mobile frame */}
        <div className="relative flex-1 border border-t-0 border-slate-200 rounded-b-xl overflow-hidden bg-slate-50 flex items-center justify-center">
          <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />
            {/* Screen */}
            <div className="w-full h-full bg-white rounded-[2rem] flex flex-col items-center justify-center gap-4 overflow-hidden">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Smartphone size={32} className="text-green-600" />
              </div>
              <div className="text-center px-6">
                <p className="text-sm font-semibold text-slate-900 mb-1">Android App</p>
                <p className="text-xs text-slate-500 mb-4">Download and install the APK to preview this app</p>
                {apkUrl ? (
                  <a
                    href={apkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} />
                    Download APK
                  </a>
                ) : (
                  <p className="text-xs text-slate-400">No APK uploaded yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Annotation overlay */}
          <div
            className={`absolute inset-0 ${annotationMode ? 'cursor-crosshair' : 'pointer-events-none'}`}
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

  // iOS or mobile web — iframe in phone frame
  const isMobile = previewType === 'ios';

  return (
    <div className="flex flex-col h-full">
      {/* Browser chrome */}
      <div className="bg-slate-100 border border-slate-200 rounded-t-xl px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-sm text-slate-500 truncate border border-slate-200 flex items-center gap-2">
          {isMobile && <Smartphone size={14} />}
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
              <><Crosshair size={14} /> Annotating</>
            ) : (
              <><MousePointer size={14} /> Browse</>
            )}
          </button>
        )}
      </div>

      {/* Preview area */}
      <div className="relative flex-1 border border-t-0 border-slate-200 rounded-b-xl overflow-hidden bg-white">
        {isMobile ? (
          // Mobile phone frame with sized iframe
          <div className="flex items-center justify-center h-full bg-slate-50">
            <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />
              {/* Screen */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden">
                <iframe
                  src={websiteUrl}
                  className="w-[375px] h-[812px] border-0 origin-top-left"
                  style={{ transform: 'scale(0.7317)' }}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  title="iOS preview"
                />
              </div>
            </div>
          </div>
        ) : (
          // Desktop iframe
          <iframe
            src={websiteUrl}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            title="Website preview"
          />
        )}

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
