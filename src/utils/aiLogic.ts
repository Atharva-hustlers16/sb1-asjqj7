import LogisticRegression from 'ml-logistic-regression';

export class AIInterviewer {
  private model: LogisticRegression;
  private weights: number[];

  constructor() {
    this.model = new LogisticRegression({
      numSteps: 1000,
      learningRate: 0.5
    });
    this.weights = [0.3, 0.3, 0.4]; // Technical, Soft Skills, Problem Solving
  }

  evaluateAnswer(answer: string, confidence: number, category: string): number {
    // Simple evaluation based on answer length and confidence
    const baseScore = Math.min((answer.length / 100) * confidence, 1);
    
    // Apply category weights
    switch(category) {
      case 'technical':
        return baseScore * this.weights[0];
      case 'soft':
        return baseScore * this.weights[1];
      case 'problem-solving':
        return baseScore * this.weights[2];
      default:
        return baseScore;
    }
  }

  generateFeedback(scores: number[]): string {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    if (avgScore > 0.8) {
      return "Exceptional performance! Strong technical knowledge and communication skills.";
    } else if (avgScore > 0.6) {
      return "Good performance. Shows promise but some areas need improvement.";
    } else {
      return "Further preparation recommended. Focus on strengthening core concepts.";
    }
  }

  makeRecommendation(scores: number[]): string {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avgScore > 0.7 ? "Recommended for next round" : "Consider other candidates";
  }
}