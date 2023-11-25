import React from 'react';

export function Button({ ...props }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center mix-blend-luminosity text-white/50 transition hover:text-white/100 focus:outline-none"
      {...props}
    >
      {props.icon}
      <span className="text-xs">{props.label}</span>
    </button>
  );
}