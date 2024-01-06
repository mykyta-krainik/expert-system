import clsx from 'clsx';
import { splitByUpperCase } from '../../utils/splitByUpperCase.js';

export const Results = ({ results, onRestart, className }) => {
  return (
    <div
      className={clsx(
        'overflow-y-auto bg-white rounded-md p-4 flex flex-col gap-4 items-center justify-center',
        className,
      )}
    >
      <h2 className="text-lg font-semibold">Results</h2>

      <table>
        <thead>
          <tr>
            <th className="text-left">Outcome</th>
            <th className="text-left">Relevance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([outcome, relevance]) => (
            <tr key={outcome}>
              <td>{splitByUpperCase(outcome)}</td>
              <td className="text-right">{Number(relevance).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
      >
        Restart
      </button>
    </div>
  );
};
