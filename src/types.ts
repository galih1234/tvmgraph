import { ModelWithHyperparameters } from '@galihridhoutomo/tvmai';

export interface TrainingHistory {
  epoch: number;
  loss: number;
  val_loss: number;
  accuracy: number;
  val_accuracy: number;
  lr: number;
}

export interface VisualizationOptions {
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
  targetElement?: string | HTMLElement;
}
