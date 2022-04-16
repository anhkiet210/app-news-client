import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import logo from "../img/logo.png";
import NewsEventItem from './NewsEventItem';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state ={
            postFilter: []
        }
    }

    componentDidMount(){
        this.loadPost();
    }
    
    //hàm tìm kiếm
    handleSearch = (e) => {
        const searchValue = e.target.value;
        const tam = this.state.post.filter( (subpost) => subpost.TieuDe.toLowerCase().includes(searchValue.toLowerCase()));
        if(searchValue !== ""){
            this.setState({
                postFilter: tam
            });
        }else{
            this.setState({
                postFilter: []
            });
        }
        console.log(this.state.postFilter);
    }

    //load tất cả bài viết
    loadPost = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://app-news-laravel.herokuapp.com/api/Post", requestOptions)
            .then(response => response.json())
            .then(result => { this.setState({ post: result }); })
            .catch(error => console.log('error', error));
    }

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
            <div className="container">
                <div className="row height-100 mau1">
                    <div className="col-4 ">
                        <div className="logo">
                            <img src={logo} alt="Chỗ này có cái logo nè!" title="logo"/>
                        </div>
                    </div>
                    <div className="col-6" >
                        <div className="search-box">
                            <input type="text" className="search-text" placeholder="Tìm kiếm..." onChange={(e) => this.handleSearch(e)}/>
                            <button type="submit" className="search-btn">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                        {
                            this.state.postFilter.length !== 0 &&
                            (
                                <div className="search-result">
                                    <ul>
                                        {
                                            this.state.postFilter.slice(0, 8).map( (subpost) => (
                                                <li key={subpost.id}>
                                                    <Link to={this.chuyenDoiURL(subpost.TieuDe) + "." + subpost.id + ".html"} >{subpost.TieuDe}</Link>
                                                    
                                                </li>
                                            ))
                                        }
                                        
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-2">
                        {/* <a className="nav-link link-login" id="btn-link" target="_blank" href="./../login.html"><i className="fas fa-user" /> Đăng nhập</a> */}
                        
                        <NavLink to="/login" className="nav-link link-login" id="btn-link">
                            <i className="fas fa-user" /> Đăng nhập
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;