import { SVGProps } from 'react';

const FavoriteIcon: React.VFC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 6.86222C21 8.4087 20.4062 9.8941 19.3458 10.9929C16.9049 13.523 14.5374 16.1613 12.0053 18.5997C11.4249 19.1505 10.5042 19.1304 9.9488 18.5547L2.65376 10.9929C0.448748 8.7072 0.448748 5.01723 2.65376 2.73157C4.88044 0.42345 8.50794 0.42345 10.7346 2.73157L10.9998 3.00642L11.2648 2.73173C12.3324 1.6245 13.7864 1 15.3053 1C16.8242 1 18.2781 1.62444 19.3458 2.73157C20.4063 3.83045 21 5.31577 21 6.86222Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default FavoriteIcon;