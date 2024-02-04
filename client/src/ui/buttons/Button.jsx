import React from 'react'

const styles = {
    base: "px-4 h-[28px] bg-black w-[320px]  text-sm",
    theme: {
        smoke: 'bg-slate-100 text-xs text-gray-500 font-semibold rounded-md',
        black: 'bg-black text-white w-[320px] font-semibold rounded-md'

    }
}

export const Button = ({ cb, value, theme, disabled, type = 'button' }) => {

    return (
        <button
            disabled={disabled}
            type={type}
            onClick={cb}
            className={styles.base + ' ' + styles.theme[theme]}>
            {value}
        </button >
    )
}
