import { TrainingHistory } from './types';

/**
 * Render visualisasi pelatihan menggunakan Chart.js
 * @param history Data history pelatihan
 * @param options Opsi visualisasi
 */
export function renderTrainingChart(
  history: TrainingHistory[],
  options: VisualizationOptions = {}
): void {
  const canvasId = 'tvmai-training-chart';
  let canvas: HTMLCanvasElement;
  
  if (typeof options.targetElement === 'string') {
    const container = document.getElementById(options.targetElement);
    if (!container) throw new Error(`Element ${options.targetElement} not found`);
    canvas = document.createElement('canvas');
    canvas.id = canvasId;
    container.appendChild(canvas);
  } else if (options.targetElement instanceof HTMLElement) {
    canvas = document.createElement('canvas');
    canvas.id = canvasId;
    options.targetElement.appendChild(canvas);
  } else {
    const existing = document.getElementById(canvasId) as HTMLCanvasElement;
    canvas = existing || document.createElement('canvas');
    canvas.id = canvasId;
    document.body.appendChild(canvas);
  }
  
  // Set dimensi canvas
  canvas.width = options.width || 800;
  canvas.height = options.height || 600;
  
  // Render chart menggunakan Chart.js
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');
  
  // Implementasi rendering chart
  // (Dalam implementasi nyata, ini akan menggunakan Chart.js)
  ctx.fillStyle = options.theme === 'dark' ? '#333' : '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = '16px Arial';
  ctx.fillStyle = options.theme === 'dark' ? '#fff' : '#000';
  ctx.textAlign = 'center';
  ctx.fillText('Training Visualization', canvas.width / 2, 30);
  
  // Gambar grafik loss
  ctx.beginPath();
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 2;
  history.forEach((point, i) => {
    const x = 50 + (i / (history.length - 1)) * (canvas.width - 100);
    const y = canvas.height - 50 - (point.loss * (canvas.height - 100));
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  
  // Gambar grafik accuracy
  ctx.beginPath();
  ctx.strokeStyle = '#2ecc71';
  ctx.lineWidth = 2;
  history.forEach((point, i) => {
    const x = 50 + (i / (history.length - 1)) * (canvas.width - 100);
    const y = canvas.height - 50 - (point.accuracy * (canvas.height - 100));
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  
  // Legend
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(canvas.width - 150, 50, 20, 20);
  ctx.fillStyle = options.theme === 'dark' ? '#fff' : '#000';
  ctx.fillText('Training Loss', canvas.width - 100, 65);
  
  ctx.fillStyle = '#2ecc71';
  ctx.fillRect(canvas.width - 150, 80, 20, 20);
  ctx.fillStyle = options.theme === 'dark' ? '#fff' : '#000';
  ctx.fillText('Training Accuracy', canvas.width - 100, 95);
}
