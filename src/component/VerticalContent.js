import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class VerticalContent extends Component {

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
            <div className="vertical-content">
                {/* <h4>Tên danh mục</h4> */}
                <div className="anh-vertical">
                    <Link to={this.chuyenDoiURL(this.props.tieude) + "." + this.props.idpost + ".html"}><img className="img-fluid" src={this.props.anh} alt={this.props.tieude} /></Link>
                </div>
                <div className="news-item-vertical-content">
                    <h5><Link to={this.chuyenDoiURL(this.props.tieude) + "." + this.props.idpost + ".html"}>{this.props.tieude}</Link></h5>
                    <p>{this.props.trichdan}</p>
                </div>
            </div>
        );
    }
}

export default VerticalContent;