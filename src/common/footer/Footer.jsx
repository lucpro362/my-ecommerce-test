import React from "react"
import "./style.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <h1>BE CLASSY</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.</p>
            <div className='icon d_flex'>
              <div className='img d_flex'>
                <i class='fa-brands fa-google-play'></i>
                <span>Google Play</span>
              </div>
              <div className='img d_flex'>
                <i className='fa-brands fa-app-store-ios'></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div className='box'>
            <h2>Về chúng tôi</h2>
            <ul>
      
              <li>Cửa hàng của chúng tôi</li>
              <li>Bảo hành</li>
              <li>Quy định</li>
              <li>Chính sách khác</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Chăm sóc khách hàng</h2>
            <ul>
              <li>Trung tâm trợ giúp </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Kết nối chúng tôi</h2>
            <ul>
              <li>Địa chỉ: 13 Nguyễn Thiện Thuật, Phường 2, Quận 3, TP.HCM</li>
              <li>Email: Beclassy@gmail.com</li>
              <li>Phone: 19009XXX</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
