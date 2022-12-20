import { Row } from 'antd';
import { useEffect, useState } from "react"

const ResultTable = (props) => {
  const [sortedResult, setSortedResult] = useState(null);

  useEffect(() => {
    let temp_result = [...props.result]

    temp_result.sort((a, b) => {
      if (a.images.length > b.images.length) return -1;
      if (a.images.length > b.images.length) return 1;

      return 0;
    })
    // console.log('sorted!', temp_result.slice(0, 6))
    temp_result = temp_result.slice(0, 6)
    setSortedResult(temp_result);
  }, [props.result])

  return (
    <>
      <h3>Top 6 prompts</h3>
      {sortedResult && sortedResult.map((item, index) => (
        <>
          <Row>
            {`Top ${index + 1}: (${item?.images?.length} images) ${item?.prompt}`}
          </Row>
        </>
      ))}
    </>
  )
}

export default ResultTable
