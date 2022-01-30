import clsx from 'clsx';

interface Props {
  className?: string;
}

const Spinner: React.VFC<Props> = ({ className }) => (
  <div className={clsx('flex justify-center', className)}>
    <div className="inline-block w-8 h-8 rounded-full border-4 border-[#5d5f81] border-t-transparent animate-spin" />
  </div>
);

export default Spinner;
