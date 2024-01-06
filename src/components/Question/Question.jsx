import { useState } from 'react';
import clsx from 'clsx';
import { splitByUpperCase } from '../../utils/splitByUpperCase.js';

export const Question = ({ currentQuestion, onAnswer, className }) => {
  const [answer, setAnswer] = useState('');

  const renderInput = () => {
    switch (currentQuestion.inputType) {
      case 'boolean':
        return (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onAnswer('yes')}
              className="bg-blue-500 transition-colors hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => onAnswer('no')}
              className="bg-red-500 transition-colors hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              No
            </button>
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onBlur={() => onAnswer(Number(answer))}
            className="mt-2 p-2 border rounded"
          />
        );
      case 'selection':
        return (
          <select
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onBlur={() => onAnswer(answer)}
            className="mt-2 p-2 border rounded"
          >
            <option value="" selected disabled>
              Select an option
            </option>

            {currentQuestion.options.map((option) => (
              <option key={option} value={option}>
                {splitByUpperCase(option).join(' ').trim()}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center p-4 bg-white rounded-md' +
          ' shadow',
        className,
      )}
    >
      <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>

      {renderInput()}
    </div>
  );
};
