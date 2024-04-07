import React from 'react';

const styles = {
  base: 'cursor-pointer rounded-md w-full h-[28px] bg-slate-100 text-black',
};

export function FilterButton({
  cb, filter, value, text,
}) {
  return (
    <input
      type="button"
      className={`${styles.base}  ${filter === value ? ' font-semibold' : 'bg-white'} `}
      value={text}
      onClick={() => cb()}
    />
  );
}
