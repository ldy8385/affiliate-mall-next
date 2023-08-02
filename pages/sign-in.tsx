import React from 'react'
import {Button, Card, Carousel, Col, Container, Form, Row, Stack} from 'react-bootstrap'
import Link from "next/link";

export default function SignIn () {

    return (
        <>
            <Container>
                <div>
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <h1>회원가입</h1>
                        <h4>SNS계정으로 간편하게 가입하기</h4>
                        <Button variant="secondary">카카오</Button>
                        <Button variant="outline-secondary">네이버</Button>
                        <h4>이메일로 가입하기</h4>
                        <Link href="/email-sign-in"><Button variant="outline-secondary">ㅇㅇ회원가입 하기</Button></Link>
                        <div>
              <span>
                ㅇㅇ 회원이신가요?
                <Link href="/login">로그인하기</Link>
              </span>
                        </div>
                    </Stack>
                </div>
            </Container>
        </>
    )
}