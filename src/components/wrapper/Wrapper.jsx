import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i class='fa-solid fa-truck-fast'></i>,
      title: "Giao hàng trên toàn thế giới",
      decs: "Chúng tôi cung cấp mức giá cạnh tranh cho sản phẩm hơn 100 triệu của chúng tôi ở bất kỳ phạm vi nào",
    },
    {
      cover: <i class='fa-solid fa-id-card'></i>,
      title: "Thanh toán an toàn",
      decs: "Chúng tôi đảm bảo thông tin của khách hàng luôn bảo mật.",
    },
    {
      cover: <i class='fa-solid fa-shield'></i>,
      title: "Tự tin mua sắm ",
      decs: "Chúng tôi cung cấp mức giá cạnh tranh cho sản phẩm",
    },
    {
      cover: <i class='fa-solid fa-headset'></i>,
      title: "Hỗ trợ 24/7 ",
      decs: "Chúng tôi luôn hỗ trợ khách hàng 24/7",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
