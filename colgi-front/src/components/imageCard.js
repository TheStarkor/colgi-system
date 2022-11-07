import { Card } from 'antd';

const { Meta } = Card;

const ImageCard = (props) => {
  return (
    <>
      <Card
        // hoverable
        // style={{ width: 240 }}
        cover={<img alt="example" src="https://tmi-image.s3.ap-northeast-2.amazonaws.com/Screen+Shot+2022-10-25+at+7.10.58+PM.png" />}
      >
        <Meta description={props?.prompt} />
      </Card>
    </>
  )
}

export default ImageCard;
