import { describe, it, expect, vi } from 'vitest';
import { simulateTraining } from '../src/simulation';
import { renderTrainingChart } from '../src/visualization';
import { ModelWithHyperparameters } from '@galihru/tvmai';

// Mock data
const mockRecommendation: ModelWithHyperparameters = {
  model: 'Test Model',
  layers: [],
  paper: 'Test Paper',
  hyperparameters: {
    epochs: 10,
    learningRate: 0.01,
    batchSize: 32,
    validationSplit: 0.2,
    earlyStopping: true
  },
  explanation: 'Test explanation'
};

describe('Training Simulation', () => {
  it('should generate training history', () => {
    const history = simulateTraining(mockRecommendation);
    
    expect(history).toBeInstanceOf(Array);
    expect(history.length).toBe(10);
    
    // Verify each epoch has required properties
    history.forEach(epoch => {
      expect(epoch).toHaveProperty('epoch');
      expect(epoch).toHaveProperty('loss');
      expect(epoch).toHaveProperty('val_loss');
      expect(epoch).toHaveProperty('accuracy');
      expect(epoch).toHaveProperty('val_accuracy');
      expect(epoch).toHaveProperty('lr');
    });
    
    // Verify loss decreases over time
    for (let i = 1; i < history.length; i++) {
      expect(history[i].loss).toBeLessThanOrEqual(history[i-1].loss);
    }
    
    // Verify accuracy increases over time
    for (let i = 1; i < history.length; i++) {
      expect(history[i].accuracy).toBeGreaterThanOrEqual(history[i-1].accuracy);
    }
    
    // Verify learning rate decays
    for (let i = 1; i < history.length; i++) {
      expect(history[i].lr).toBeLessThanOrEqual(history[i-1].lr);
    }
  });
});

describe('Visualization', () => {
  it('should render chart to canvas', () => {
    // Setup DOM environment
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(`<!DOCTYPE html><div id="chart"></div>`);
    global.document = dom.window.document;
    global.window = dom.window;
    
    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      fillRect: vi.fn(),
      fillText: vi.fn(),
      beginPath: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      strokeStyle: '',
      lineWidth: 0,
      fillStyle: ''
    }));
    
    const history = simulateTraining(mockRecommendation);
    renderTrainingChart(history, {
      targetElement: 'chart',
      width: 800,
      height: 600
    });
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeDefined();
    expect(canvas.id).toBe('tvmai-training-chart');
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
  });
  
  it('should handle invalid target element', () => {
    const history = simulateTraining(mockRecommendation);
    
    // Should not throw when element not found
    expect(() => {
      renderTrainingChart(history, {
        targetElement: 'non-existent-element'
      });
    }).not.toThrow();
  });
});
