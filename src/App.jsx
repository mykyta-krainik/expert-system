import { useState } from 'react';
import investmentStrategies from './data/investmentsStrategies.json';
import { History, Question, Results } from './components/index.js';
import { splitByUpperCase } from './utils/splitByUpperCase.js';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [strategy, setStrategy] = useState('');
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    const newHistoryItem = {
      question: currentQuestion.question,
      answer,
    };
    setHistory((prevHistory) => [...prevHistory, newHistoryItem]);

    const newResults = calculateOutcome(currentQuestion, answer);

    setResults(newResults);

    if (!currentQuestion['next']) {
      setShowResults(true);

      return;
    }

    const strategyInfo = investmentStrategies['strategies'][strategy];

    if (typeof currentQuestion['next'] === 'object') {
      const nextQuestionKey = currentQuestion.next[answer];
      const nextQuestion = strategyInfo.questions[nextQuestionKey];

      setCurrentQuestion(nextQuestion);

      return;
    }

    const nextQuestionName = currentQuestion.next;
    const nextQuestion = strategyInfo.questions[nextQuestionName];

    setCurrentQuestion(nextQuestion);
  };

  const calculateOutcome = (question, answer) => {
    const outcomeScores = { ...results };

    if (question['inputType'] === 'number') {
      const ranges = question.relevanceAdjustment;

      Object.keys(ranges).forEach((range) => {
        if (doesAnswerFitRange(answer, range)) {
          const adjustment = ranges[range];

          Object.keys(adjustment).forEach((outcome) => {
            outcomeScores[outcome] += adjustment[outcome];
          });
        }
      });

      return outcomeScores;
    }

    const adjustment = question.relevanceAdjustment[answer];

    Object.keys(adjustment).forEach((outcome) => {
      outcomeScores[outcome] += adjustment[outcome];
    });

    return outcomeScores;
  };

  const doesAnswerFitRange = (answer, range) => {
    if (range.includes('≥')) {
      const limit = parseInt(range.slice(1), 10);

      return answer >= limit;
    } else if (range.includes('≤')) {
      const limit = parseInt(range.slice(1), 10);

      return answer <= limit;
    } else if (range.includes('>')) {
      const limit = parseInt(range.slice(1), 10);

      return answer > limit;
    } else if (range.includes('<')) {
      const limit = parseInt(range.slice(1), 10);

      return answer < limit;
    } else if (range.includes('-')) {
      const [min, max] = range.split('-').map(Number);

      return answer >= min && answer <= max;
    } else {
      return answer === Number(range);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(investmentStrategies.initialQuestion);
    setHistory([]);
    setResults({});
    setShowResults(false);
    setStrategy('');
  };

  const handleStrategySelect = (strategy) => {
    setStrategy(strategy);
    setCurrentQuestion(
      investmentStrategies['strategies'][strategy].initialQuestion,
    );
    setResults(investmentStrategies['strategies'][strategy].initialOutcomes);
  };

  return (
    <div className="flex flex-row gap-2 h-screen w-screen bg-gray-100 p-2 text-gray-700">
      {strategy ? (
        <>
          <History
            history={history}
            headingText={`History (${splitByUpperCase(strategy).join(' ')})`}
            className="grow-0 h-full basis-60"
          />

          <section className="h-full grow">
            {showResults ? (
              <Results
                results={results}
                onRestart={handleRestart}
                className="w-full h-full"
              />
            ) : (
              <Question
                key={currentQuestion.question}
                currentQuestion={currentQuestion}
                onAnswer={handleAnswer}
                className="w-full h-full"
              />
            )}
          </section>
        </>
      ) : (
        <Question
          currentQuestion={investmentStrategies}
          onAnswer={handleStrategySelect}
          className="w-full h-full"
        />
      )}
    </div>
  );
}

export default App;
