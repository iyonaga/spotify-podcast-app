import { SVGProps } from 'react';

const SearchIcon: React.VFC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.0303 13.9697C14.7374 13.6768 14.2626 13.6768 13.9697 13.9697C13.6768 14.2626 13.6768 14.7374 13.9697 15.0303L15.0303 13.9697ZM18.4697 19.5303C18.7626 19.8232 19.2374 19.8232 19.5303 19.5303C19.8232 19.2374 19.8232 18.7626 19.5303 18.4697L18.4697 19.5303ZM14.1764 14.1619L13.6454 13.6322L13.6453 13.6322L14.1764 14.1619ZM13.9697 15.0303L18.4697 19.5303L19.5303 18.4697L15.0303 13.9697L13.9697 15.0303ZM0.25 8.71429C0.25 13.389 4.03959 17.1786 8.71429 17.1786V15.6786C4.86802 15.6786 1.75 12.5605 1.75 8.71429H0.25ZM8.71429 17.1786C11.0554 17.1786 13.1759 16.2271 14.7074 14.6915L13.6453 13.6322C12.3838 14.8972 10.6409 15.6786 8.71429 15.6786V17.1786ZM14.7074 14.6915C16.2337 13.1612 17.1786 11.0474 17.1786 8.71429H15.6786C15.6786 10.6343 14.9026 12.3717 13.6454 13.6322L14.7074 14.6915ZM17.1786 8.71429C17.1786 4.03959 13.389 0.25 8.71429 0.25V1.75C12.5605 1.75 15.6786 4.86802 15.6786 8.71429H17.1786ZM8.71429 0.25C4.03959 0.25 0.25 4.03959 0.25 8.71429H1.75C1.75 4.86802 4.86802 1.75 8.71429 1.75V0.25Z"
      // className="fill-gray group-focus-within:fill-white"
    />
  </svg>
);

export default SearchIcon;
