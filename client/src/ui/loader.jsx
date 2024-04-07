import React from 'react';
import { Spinner } from './spinner';

function Loader() {
    return (
        <section className="w-full h-auto flex flex-col items-center justify-center">
            <Spinner />
        </section>
    );
}

export default Loader;
