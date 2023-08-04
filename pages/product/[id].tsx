import {useRouter} from "next/router";
import {Col, Container, Row, Form, Button, InputGroup} from 'react-bootstrap'
import React, {useState, useEffect} from "react"
import Image from 'next/image'

export default function ProductDetail() {
  const router = useRouter()
  const id = router.query.id

  interface GetProductOut {
    id: number,
    name: string,
    desc: string,
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

  const [product, setProduct] = useState<GetProductOut>()
  const [options, setOptions] = useState<Array<GetOptionOut>>()

  const [optionInput, setOptionInput] = useState()
  const [quantity, setQuantity] = useState(1)

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

  useEffect(() => {
    if (id) getProduct()
  }, [id])

  useEffect(() => {
    if (product) getOptions()
  }, [product])

  const handleQuantityChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget
    setQuantity(value)
  }

  const handleControlQuantity = (func: string) => {
    let quantityValue = parseInt(quantity)
    if (func === 'increase') {
      setQuantity(quantityValue + 1)
    } else {
      if (quantityValue !== 0) setQuantity(quantityValue - 1)
    }
  }

  return (
    <Container>
      {
        product &&
          <>
            <Row>
              <Col>
                <div>
                  <Image src={product.thumbnailUrl} alt="상품 썸네일"/>
                </div>
              </Col>
              <Col>
                <h3>{product.name}</h3>
                <h6>{product.desc}</h6>
                <h5>{product.price}</h5>
                <Form.Select>
                  <option>옵션을 선택해주세요.</option>
                  {
                    options && options.map(item => (
                      <option key={item.id} value={item.id} disabled={item.stock === 0}>{`${item.name} 재고: ${item.stock}`}</option>
                    ))
                  }
                  <option></option>
                </Form.Select>
                  <InputGroup className="mb-3">
                    <Button variant="outline-secondary" onClick={() => handleControlQuantity('increase')}>+</Button>
                    <Form.Control
                      id="quantity"
                      name="quantity"
                      type="text"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                    <Button variant="outline-secondary" onClick={() => handleControlQuantity('decrease')}>-</Button>
                  </InputGroup>
              </Col>
            </Row>
            <Row>
              <Image src={product.detailUrl} alt="상품 상세 이미지"/>
            </Row>
          </>
      }
    </Container>
  )
}
