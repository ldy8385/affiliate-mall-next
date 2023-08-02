import React from 'react'
import {Button, Container, Nav, Navbar, Offcanvas, Stack} from 'react-bootstrap'
import {useSession, signIn, signOut} from "next-auth/react";


export default function Header() {
    const {data: session} = useSession()
    const [offCanvasShow, setOffCanvasShow] = React.useState<boolean>(false)

    const handleOffCanvasOpen = () => {
        setOffCanvasShow(true)
    }

    const handleOffCanvasClose = () => {
        setOffCanvasShow(false)
    }

    const handleLogout = async () => {
        // await removeCookie("accessToken")
        // await persistor.purge()
        // 0.3초 후 리프레쉬
        setTimeout(() => {
            window.location.reload()
        }, 300)
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="justify-content-end">
                        {
                            session ?
                                <>
                                    <Nav.Link href="/" onClick={() => signOut()}>로그아웃</Nav.Link>
                                    <Nav.Link href="/mypage">마이페이지</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link href="/login">로그인</Nav.Link>
                                    {/*<Button onClick={() => signIn('google')}>로그인</Button>*/}
                                    <Nav.Link href="/sign-in">회원가입</Nav.Link>
                                </>
                        }
                        <Nav.Link href="/">장바구니</Nav.Link>
                        <Nav.Link onClick={handleOffCanvasOpen}>사이드메뉴</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Offcanvas
                show={offCanvasShow}
                onHide={handleOffCanvasClose}
                placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>메뉴</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack gap={3}>
                        <div>
                            브랜드스토리
                        </div>
                        <div>
                            공지사항
                        </div>
                        <div>
                            고객센터
                        </div>
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}