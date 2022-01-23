import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  href: string;
  isExternal?: boolean;
}

const LinkButton: React.VFC<Props> = ({
  children,
  href,
  isExternal,
  ...props
}) => {
  const Button = (
    <div className="inline-block">
      <div className="flex justify-center items-center px-[20px] min-w-[160px] h-[40px] text-[14px] font-bold hover:bg-[#2a2838] rounded-[20px] border-[1px] border-white border-solid transition">
        <div>{children}</div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {Button}
      </a>
    );
  }

  return (
    <Link href={href}>
      <a {...props}>{Button}</a>
    </Link>
  );
};

export default LinkButton;
