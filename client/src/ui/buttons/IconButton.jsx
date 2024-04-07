import React from 'react';
import arrow from '../../assets/arrow_down.svg';
import close from '../../assets/cls.svg';

const { log } = console;

const ICONS = {
  arrow,
  close,
};

const styles = {
  base: 'p-0  right-0  bg-white flex justify-center items-center rounded-full hover:border-white',
  theme: {
    arrow: ICONS.arrow,
    close: ICONS.close,
  },
};

export function IconButton({ cb, value, theme }) {
  return (
    <button
      onClick={cb}
      className={styles.base}
    >
      <img
        src={styles.theme[value]}
        alt="icon"
        className=" w-[18px] h-[18px]"
      />
    </button>
  );
}
