import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footer">
              <div className="container ">
                <div className="row">
                  <div className="col-7">
                  <p>
                      Cơ quan của Bộ Lao động - Thương binh và Xã hội <br />
                      Tòa soạn: Nhà 48, ngõ 2 Giảng Võ, Cát Linh, Đống Đa, Hà Nội <br />
                      Văn phòng đại diện miền Nam: Ninh Kiều, Cần Thơ<br />
                      Điện thoại: 0365.480.118. Fax: 0365.480.118 <br />
                      Email: teamnews@gmail.com. Website: https://teamnews.com <br />
                      Chính sách quyền riêng tư. <br />
                      Mọi hành động sử dụng nội dung đăng tải trên Báo điện tử Teamnews tại địa chỉ teamnews.com phải có sự đồng ý bằng văn bản của Báo điện tử Teamnews.
                  </p>
                  </div>
                  <div className="col-5">
                    <p>
                      Liên hệ quảng cáo: 0343.434.658<br />
                      Email: quangcaoteamnews@gmial.com
                    </p>
                    <div className="follow-us">
                      <label>Theo dõi chúng tôi trên:</label>
                      <Link to={"/"}>
                        <i className="fab fa-facebook"></i>
                      </Link>
                      <Link to={"/"}>
                        <i className="fab fa-youtube"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Footer;