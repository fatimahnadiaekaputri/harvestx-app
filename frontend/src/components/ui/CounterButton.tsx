'use client';

import { useState } from 'react';
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";

export default function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-[50px]">
      {count === 0 ? (
        <button
          className="border-2 border-black rounded-lg px-6 py-3 text-lg font-semibold"
          onClick={() => setCount(1)}
        >
          Tambah
        </button>
      ) : (
        <div className="flex items-center border-2 border-black rounded-lg lg:px-6 px-2 py-3 text-lg font-semibold lg:space-x-4 space-x-2">
          <button onClick={() => setCount(count - 1)}
          >
            <LuCircleMinus size={40} strokeWidth={1}/>
          </button>
          <span>{count}</span>
          <button onClick={() => setCount(count + 1)}
          >
            <LuCirclePlus size={40} strokeWidth={1}/>
          </button>
        </div>
      )}
    </div>
  );
}
