import styled from '@emotion/styled'


export default function Square({ value, onClick, winLine }: PropSquare) {
  const bgColor = winLine ? "white" : "#525F78"
  const valueColor = value ? "" : "bisque"

  const Button = styled.button`
  background-color: ${bgColor};
  text-align: center;
  color: turquoise;
  font-size: 25px;
  margin: 2px;
  padding: 10px;
  isplay: inline-block;
  width:50px;
  height:50px;
  &:hover {
    background-color: ${valueColor};
  }
`

  return (
    <Button onClick={onClick}>
      {value}
    </Button>
  );
}