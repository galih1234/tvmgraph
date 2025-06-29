import { ModelWithHyperparameters } from '@galih1234/tvmai';
import { TrainingHistory } from './types';

/**
 * Simulasi proses pelatihan model
 * @param recommendation Rekomendasi model dari TVMAI
 * @returns Array history pelatihan
 */
export function simulateTraining(
  recommendation: ModelWithHyperparameters
): TrainingHistory[] {
  const history: TrainingHistory[] = [];
  const { hyperparameters } = recommendation;
  
  const initialLoss = 1.0 + Math.random() * 0.5;
  const initialAccuracy = 0.1 + Math.random() * 0.1;
  
  for (let epoch = 1; epoch <= hyperparameters.epochs; epoch++) {
    // Simulasi penurunan loss
    const progress = epoch / hyperparameters.epochs;
    const lossDecay = Math.exp(-2.5 * progress);
    const loss = initialLoss * lossDecay * (0.95 + Math.random() * 0.1);
    const valLoss = loss * (1.1 + Math.random() * 0.15);
    
    // Simulasi peningkatan akurasi
    const accuracyGain = 1 - Math.exp(-4 * progress);
    const accuracy = initialAccuracy + (0.9 - initialAccuracy) * accuracyGain * (0.97 + Math.random() * 0.06);
    const valAccuracy = accuracy * (0.95 - Math.random() * 0.08);
    
    // Simulasi learning rate decay
    const lr = hyperparameters.learningRate * Math.exp(-1.2 * progress);
    
    history.push({
      epoch,
      loss,
      val_loss: valLoss,
      accuracy,
      val_accuracy: valAccuracy,
      lr
    });
  }
  
  return history;
}
