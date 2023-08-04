import React from 'react'
import {Button, Col, Container, Form, Row, Stack, Table} from 'react-bootstrap'
import {useRouter} from "next/router"
import {policy, term} from '@/public/terms'

export interface UserInput {
  userId?: string,
  password?: string,
  passwordCheck?: string,
  name?: string,
  phone?: string,
}

export default function EmailSignInPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<'term' | 'input'>('term')
  const [input, setInput] = React.useState<UserInput>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const createUser = async (userInput: UserInput): Promise<any> => {
    const response = await fetch('/api/auth/signup', {
      method: "POST",
      body: JSON.stringify(userInput),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  const handleSubmitTerm = () => {
    setStep('input')
  }

  const handleSubmitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(input)
    if (input) {
      if (input.password === input.passwordCheck) {
        try {
          const result = await createUser(input);
          console.log(result);
          router.replace('/login');
          alert('가입이 완료되었습니다.')
        } catch (error) {
          alert(error);
        }
      } else {
        alert('비밀번호가 다릅니다.')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget
    setInput({...input, [name]: value})
  }

  return (
    <>
      <Container>
        <div>
          <Stack gap={2} className="col-md-5 mx-auto">
            <h1>회원가입</h1>
            <div className="d-flex justify-content-center">
              <div className={step === 'term' ? 'fw-bold' : ''}>
                약관동의
              </div>
              <div>-</div>
              <div className={step === 'input' ? 'fw-bold' : ''}>
                정보입력
              </div>
            </div>
            {
              step === 'term' ?
                <Form onSubmit={handleSubmitTerm}>
                  <div>
                    <Row>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label="ㅇㅇ서비스 이용 동의"
                        required
                      />
                    </Row>
                    <Row>
                      <div className="term-area">
                        {term}
                      </div>
                    </Row>
                    <Row>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label="개인정보 이용 방침"
                        required
                      />
                    </Row>
                    <Row>
                      <div className="term-area">
                        {policy}
                      </div>
                    </Row>
                    <Row>
                      <Col>
                        <div><Button onClick={() => router.back()}>이전으로</Button></div>
                      </Col>
                      <Col>
                        <div><Button type="submit">동의하기</Button></div>
                      </Col>
                    </Row>
                  </div>
                </Form>
                :
                <div>
                  <Form onSubmit={handleSubmitRegistration}>
                    <Row>
                      <Col>
                        <Table>
                          <tr>
                            <th>아이디</th>
                            <td>
                              <Form.Control
                                id="userId"
                                name="userId"
                                type="text"
                                onChange={handleChange}/>
                            </td>
                          </tr>
                          <tr>
                            <th>비밀번호</th>
                            <td>
                              <Form.Control
                                id="pw"
                                name="password"
                                type="password"
                                onChange={handleChange}/>
                            </td>
                          </tr>
                          <tr>
                            <th>비밀번호 확인</th>
                            <td>
                              <Form.Control
                                id="pw-chk"
                                name="passwordCheck"
                                type="password"
                                onChange={handleChange}/>
                            </td>
                          </tr>
                          <tr>
                            <th>이름</th>
                            <td>
                              <Form.Control
                                id="name"
                                name="name"
                                type="text"
                                onChange={handleChange}/>
                            </td>
                          </tr>
                          <tr>
                            <th>휴대폰번호</th>
                            <td>
                              <Form.Control
                                id="phone"
                                name="phone"
                                type="text"
                                onChange={handleChange}/>
                            </td>
                          </tr>
                        </Table>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div><Button onClick={() => setStep('term')}>이전으로</Button></div>
                      </Col>
                      <Col>
                        <div><Button type="submit">가입하기</Button></div>
                      </Col>
                    </Row>
                  </Form>
                </div>
            }
          </Stack>
        </div>
      </Container>
    </>
  )
}
