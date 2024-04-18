import React from 'react';

const styles = {
  base: 'px-4 h-[28px] bg-black w-full  text-sm',
  theme: {
    smoke: 'bg-slate-100  text-gray-500 font-semibold rounded-md',
    black: 'bg-black text-white  font-semibold rounded-md',
  },
};

export function Button({
  cb, value, theme, disabled, type = 'button', className
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={type === 'button' ? () => cb() : null}
      className={`${styles.base} ${styles.theme[theme]} ${className}`}
    >
      {value}
    </button>
  );
}
