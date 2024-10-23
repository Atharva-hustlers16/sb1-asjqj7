from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import numpy as np
from collections import defaultdict

class MLModel:
    def __init__(self):
        # Initialize weights for different aspects
        self.weights = {
            'technical': 0.4,
            'soft_skills': 0.3,
            'problem_solving': 0.3
        }
        
        # Pre-defined keywords for each category
        self.keywords = {
            'technical': ['architecture', 'system', 'design', 'scalable', 'database', 'api', 'cloud'],
            'soft_skills': ['team', 'communicate', 'lead', 'manage', 'collaborate', 'resolve'],
            'problem_solving': ['analyze', 'solve', 'optimize', 'improve', 'solution', 'approach']
        }
        
    def analyze_answer(self, text, category):
        # Convert text to lowercase for analysis
        text = text.lower()
        
        # Count relevant keywords
        category_keywords = self.keywords.get(category, [])
        keyword_count = sum(1 for keyword in category_keywords if keyword in text)
        
        # Calculate base score based on keyword density and answer length
        word_count = len(text.split())
        keyword_density = keyword_count / max(word_count, 1)
        length_score = min(word_count / 100, 1)  # Normalize length score
        
        # Combine scores with weights
        base_score = (keyword_density * 0.6 + length_score * 0.4)
        weighted_score = base_score * self.weights.get(category, 0.3)
        
        return min(weighted_score, 1.0)  # Ensure score doesn't exceed 1.0

    def generate_feedback(self, scores):
        avg_score = np.mean(list(scores.values()))
        
        if avg_score >= 0.8:
            return {
                'score': avg_score,
                'feedback': "Outstanding performance! Your responses demonstrate excellent technical knowledge and communication skills.",
                'recommendation': "Highly recommended for next round"
            }
        elif avg_score >= 0.6:
            return {
                'score': avg_score,
                'feedback': "Good performance. You showed solid understanding but there's room for improvement.",
                'recommendation': "Recommended for next round"
            }
        else:
            return {
                'score': avg_score,
                'feedback': "More preparation recommended. Focus on strengthening your technical knowledge and communication.",
                'recommendation': "Consider other candidates"
            }

class InterviewHandler(BaseHTTPRequestHandler):
    ml_model = MLModel()
    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        if self.path == '/api/evaluate':
            answer = data.get('answer', '')
            category = data.get('category', 'technical')
            
            score = self.ml_model.analyze_answer(answer, category)
            evaluation = {
                'score': score,
                'category': category
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(evaluation).encode())
            
        elif self.path == '/api/feedback':
            scores = data.get('scores', {})
            feedback = self.ml_model.generate_feedback(scores)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(feedback).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, InterviewHandler)
    print('Starting server on port 8000...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()