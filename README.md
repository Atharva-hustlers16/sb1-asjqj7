# AI Interviewer

An intelligent interviewing system built with React, TypeScript, and Python, featuring real-time answer evaluation using machine learning techniques.

## Features

- Real-time answer evaluation
- Category-specific scoring (Technical, Soft Skills, Problem Solving)
- ML-based feedback generation
- Beautiful UI with Tailwind CSS
- Progress tracking
- Comprehensive result analysis

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - Axios

- Backend:
  - Python
  - NumPy
  - HTTP Server

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-interviewer.git
   cd ai-interviewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Python backend server:
   ```bash
   python3 src/server/app.py
   ```

4. In a new terminal, start the frontend development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local server URL shown in the terminal.

## Project Structure

```
ai-interviewer/
├── src/
│   ├── components/          # React components
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   ├── server/             # Python backend
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── package.json           # Project configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.