import clsx from 'clsx';

export const History = ({ history, className, headingText }) => {
  return (
    <div className={clsx('bg-white flex flex-col items-center', className)}>
      <h2 className="p-1.5 rounded-t-md text-center text-wrap text-lg font-semibold bg-indigo-200 w-full">
        {headingText}
      </h2>

      <ul className="p-2 h-full w-full rounded-b-md overflow-y-auto flex flex-col gap-2">
        {history.map((item, index) => (
          <li
            key={index}
            className="border text-sm rounded-md justify-between flex flex-row items-center p-1.5 gap-1.5"
          >
            <p>{item.question}</p>
            <span className="font-semibold h-fit w-fit">{item.answer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
