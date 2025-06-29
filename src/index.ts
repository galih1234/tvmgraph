// src/index.ts
import { ModelWithHyperparameters } from '@galih1234/tvmai';
import { simulateTraining } from './simulation';
import { renderTrainingChart } from './visualization';
import { TrainingHistory, VisualizationOptions } from './types';

/**
 * Visualisasi pelatihan model TVMAI
 * @param recommendation Rekomendasi model dari TVMAI
 * @param options Opsi visualisasi
 * @returns Data history pelatihan
 */
export function visualizeTraining(
  recommendation: ModelWithHyperparameters,
  options: VisualizationOptions = {}
): TrainingHistory[] {
  // Simulasi proses pelatihan
  const history = simulateTraining(recommendation);
  
  // Render visualisasi
  renderTrainingChart(history, options);
  
  return history;
}

/**
 * Ekspor fungsi utilitas
 */
export { simulateTraining, renderTrainingChart };
export type { TrainingHistory, VisualizationOptions };
