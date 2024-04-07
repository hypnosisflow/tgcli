import React from "react";
import { FilterButton } from "../buttons/FilterButton";

function LengthFilters({ filter, doFilter, chatData }) {
    return (
        <div className="flex justify-between mb-3">
            <div className="text-sm w-[320px] flex">
                <FilterButton
                    cb={() => doFilter('initial', chatData.data)}
                    filter={filter}
                    text="Initial"
                    value="initial"
                />
                <FilterButton
                    cb={() => doFilter('top-10', chatData.data)}
                    filter={filter}
                    text="Top 10"
                    value="top-10"
                />
                <FilterButton
                    cb={() => doFilter('top-25', chatData.data)}
                    filter={filter}
                    text="Top 25"
                    value="top-25"
                />
            </div>
        </div>
    );
}

export default LengthFilters;