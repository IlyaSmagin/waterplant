function DropIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-droplet"
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
      <path d="M6.8 11a6 6 0 1010.396 0l-5.197-8-5.2 8z" />
    </svg>
  );
}

export default DropIcon;
