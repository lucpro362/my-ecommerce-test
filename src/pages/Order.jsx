import React, { useState } from "react";
import "./stylepage.css";

const Order = ({ CartItem, loggedInUser, onOrderComplete }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
  });

  const [orderStatus, setOrderStatus] = useState("Chưa thanh toán");
  const [todayData, setTodayData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getTotalToPay = () => {
    return CartItem.reduce(
      (total, item) => total + item.qty * item.price,
      0
    ) - getTotalDiscount(); 
  };

  const getTotalDiscount = () => {
    return CartItem.reduce(
      (totalDiscount, item) => totalDiscount + (item.discount / 100) * item.price * item.qty,
      0
    );
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.address) {
      alert("Vui lòng nhập họ và tên cùng địa chỉ trước khi đặt hàng.");
      return;
    }

    const totalQuantity = CartItem.reduce((total, item) => total + item.qty, 0);

    const newOrder = {
      fullName: formData.fullName,
      address: formData.address,
      items: CartItem,
      totalQuantity: totalQuantity,
    };

    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Đã lưu đơn hàng:", data);
        setFormData({
          fullName: "",
          address: "",
        });
        setOrderStatus("Đã thanh toán");
        setTodayData(data);
        if (typeof onOrderComplete === "function") {
          onOrderComplete(data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lưu đơn hàng:", error);
      });
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      address: "",
    });
    setOrderStatus("Hủy thanh toán");
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h2 className="h5 mb-0">
            <a href="#" className="text-muted">
              Mã đơn hàng #{Math.floor(Math.random() * 100000)}
            </a>
          </h2>
          <h2 className={`h5 mb-0 order-status ${orderStatus.toLowerCase()}`}>
            {orderStatus}
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <span className="me-3">
                      {new Date().toLocaleDateString()}
                    </span>
                    <span className="me-3">
                      #{Math.floor(Math.random() * 100000)}
                    </span>
                    <span className="me-3">Visa -1234</span>
                  </div>
                  <div className="d-flex">
                    <div className="dropdown">
                      <button
                        className="btn btn-link p-0 text-muted"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CartItem.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex mb-2">
                            <div className="flex-shrink-0">
                              <img
                                src={item.image}
                                alt=""
                                width="35"
                                className="img-fluid"
                              />
                            </div>
                            <div className="flex-lg-grow-1 ms-3">
                              <h6 className="small mb-0">
                                <a href="#" className="text-reset">
                                  {item.name}
                                </a>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>{item.qty}</td>
                        <td className="text-end">{item.qty * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2">Tổng tiền phải trả(đã bao gồm giảm giá)</td>
                      <td className="text-end">{getTotalToPay()}</td>
                    </tr>
                    <tr className="fw-bold">
                      <td colspan="2">Tổng tiền gồm VAT</td>
                      <td className="text-end">{getTotalToPay()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-4"></div>
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h6">Thông tin vận chuyển</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </form>
                <strong>Mã code đơn:</strong>
                <span>
                  <a
                    href="#"
                    className="text-decoration-underline"
                    target="_blank"
                  >
                    FF1234567890
                  </a>{" "}
                  <i className="bi bi-box-arrow-up-right"></i>{" "}
                </span>
                <hr />
                <address>
                  <strong>{formData.fullName}</strong>
                  <br />
                  {formData.address}
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Đặt hàng
          </button>{" "}
          <button className="btn btn-secondary" onClick={handleCancel}>
            Hủy đơn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
