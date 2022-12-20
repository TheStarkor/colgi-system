const promptView = (props) => {
  console.log(props);

  return (
    <>
      <Row style={{marginTop:'10px'}}>
        <h3>{props?.item?.prompt}</h3>
        <Button onClick={() => getMoreImage(props?.item?.prompt)} type="primary" size='small' style={{marginLeft:'10px'}}>more images</Button>
      </Row>
      <Row>
        {props?.item?.images?.map(image => (
          <Col span={4}>
            <Image
              src={image}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default
