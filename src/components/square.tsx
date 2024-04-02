export default function Square({ value, onClick }: PropSquare) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}