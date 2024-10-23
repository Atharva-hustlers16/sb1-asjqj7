import React from 'react';
import { CheckCircle, AlertCircle, BarChart } from 'lucide-react';
import { Evaluation } from '../types';

interface Props {
  evaluation: Evaluation;
}

export const InterviewResults: React.FC<Props> = ({ evaluation }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <BarChart className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Interview Results</h2>
      </div>

      <div className="grid gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-700">Overall Score</h3>
          </div>
          <div className="ml-7">
            <div className="text-3xl font-bold text-gray-900">
              {Math.round(evaluation.score * 100)}%
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-700">Feedback</h3>
          </div>
          <p className="ml-7 text-gray-600">{evaluation.feedback}</p>
        </div>

        <div className="mt-4 p-4 rounded-lg" style={{
          backgroundColor: evaluation.recommendation.includes("Recommended") 
            ? '#f0fdf4' 
            : '#fef2f2'
        }}>
          <h3 className="font-semibold mb-2" style={{
            color: evaluation.recommendation.includes("Recommended")
              ? '#166534'
              : '#991b1b'
          }}>
            Final Recommendation
          </h3>
          <p className="text-gray-700">{evaluation.recommendation}</p>
        </div>
      </div>
    </div>
  );
};