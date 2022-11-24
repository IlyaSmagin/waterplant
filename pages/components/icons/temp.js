function TempIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-temperature"
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
      <path d="M10 13.5a4 4 0 104 0V5a2 2 0 00-4 0v8.5" />
      <path d="M10 9L14 9" />
    </svg>
  );
}

export default TempIcon;
