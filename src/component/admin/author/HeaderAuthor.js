import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom";
import anhdaidien from "../../../img/anh_dai_dien.png";

class HeaderAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isLogin: localStorage.getItem("accessToken") != null
        }
    }

    componentDidMount() {
        this.loadDataProfile();
    }

    loadDataProfile = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth/user-profile", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then(result => {
                // console.log(result);
                this.setState({ user: result });
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    //hiển thị thêm bài viêt
    hienthi_thembaiviet = () => {
        if (this.state.user.accounttype === 0) {
            return (
                <li>
                    <NavLink to="/authordashboard/them-bai-viet" className="nav-link">
                        <i className="fas fa-file-alt"></i>
                        <span>Thêm bài viết</span>
                    </NavLink>
                </li>
            )
        }
    }

    //hiển thị quản lý danh sách người dùng
    hienthi_AddUser = () => {
        if(this.state.user.accounttype === 2){
            return (
                <li>
                    <NavLink to="/authordashboard/them-nguoi-dung" className="nav-link">
                        <i className="fas fa-users"></i>
                        <span>Thêm người dùng</span>
                    </NavLink>
                </li>
            )
        }
    }

    //hiển thị thêm chủ đề
    hienthi_themchude = () => {
        if (this.state.user.accounttype === 0) {
            return (
                <li>
                    <NavLink to="/authordashboard/them-chu-de" className="nav-link">
                        <i className="fas fa-shapes" />
                        <span>Thêm chủ đề</span>
                    </NavLink>
                </li>
            )
        }
    }

    //hiển thị bài viết của tui
    hienthi_MyNews = () => {
        if(this.state.user.accounttype == 0){
            return(
                <li>
                    <NavLink to="/authordashboard/bai-viet-cua-toi" className="nav-link">
                        <i className="fas fa-newspaper"></i>
                        <span>Bài viết của tôi</span>
                    </NavLink>
                </li>
            );
        }
    }

    logout = () => {
        localStorage.removeItem("accessToken");
        alert("Đăng xuất thành công");
        this.setState({ isLogin: false });
        <Redirect to="/login" />
        window.location.reload();
        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     redirect: 'follow'
        // };

        // fetch("http://localhost:8000/api/auth/logout", requestOptions)
        //     .then(response => {
        //         response.json();
        //         <Redirect to="/" />;
        //     })
        //     .then(result => {
        //         console.log(result);

        //     })
        //     .catch(error => console.log('error', error));
    }


    render() {
        return (
            <React.Fragment>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="true">{this.state.user.accounttype===0 ? "AUTHOR DASHBOARD":"ADMIN DASHBOARD"}</a>
                        </div>
                        <div className="navbar-btn"><button type="button" className="btn-logout btn btn-outline-info" onClick={this.logout}><i className="fas fa-sign-out-alt" />Đăng xuất</button></div>
                    </div>
                </nav>
                <aside id="leftsidebar" className="sidebar">
                    {/* user info  */}
                    <div className="user-info">
                        <div className="anh_dai_dien">
                            <img src={anhdaidien} alt="ảnh đại diện" className="img-fluid" />
                        </div>
                        <div className="info-container">
                            <div className="name">
                                Hi, {this.state.user.name}
                            </div>
                            <div className="email">
                                {this.state.user.email}
                            </div>
                        </div>
                    </div>
                    {/* /user info  */}
                    {/* menu */}
                    <div className="menu">
                        <ul className="list">
                            <li className="header">
                                MAIN NAVIGATION
                            </li>
                            <li className="active">
                                <NavLink to="/authordashboard/home" className="nav-link">
                                    <i className="fas fa-home" />
                                    <span>Trang chủ</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/authordashboard/thong-tin-ca-nhan" className="nav-link">
                                    <i className="fas fa-layer-group" />
                                    <span>Hồ sơ cá nhân</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/authordashboard/doi-mat-khau" className="nav-link">
                                    <i className="fas fa-lock"></i>
                                    <span>Đổi mật khẩu</span>
                                </NavLink>
                            </li>
                            {/* thêm bài viết */}
                            {this.hienthi_thembaiviet()}
                            {/* thêm chủ đề */}
                            {this.hienthi_themchude()}
                            {/* hiển thị thêm người dùng */}
                            {this.hienthi_AddUser()}
                            {this.hienthi_MyNews()}
                        </ul>
                    </div>
                    {/* menu */}
                    {/* show tác giả */}
                    <div className="legal">
                        <div className="copyright">
                            © 2021 <a href="true">TeamNews</a>.
                        </div>
                    </div>
                    {/* show tác giả */}
                </aside>
            </React.Fragment>
        );
    }
}

export default HeaderAuthor;