import React from "react"

const Catg = () => {
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "JUNO",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "ĐÔNG THỊNH",
    }
    
  ]
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Thương hiệu</h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Catg
