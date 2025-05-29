'use client';

import { useState } from 'react';
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";

interface CounterButtonProps {
  count: number;
  onChange: (count: number) => void;
}

export default function CounterButton({count, onChange}: CounterButtonProps) {

  return (
    <div className="flex justify-center items-center min-h-[50px]">
      {count === 0 ? (
        <button
          className="border-2 border-black rounded-lg md:px-6 px-3 py-3 md:text-lg text-xs font-semibold"
          onClick={() => onChange(1)}
        >
          Tambah
        </button>
      ) : (
        <div className="flex items-center border-2 border-black rounded-lg lg:px-4 px-2 md:py-2 py-1 text-lg font-semibold lg:space-x-4 space-x-2">
          <button onClick={() => onChange(count - 1)}
          >
            <LuCircleMinus className="md:w-10 md:h-10 h-5 w-5" strokeWidth={1}/>
          </button>
          <span>{count}</span>
          <button onClick={() => onChange(count + 1)}
          >
            <LuCirclePlus className="h-5 w-5 md:w-10 md:h-10" strokeWidth={1}/>
          </button>
        </div>
      )}
    </div>
  );
}
