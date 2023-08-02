import React from 'react'
import {Button, Card, Carousel, Col, Container, Form, Row, Stack} from 'react-bootstrap'
import {signIn, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";

export interface LoginInput {
  userId: string
  password: string
}

export default function LoginPage() {
  const {data: session} = useSession()
  const router = useRouter()
  const [input, setInput] = React.useState<LoginInput>({userId: '', password: ''})
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget
    setInput({...input, [name]: value})
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: false,
      userId: input.userId,
      password: input.password,
    })

    if (!result.error) {
      router.replace("/")
    } else {
      alert(result.error)
    }
  }

  const handleGoogleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    signIn("google")
  }

  const handleNaverLogin = async () => {
    signIn("naver")
  }

  if (session) {
    router.replace("/")
  }

  return (
    <>
      <Container>
        <div>
          <Stack gap={2} className="col-md-5 mx-auto">
            <h1>로그인</h1>
            <h4>이메일 로그인</h4>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="userId"
                  placeholder="아이디를 입력해주세요."
                  required
                  onChange={handleChange}/>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                  required
                  onChange={handleChange}/>
              </Form.Group>
              <Button variant="outline-primary" type="submit">로그인</Button>
            </Form>
            <p>아이디/비밀번호 찾기</p>
            <h4>SNS 간편 로그인</h4>
            <Button variant="secondary">카카오</Button>
            <Button variant="outline-secondary" onClick={handleNaverLogin}>네이버</Button>
            <Button variant="outline-secondary" onClick={handleGoogleLogin}>구글</Button>
            <div>
              <span>
                ㅇㅇ이 처음이신가요?
                <Link href="/sign-in">회원가입하기</Link>
              </span>
            </div>
          </Stack>
        </div>
      </Container>
    </>
  )
}