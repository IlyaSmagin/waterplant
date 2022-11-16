function PlantIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-plant"
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
      <path d="M7 15h10v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4zM12 9a6 6 0 00-6-6H3v2a6 6 0 006 6h3M12 11a6 6 0 016-6h3v1a6 6 0 01-6 6h-3" />
      <path d="M12 15L12 9" />
    </svg>
  );
}

export default PlantIcon;
