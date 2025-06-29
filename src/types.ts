import { recommendModel } from '@galihridhoutomo/tvmai';

/** 
 * Tipe rekomendasi model lengkap dengan hyperparameters 
 * yang dikembalikan oleh fungsi recommendModel()
 */
export type ModelWithHyperparameters = ReturnType<typeof recommendModel>;

export interface TrainingHistory {
  epoch:       number;
  loss:        number;
  val_loss:    number;
  accuracy:    number;
  val_accuracy:number;
  lr:          number;
}

export interface VisualizationOptions {
  width?:         number;
  height?:        number;
  theme?:         'light' | 'dark';
  targetElement?: string | HTMLElement;
}
