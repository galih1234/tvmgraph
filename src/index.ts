import { ModelWithHyperparameters } from './types';
import { simulateTraining }         from './simulation';
import { renderTrainingChart }      from './visualization';
import { TrainingHistory, VisualizationOptions } from './types';

/**
 * Visualisasi pelatihan model TVMAI
 */
export function visualizeTraining(
  recommendation: ModelWithHyperparameters,
  options: VisualizationOptions = {}
): TrainingHistory[] {
  const history = simulateTraining(recommendation);
  renderTrainingChart(history, options);
  return history;
}

export { simulateTraining, renderTrainingChart };
export type { TrainingHistory, VisualizationOptions };
