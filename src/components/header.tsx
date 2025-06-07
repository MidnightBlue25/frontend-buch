import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'

export default function Header() {
  return (
    <div>
        {/* Navbar 是一个 Bootstrap 提供的 导航栏组件，用来放网站顶部的主导航内容，比如 Logo、链接、搜索栏、按钮等等。 */}
        <Navbar expand="lg" className="bg-dark navbar-dark">
          {/* Container 是一个 Bootstrap 的布局工具，用来自动添加左右边距，防止内容贴边。导航栏、页面内容在大屏和小屏上都有一致的居中效果。 */}
          <Container>
            {/* Nav 是用来包住一组导航按钮的容器。 */}
              <Nav className="me-auto fs-2 fw-bold">
                <Link href="/" className="nav-link">Home</Link>
              </Nav>
              <Nav className="ms-auto fs-4">
                <Link href="/search" className="nav-link">Search</Link>
                <Link href="/add" className="nav-link">Add</Link>
                <Link href="/edit" className="nav-link">Edit</Link>
              </Nav>
          </Container>
        </Navbar>
    </div>
  )
}
