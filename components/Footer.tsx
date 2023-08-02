import React from 'react'
import {Button, Col, Container, Nav, Navbar, Offcanvas, Row, Stack} from 'react-bootstrap'

export default function Footer() {

    return (
        <>
            <Container>
                <Row className="sns-area mb-4 border-top border-bottom pt-2 pb-2">
                    <Col className="d-flex justify-content-end">
                        {/*<KakaoIcon className="sns-icon-button"/>*/}
                        {/*<InstaIcon className="sns-icon-button"/>*/}
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-start">
                        <div>
                            <Button className="me-2">이용약관</Button>
                            <Button>개인정보처리방침</Button>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <div className="text-end">
                            <h5>고객센터</h5>
                            <h2>1577-1577</h2>
                            <p>월-토요일 09:00 ~ 18:00</p>
                            <p>점심 12:30 ~ 13:30</p>
                            <p>일요일 및 공휴일 휴무</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <p className="text-start">
                                ㈜상호명 대표이사:대표이름 | 주소: <br/>
                                사업자등록번호 : | 통신판매업신고번호 : <br/>
                                개인정보관리책임자:책임자이름(메일주소)<br/>
                                ⓒ 2023 회사명 Inc. All rights reserved.
                            </p>
                        </div>
                    </Col>
                    <Col>
                        셀러모집배너
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-end">
                            <Button className="me-2">자주묻는질문</Button>
                            <Button>1대1 문의</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}