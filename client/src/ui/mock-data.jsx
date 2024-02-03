import { Spinner } from './spinner';

export const MockData = ({ loading }) => (
  <div className="w-full h-full justify-center items-center flex flex-col mt-8">
    <span className="text-xl text-slate-300">
      {loading ? '' : 'no data avaibale'}
    </span>
    {loading && <Spinner />}
  </div>
);
