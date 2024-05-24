import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { result } = location.state;

  // This effect will log the result every time the component mounts or the result changes
  useEffect(() => {
    console.log('Result updated:', result);
  }, [result]);  // Dependency on result to re-trigger on change

  if (!result) {
    return <div>Loading...</div>; // Show loading state if result is not yet available
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold mb-4">Recommended Olive Oil</h3>
        <img src={result.image} alt={result.name} className="w-full max-w-sm h-auto rounded-md object-contain mb-4" />
        <h4 className="text-lg font-semibold">{result.name}</h4>
        <p>{result.description}</p>
        {result.pairings && result.pairings.length > 0 && (
          <>
            <h5 className="text-lg font-semibold mt-4">Pairs well with:</h5>
            <ul className="list-disc list-inside">
              {result.pairings.map((pairing, index) => (
                <li key={index}>{pairing}</li>
              ))}
            </ul>
          </>
        )}
        <Link to="/" className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Back to Home</Link>
      </div>
    </div>
  );
};

export default Result;
