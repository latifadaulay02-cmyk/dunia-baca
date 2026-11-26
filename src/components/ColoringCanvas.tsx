import React, { useEffect, useRef, useState } from 'react';
import { Download, Eraser, Paintbrush, RotateCcw, Undo2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

type TemplateId = 'kelinci' | 'bunga' | 'rumah' | 'naga' | 'bebas';

const TEMPLATES: { id: TemplateId; name: string }[] = [
  { id: 'kelinci', name: 'Kelinci Lucu' },
  { id: 'bunga', name: 'Taman Bunga' },
  { id: 'rumah', name: 'Rumah Jamur' },
  { id: 'naga', name: 'Naga Ceria' },
  { id: 'bebas', name: 'Gambar Bebas' },
];

const PALETTE = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#FBBF24', // Yellow
  '#10B981', // Mint Green
  '#22C55E', // Grass Green
  '#0EA5E9', // Sky Blue
  '#3B82F6', // Royal Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F472B6', // Soft Rose
  '#A16207', // Brown
  '#1E293B', // Charcoal
  '#94A3B8', // Silver
  '#FFFFFF', // White
];

const BRUSH_SIZES = [
  { label: 'Kecil', size: 6 },
  { label: 'Sedang', size: 14 },
  { label: 'Besar', size: 26 },
];

function drawTemplateOnContext(ctx: CanvasRenderingContext2D, template: TemplateId, w: number, h: number) {
  ctx.save();
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const cx = w / 2;
  const cy = h / 2;

  if (template === 'kelinci') {
    // Ears
    ctx.beginPath();
    ctx.ellipse(cx - 42, cy - 115, 22, 60, -0.15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + 42, cy - 115, 22, 60, 0.15, 0, Math.PI * 2);
    ctx.stroke();
    // Head
    ctx.beginPath();
    ctx.arc(cx, cy - 30, 72, 0, Math.PI * 2);
    ctx.stroke();
    // Eyes & nose
    ctx.beginPath();
    ctx.arc(cx - 25, cy - 42, 6, 0, Math.PI * 2);
    ctx.arc(cx + 25, cy - 42, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy - 22, 9, 6, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Body
    ctx.beginPath();
    ctx.ellipse(cx, cy + 95, 68, 72, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Carrot beside rabbit
    ctx.beginPath();
    ctx.moveTo(cx + 120, cy + 90);
    ctx.lineTo(cx + 170, cy + 150);
    ctx.lineTo(cx + 145, cy + 70);
    ctx.closePath();
    ctx.stroke();
  } else if (template === 'bunga') {
    // Stem & leaves
    ctx.beginPath();
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx, cy + 165);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx - 45, cy + 95, 42, 18, -0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + 45, cy + 115, 42, 18, 0.4, 0, Math.PI * 2);
    ctx.stroke();
    // 6 Petals
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = cx + Math.cos(angle) * 62;
      const py = cy - 45 + Math.sin(angle) * 62;
      ctx.beginPath();
      ctx.arc(px, py, 36, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy - 45, 34, 0, Math.PI * 2);
    ctx.stroke();
    // Sun corner
    ctx.beginPath();
    ctx.arc(90, 75, 36, 0, Math.PI * 2);
    ctx.stroke();
  } else if (template === 'rumah') {
    // Ground
    ctx.beginPath();
    ctx.moveTo(40, cy + 140);
    ctx.lineTo(w - 40, cy + 140);
    ctx.stroke();
    // House walls
    ctx.beginPath();
    ctx.rect(cx - 95, cy - 10, 190, 150);
    ctx.stroke();
    // Mushroom / fairytale roof
    ctx.beginPath();
    ctx.arc(cx, cy - 10, 130, Math.PI, 0);
    ctx.closePath();
    ctx.stroke();
    // Spots on roof
    ctx.beginPath();
    ctx.arc(cx - 55, cy - 60, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 50, cy - 55, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy - 95, 16, 0, Math.PI * 2);
    ctx.stroke();
    // Door
    ctx.beginPath();
    ctx.arc(cx, cy + 85, 32, Math.PI, 0);
    ctx.lineTo(cx + 32, cy + 140);
    ctx.lineTo(cx - 32, cy + 140);
    ctx.closePath();
    ctx.stroke();
    // Window
    ctx.beginPath();
    ctx.arc(cx - 55, cy + 45, 20, 0, Math.PI * 2);
    ctx.stroke();
  } else if (template === 'naga') {
    // Wings
    ctx.beginPath();
    ctx.moveTo(cx - 35, cy + 10);
    ctx.quadraticCurveTo(cx - 140, cy - 80, cx - 120, cy + 30);
    ctx.closePath();
    ctx.stroke();
    // Head
    ctx.beginPath();
    ctx.arc(cx + 30, cy - 65, 52, 0, Math.PI * 2);
    ctx.stroke();
    // Horns
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy - 112);
    ctx.lineTo(cx - 2, cy - 145);
    ctx.lineTo(cx + 26, cy - 115);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 46, cy - 115);
    ctx.lineTo(cx + 58, cy - 145);
    ctx.lineTo(cx + 68, cy - 105);
    ctx.stroke();
    // Body & tail
    ctx.beginPath();
    ctx.ellipse(cx - 10, cy + 65, 72, 82, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 78, cy + 95);
    ctx.quadraticCurveTo(cx - 150, cy + 115, cx - 135, cy + 55);
    ctx.stroke();
    // Smile & eye
    ctx.beginPath();
    ctx.arc(cx + 42, cy - 75, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();
  }
  ctx.restore();
}

export const ColoringCanvas: React.FC = () => {
  const { recordArtSaved, playClick } = useApp();
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [template, setTemplate] = useState<TemplateId>('kelinci');
  const [color, setColor] = useState('#0EA5E9');
  const [brushSize, setBrushSize] = useState(14);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const CANVAS_W = 760;
  const CANVAS_H = 480;

  const initBlankDrawingCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    const snap = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
    setHistory([snap]);
  };

  useEffect(() => {
    initBlankDrawingCanvas();
  }, []);

  useEffect(() => {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    drawTemplateOnContext(ctx, template, CANVAS_W, CANVAS_H);
  }, [template]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = getPointerPos(e);
    lastPosRef.current = pos;
    setIsDrawing(true);

    const canvas = drawCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = isEraser ? '#FFFFFF' : color;
      ctx.fill();
    }
  };

  const moveDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosRef.current) return;
    const pos = getPointerPos(e);
    const canvas = drawCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPosRef.current = pos;
  };

  const endDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPosRef.current = null;
    const canvas = drawCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      const snap = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      setHistory((prev) => [...prev.slice(-19), snap]);
    }
  };

  const handleUndo = () => {
    playClick();
    if (history.length <= 1) return;
    const nextHistory = history.slice(0, -1);
    const prevSnap = nextHistory[nextHistory.length - 1];
    const ctx = drawCanvasRef.current?.getContext('2d');
    if (ctx && prevSnap) {
      ctx.putImageData(prevSnap, 0, 0);
      setHistory(nextHistory);
    }
  };

  const handleReset = () => {
    playClick();
    initBlankDrawingCanvas();
  };

  const handleDownload = () => {
    const drawCanvas = drawCanvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!drawCanvas || !overlayCanvas) return;

    const merged = document.createElement('canvas');
    merged.width = CANVAS_W;
    merged.height = CANVAS_H;
    const mCtx = merged.getContext('2d');
    if (!mCtx) return;

    mCtx.drawImage(drawCanvas, 0, 0);
    mCtx.drawImage(overlayCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = `karya-dunia-baca-${template}.png`;
    link.href = merged.toDataURL('image/png');
    link.click();

    const templateObj = TEMPLATES.find((t) => t.id === template);
    recordArtSaved(templateObj?.name || 'Karya Seni');
  };

  return (
    <div className="space-y-6">
      {/* Template Picker */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-pink-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Pilih Gambar Mewarnai
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pilih sketsa atau kanvas kosong untuk menggambar bebas.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                playClick();
                setTemplate(t.id);
              }}
              className={`rounded-2xl px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${
                template === t.id
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-pink-50 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas & Controls Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Tools Sidebar */}
        <div className="lg:col-span-4 space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Palet Warna Ceria
            </h3>
            <div className="mt-3 grid grid-cols-7 gap-2">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    playClick();
                    setColor(c);
                    setIsEraser(false);
                  }}
                  aria-label={`Pilih warna ${c}`}
                  className={`h-9 w-9 rounded-xl border-2 transition-transform active:scale-90 ${
                    !isEraser && color === c
                      ? 'scale-110 border-slate-900 ring-2 ring-sky-400 dark:border-white'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Ukuran Kuas
            </h3>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {BRUSH_SIZES.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => {
                    playClick();
                    setBrushSize(b.size);
                  }}
                  className={`rounded-2xl border py-2 text-xs font-bold transition-colors ${
                    brushSize === b.size
                      ? 'border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                      : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsEraser(false);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold ${
                !isEraser
                  ? 'bg-sky-600 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <Paintbrush className="h-4 w-4" />
              <span>Kuas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClick();
                setIsEraser(true);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold ${
                isEraser
                  ? 'bg-amber-500 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <Eraser className="h-4 w-4" />
              <span>Hapus</span>
            </button>

            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Undo2 className="h-4 w-4" />
              <span>Undo</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            <span>Simpan Karya (+25 Poin)</span>
          </button>
        </div>

        {/* Drawing Canvas Area */}
        <div className="lg:col-span-8">
          <div className="relative overflow-hidden rounded-3xl border-2 border-sky-200 bg-white shadow-sm dark:border-slate-700">
            <canvas
              ref={drawCanvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              onPointerDown={startDraw}
              onPointerMove={moveDraw}
              onPointerUp={endDraw}
              onPointerCancel={endDraw}
              className="block w-full h-auto touch-none cursor-crosshair bg-white"
            />
            <canvas
              ref={overlayCanvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
          </div>
          <p className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400">
            Gunakan mouse atau sentuh langsung layar untuk mewarnai dengan bebas!
          </p>
        </div>
      </div>
    </div>
  );
};
