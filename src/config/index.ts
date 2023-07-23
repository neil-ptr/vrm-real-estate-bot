import { Emotion } from '~/types';

export const emotionsConfigMap = new Map<
  Emotion,
  { pitch: number; rate: number }
>();

emotionsConfigMap.set('neutral', { pitch: 1, rate: 1 });
emotionsConfigMap.set('happy', { pitch: 1.2, rate: 1.2 });
emotionsConfigMap.set('sad', { pitch: 0.9, rate: 0.9 });
emotionsConfigMap.set('angry', { pitch: 0.9, rate: 1 });
emotionsConfigMap.set('relaxed', { pitch: 1, rate: 1 });
