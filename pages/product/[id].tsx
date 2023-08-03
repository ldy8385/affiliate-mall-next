import {useRouter} from "next/router";
import {Col, Container, Row} from "react-bootstrap"
import React from "react"

export default function productDetail() {
  const router = useRouter()
  const id = router.query.id

  interface GetProductOut {
    id: number,
    name: string,
    price: number,
    thumbnailUrl: string,
    detailUrl: string,
    purchases: any,
    createdAt: Date,
    updatedAt: Date,
  }

  interface GetOptionOut {
    id: number,
    name: string,
    stock: number,
    createdAt: Date,
    updatedAt: Date,
  }

  const [product, setProduct] = React.useState<GetProductOut>()
  const [options, setOptions] = React.useState<Array<GetOptionOut>>()

  React.useEffect(() => {
    if (id) getProduct()
  }, [id])

  React.useEffect(() => {
    if (product) getOptions()
  }, [product])

  const getProduct = async () => {
    const response = await fetch(`/api/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    setProduct(data)

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!")
    }
  }

  const getOptions = async () => {
    const response = await fetch(`/api/product/option/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const  data = await response.json()
    setOptions(data)

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!")
    }
  }

  return (
    <Container>
      {
        product &&
      <Row>
        <Col>
          <div>
            <img src={product.thumbnailUrl}/>
          </div>
        </Col>
        <Col>
          <h3>{product.name}</h3>
          <h5>{product.price}</h5>

        </Col>
      </Row>
      }
    </Container>
  )
}