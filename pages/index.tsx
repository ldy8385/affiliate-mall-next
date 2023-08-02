import {Button, Card, Carousel, Col, Container, Row} from "react-bootstrap";
import React from 'react'
import {UserInput} from "./email-sign-in";


export default function Home() {
  const [products, setProducts] = React.useState<Array<any> | undefined>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    getAllProducts()
  }, [])

  // React.useEffect(() => {
  //   console.log(products)
  // }, [products])

  const getAllProducts = async () => {
    const response = await fetch("/api/product/getAll", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    console.log(data)
    setProducts(data)

  }

  const handleClickProduct = (productId: number) => {
    // navigate(`/detail/${productId}`)
  }

  return (
      <>
        <Container>
          <div className="mb-4">
            <Row className="justify-content-md-center mb-4">
              <Col>
                <Carousel>
                  <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(45).webp"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).webp"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).webp"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Row>
                    {
                      products && products.map(item => (
                          <Col className="d-flex justify-content-center">
                            <Card style={{ width: '18rem' }}>
                              <Card.Img variant="top" src={item.thumbnailUrl} />
                              <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                  {item.price}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleClickProduct(item.id)}>Go somewhere</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                      ))
                    }
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </>
  )
}
