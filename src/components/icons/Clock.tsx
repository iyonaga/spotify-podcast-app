import { SVGProps } from 'react';

const ClockIcon: React.VFC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.25 4C9.25 3.58579 8.91421 3.25 8.5 3.25C8.08579 3.25 7.75 3.58579 7.75 4H9.25ZM8.5 8.5H7.75C7.75 8.91421 8.08579 9.25 8.5 9.25V8.5ZM13 9.25C13.4142 9.25 13.75 8.91421 13.75 8.5C13.75 8.08579 13.4142 7.75 13 7.75V9.25ZM7.75 4V8.5H9.25V4H7.75ZM8.5 9.25H13V7.75H8.5V9.25ZM8.5 16.75C13.0563 16.75 16.75 13.0563 16.75 8.5H15.25C15.25 12.2279 12.2279 15.25 8.5 15.25V16.75ZM16.75 8.5C16.75 3.94365 13.0563 0.25 8.5 0.25V1.75C12.2279 1.75 15.25 4.77208 15.25 8.5H16.75ZM8.5 0.25C3.94365 0.25 0.25 3.94365 0.25 8.5H1.75C1.75 4.77208 4.77208 1.75 8.5 1.75V0.25ZM0.25 8.5C0.25 13.0563 3.94365 16.75 8.5 16.75V15.25C4.77208 15.25 1.75 12.2279 1.75 8.5H0.25Z"
      fill="white"
    />
  </svg>
);

export default ClockIcon;