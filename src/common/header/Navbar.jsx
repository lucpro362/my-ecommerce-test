import React, { useState } from "react"
import { Link } from "react-router-dom"


const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false)
  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='catgrories d_flex'>
            <span className='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              <li>
                <Link to='/'>Trang chủ</Link>
              </li>
              <li>
                <Link to='/register'>Đăng ký</Link>
              </li>
              <li>
                <Link to='/login'>Đăng nhập</Link>
              </li>
              <li>
                <Link to='/order'>Trạng thái đơn hàng</Link>
              </li>
              <li>
                <Link to='/dashboard'>Quản trị</Link>
              </li>
            </ul>

        
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
