import React, { Component } from 'react';
import {Link} from "react-router-dom";

class HorizontalContent extends Component {
   

    chuyenDoiURL = (str) => {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();     

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
    
    render() {
        return (
            <div className="news-item-horizontal">
                <Link to={this.chuyenDoiURL(this.props.tieude) + "." + this.props.idpost + ".html"}><h5>{this.props.tieude}</h5></Link>
                <div className="row  wrap-content-horizontal">
                    <div className="col-4 anh-news-item-horizontal">
                        <Link to={this.chuyenDoiURL(this.props.tieude) + "-" + this.props.idpost + ".html"}>
                            <img src={this.props.anh} alt="" className="anh-left" />
                        </Link>
                    </div>
                    <div className="col-8">
                        <p>{this.props.trichdan}</p>
                    </div>
                </div>
                <hr />
            </div>

        );
    }
}

export default HorizontalContent;