import styled from '@emotion/styled'


export default function Square({ value, onClick }: PropSquare) {
  // const Heading = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#525F78",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   margin: theme.spacing(1),
  //   textAlign: "center",
  //   color: "#F5F5F5",
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   width: 10,
  //   height: 10,
  // }));

  const Button = styled.button`
  backgroundColor: "#525F78";
  text-align: center;
  color: turquoise;
  font-size: 25px;
  margin: 2px;
  padding: 10px;
  isplay: inline-block;
  width:50px;
  height:50px;
  &:hover {
    color:red;
  }
`

  return (

    <Button onClick={onClick}>
      {value}
    </Button>
  );
}