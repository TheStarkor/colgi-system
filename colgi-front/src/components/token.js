const Token = (props) => {
  return (
    <>
      <span style={{backgroundColor: props.color, marginRight: '5px', fontSize: '20px'}}>
        {props.token}
      </span>
    </>
  )
}

export default Token;
