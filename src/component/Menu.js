import React, { Component } from 'react';
import { BrowserRouter as Router,  NavLink } from "react-router-dom";

class Menu extends Component {
    render() {
        return (
                <div className="container-fluid menubar">
                    <div className="container menu">
                        <ul className="nav">
                            <li className=" nav-item">
                                <NavLink to="/" className="nav-link">Trang chủ</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/xa-hoi" className="nav-link">Xã hội</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/van-hoa" className="nav-link">Văn hóa</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/the-thao" className="nav-link">Thể thao</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/giai-tri" className="nav-link">Giải trí</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/phap-luat" className="nav-link">Pháp luật</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/giao-duc" className="nav-link">Giáo dục</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/kinh-doanh" className="nav-link">Kinh doanh</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink to="/an-sinh" className="nav-link">An sinh</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
}

export default Menu;