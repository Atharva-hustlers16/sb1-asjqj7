import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { InterviewQuestion } from './components/InterviewQuestion';
import { InterviewResults } from './components/InterviewResults';
import { evaluateAnswer, getFeedback } from './services/api';
import { Question, Answer, Evaluation, CategoryScore } from './types';

const questions: Question[] = [
  {
    id: 1,
    text: "Can you explain how you would design a scalable microservices architecture?",
    category: "technical",
    weight: 0.4
  },
  {
    id: 2,
    text: "Describe a challenging project you led and how you handled conflicts.",
    category: "soft_skills",
    weight: 0.3
  },
  {
    id: 3,
    text: "How would you optimize a slow-performing database query?",
    category: "problem_solving",
    weight: 0.3
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswer = async (answer: string) => {
    setIsProcessing(true);
    try {
      const question = questions[currentQuestionIndex];
      const result = await evaluateAnswer(answer, question.category);
      
      const newAnswer: Answer = {
        questionId: question.id,
        response: answer,
        score: result.score
      };
      
      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Calculate category scores
        const categoryScores: CategoryScore = newAnswers.reduce((acc, curr) => {
          const question = questions.find(q => q.id === curr.questionId);
          if (question) {
            acc[question.category] = curr.score;
          }
          return acc;
        }, {} as CategoryScore);

        // Get final evaluation
        const finalEvaluation = await getFeedback(categoryScores);
        setEvaluation(finalEvaluation);
      }
    } catch (error) {
      console.error('Error processing answer:', error);
      alert('There was an error processing your answer. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Interviewer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!evaluation ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <InterviewQuestion
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              isProcessing={isProcessing}
            />
          </div>
        ) : (
          <InterviewResults evaluation={evaluation} />
        )}
      </main>
    </div>
  );
}

export default App;