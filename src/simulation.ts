import { ModelWithHyperparameters } from './types';
import { TrainingHistory }          from './types';

/**
 * Simulasi proses pelatihan model
 */
export function simulateTraining(
  recommendation: ModelWithHyperparameters
): TrainingHistory[] {
  const history: TrainingHistory[] = [];
  const { hyperparameters } = recommendation;

  const initialLoss     = 1.0 + Math.random() * 0.5;
  const initialAccuracy = 0.1 + Math.random() * 0.1;

  for (let epoch = 1; epoch <= hyperparameters.epochs; epoch++) {
    const progress = epoch / hyperparameters.epochs;

    // Loss decay
    const loss    = initialLoss * Math.exp(-2.5 * progress) * (0.95 + Math.random() * 0.1);
    const valLoss = loss * (1.1 + Math.random() * 0.15);

    // Accuracy gain
    const accuracy    = initialAccuracy +
      (0.9 - initialAccuracy) * (1 - Math.exp(-4 * progress)) * (0.97 + Math.random() * 0.06);
    const valAccuracy = accuracy * (0.95 - Math.random() * 0.08);

    // Learning rate decay
    const lr = hyperparameters.learningRate * Math.exp(-1.2 * progress);

    history.push({ epoch, loss, val_loss: valLoss, accuracy, val_accuracy: valAccuracy, lr });
  }

  return history;
}
