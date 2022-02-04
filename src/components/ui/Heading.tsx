import clsx from 'clsx';

export type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
  tag?: Tag;
  variant?: Tag;
  className?: string;
  children: React.ReactNode;
}

const defaultStyle = 'font-bold';

const stylesMap: { [tag in Tag]: string } = {
  h1: 'text-28px',
  h2: 'text-24px',
  h3: 'text-22px',
  h4: 'text-20px',
  h5: 'text-18px',
  h6: 'text-16px',
};

const Heading: React.VFC<Props> = ({
  tag = 'h1',
  variant,
  children,
  className,
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag className={clsx(defaultStyle, stylesMap[variant || tag], className)}>
      {children}
    </Tag>
  );
};

export default Heading;
