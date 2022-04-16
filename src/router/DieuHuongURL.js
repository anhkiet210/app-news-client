import React, { Component } from 'react';
import { BrowserRouter as Switch, Route, Redirect } from "react-router-dom";
import AddNews from '../component/admin/author/AddNews';
import AddTopic from '../component/admin/author/AddTopic';
import AddUser from '../component/admin/author/AddUser';
import AuthorBoard from '../component/admin/author/AuthorBoard';
import changePass from '../component/admin/author/changePass';
import MyNews from '../component/admin/author/MyNews';
import NewsDetail from '../component/admin/author/NewsDetail';
import Profile from '../component/admin/author/Profile';
import UpdateNews from '../component/admin/author/UpdateNews';
import AnSinh from '../component/AnSinh';
import ChiTietTin from '../component/ChiTietTin';
import GiaiTri from '../component/GiaiTri';
import GiaoDuc from '../component/GiaoDuc';
import Home from '../component/Home';
import KinhDoanh from '../component/KinhDanh';
import Login from '../component/Login';
import PhapLuat from '../component/PhapLuat';
import Register from '../component/Register';
import TheThao from '../component/TheThao';
import VanHoa from '../component/VanHoa';
import XaHoi from '../component/XaHoi';


class DieuHuongURL extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/xa-hoi">
                    <XaHoi />
                </Route>
                <Route path="/van-hoa">
                    <VanHoa />
                </Route>
                <Route path="/the-thao">
                    <TheThao />
                </Route>
                <Route path="/giai-tri">
                    <GiaiTri />
                </Route>
                <Route path="/phap-luat">
                    <PhapLuat />
                </Route>
                <Route path="/giao-duc">
                    <GiaoDuc />
                </Route>
                <Route path="/kinh-doanh">
                    <KinhDoanh />
                </Route>
                <Route path="/an-sinh">
                    <AnSinh />
                </Route>
                <Route path="/:slug.:id.html" component={ChiTietTin}/>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="/register">
                    <Register></Register>
                </Route>
                <Route path="/authordashboard/home" render={() => {
                    return localStorage.getItem("accessToken") ? <AuthorBoard /> : <Redirect to="/login" />
                }}>
                </Route>
                <Route path="/authordashboard/them-chu-de" render={() => {
                    return localStorage.getItem("accessToken") ? <AddTopic /> : <Redirect to="/login" />
                }}>
                </Route>
                <Route path="/authordashboard/them-bai-viet" render={() => {
                    return localStorage.getItem("accessToken") ? <AddNews />  : <Redirect to="/login" />
                }}>
                </Route>
                <Route path="/authordashboard/them-nguoi-dung" render={() => {
                    return localStorage.getItem("accessToken") ? <AddUser />  : <Redirect to="/login" />
                }}>
                </Route>
                <Route path="/authordashboard/thong-tin-ca-nhan" render={() => {
                    return localStorage.getItem("accessToken") ? <Profile /> : <Redirect to="/login" />
                }}>
                </Route>
                {/* <Route path="/authordashboard/doi-mat-khau" render={() => {
                    return localStorage.getItem("accessToken") ? <changePass /> : <Redirect to="/login" />
                }}>
                </Route> */}
                <Route path="/authordashboard/doi-mat-khau" component={changePass} />
                <Route path="/authordashboard/bai-viet-cua-toi" render={() => {
                    return localStorage.getItem("accessToken") ? <MyNews /> : <Redirect to="/login" />
                }}>
                </Route>
                <Route path="/authordashboard/update/:id"  component={UpdateNews} /> 
                
                <Route path="/authordashboard/chitiet/:id" component={NewsDetail} />
                {/* <Route path="/authordashboard/chitiet/:id" component={NewsDetail}  /> */}
                {/* <Route path="/authordashboard/themchude">
                    <AddTopic></AddTopic>
                </Route>
                <Route path="/authordashboard/thembaiviet">
                    <AddNews></AddNews>
                </Route>
                <Route path="/authordashboard/thongtincanhan">
                    <Profile></Profile>
                </Route>
                <Route path="/authordashboard/baivietcuatoi">
                    <MyNews></MyNews>
                </Route> */}
            </Switch>
            
        );
    }
}

export default DieuHuongURL;