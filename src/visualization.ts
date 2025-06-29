import { TrainingHistory, VisualizationOptions } from './types';

/**
 * Render visualisasi pelatihan menggunakan Canvas 2D
 * Jika environment tanpa DOM (no document/window), function ini akan langsung return.
 */
export function renderTrainingChart(
  history: TrainingHistory[],
  options: VisualizationOptions = {}
): void {
  // Guard: jika tidak ada DOM, skip rendering
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const canvasId = 'tvmai-training-chart';
  let canvas: HTMLCanvasElement;

  if (typeof options.targetElement === 'string') {
    const container = document.getElementById(options.targetElement);
    if (container) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    } else {
      // fallback ke body jika element tidak ada
      canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    }
  } else if (options.targetElement instanceof HTMLElement) {
    canvas = document.createElement('canvas');
    options.targetElement.appendChild(canvas);
  } else {
    const existing = document.getElementById(canvasId) as HTMLCanvasElement;
    canvas = existing || document.createElement('canvas');
    document.body.appendChild(canvas);
  }

  canvas.id     = canvasId;
  canvas.width  = options.width  ?? 800;
  canvas.height = options.height ?? 600;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');

  // Background
  ctx.fillStyle = options.theme === 'dark' ? '#333' : '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.font      = '16px Arial';
  ctx.fillStyle = options.theme === 'dark' ? '#fff' : '#000';
  ctx.textAlign = 'center';
  ctx.fillText('Training Visualization', canvas.width / 2, 30);

  // Plot loss
  ctx.beginPath();
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth   = 2;
  history.forEach((pt, i) => {
    const x = 50 + (i / (history.length - 1)) * (canvas.width - 100);
    const y = canvas.height - 50 - pt.loss * (canvas.height - 100);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Plot accuracy
  ctx.beginPath();
  ctx.strokeStyle = '#2ecc71';
  ctx.lineWidth   = 2;
  history.forEach((pt, i) => {
    const x = 50 + (i / (history.length - 1)) * (canvas.width - 100);
    const y = canvas.height - 50 - pt.accuracy * (canvas.height - 100);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Legend: Loss
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(canvas.width - 160, 50, 15, 15);
  ctx.fillStyle = options.theme === 'dark' ? '#fff' : '#000';
  ctx.fillText('Loss', canvas.width - 135, 62);

  // Legend: Accuracy
  ctx.fillStyle = '#2ecc71';
  ctx.fillRect(canvas.width - 160, 75, 15, 15);
  ctx.fillStyle = options.theme === 'dark' ? '#fff' : '#000';
  ctx.fillText('Accuracy', canvas.width - 125, 87);
}
