import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Question } from '../types';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  isProcessing: boolean;
}

export const InterviewQuestion: React.FC<Props> = ({ question, onAnswer, isProcessing }) => {
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onAnswer(answer);
      setAnswer('');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <MessageSquare className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {question.text}
          </h3>
          <span className="inline-block px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded-full mb-4">
            {question.category}
          </span>
          <form onSubmit={handleSubmit}>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Type your answer here..."
              disabled={isProcessing}
            />
            <button
              type="submit"
              className={`mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Submit Answer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};