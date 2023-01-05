function BackIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className=""
      width={44}
      height={44}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 12L19 12" />
      <path d="M5 12L11 18" />
      <path d="M5 12L11 6" />
    </svg>
  );
}

export default BackIcon;
