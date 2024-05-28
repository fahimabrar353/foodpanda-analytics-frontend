// src/CounterCard.jsx
import { useState } from "react";

function CounterCard() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/CounterCard.jsx</code> and save to test HMR
      </p>
    </div>
  );
}

export default CounterCard;
