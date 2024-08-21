const Pin = ({ size, color = 'currentColor' }: { size: number; color?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256">
      <path
        fill={color}
        d="M216 168h-9.29L185.54 48H192a8 8 0 0 0 0-16H64a8 8 0 0 0 0 16h6.46L49.29 168H40a8 8 0 0 0 0 16h80v56a8 8 0 0 0 16 0v-56h80a8 8 0 0 0 0-16M86.71 48h82.58l21.17 120H65.54Z"
      />
    </svg>
  );
};

export default Pin;
