import React from 'react'

const styles = {
    base: 'cursor-pointer  w-full h-[32px] bg-slate-100'
}

export const FilterButton = ({ cb, filter, value }) => {
    return (
        <input
            type="button"
            className={`${styles.base}  ${filter === value ? 'opacity-1 font-semibold' : 'opacity-50'} `}
            value={value}
            onClick={() => cb()}
        />
    )
}
