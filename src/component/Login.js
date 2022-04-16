import React, { Component } from 'react';
import { BrowserRouter as Router,  Redirect} from "react-router-dom";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLogin: localStorage.getItem("accessToken") != null
        }
    }


    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    submitFormLogin = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(this.state),
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth/login", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then(result => {
                // console.log(result);
                localStorage.setItem("accessToken", result.access_token);
                // alert("Đăng nhập thành công");
                this.setState({ isLogin: true});
            })

            .catch(error => {
                console.log('error', error);
                alert("Email hoặc mật khẩu không chính xác");
            });

    }

    render() {
        return (
            <div>
                {
                    this.state.isLogin  ?
                    <Redirect to="/authordashboard/home" key={this.state.isLogin} /> :
                    <div className="wraper" >
                        <div className="wraper-login" id="js-modal-show">
                            <div id="login" className="login shared">
                                <h3>Đăng nhập</h3>
                                <form method="POST" onSubmit={(event) => this.submitFormLogin(event)}  autoComplete="new-password">
                                    <input type="email" name="email" placeholder="Email" required onChange={(event) => this.getValue(event)} autoComplete="new-password" />
                                    <input type="password" name="password" placeholder="Password" required onChange={(event) => this.getValue(event)} autoComplete="new-password" />
                                    {/* <div className="form-group">
                                        <input type="checkbox" name="remeber" id="brand1" defaultValue />
                                        <label htmlFor="brand1"><span />Nhớ mật khẩu</label>
                                    </div> */}

                                    <button type="submit" id="dangnhap">Đăng nhập</button>
                                </form>
                                {/* <p>Nếu chưa tạo tài khoản hãy chọn <NavLink to="/register" className="nav-link btn-show" >Đăng ký</NavLink></p> */}
                                <p>Nếu chưa tạo tài khoản hãy liên hệ với chúng tôi qua email để đăng ký tài khoản</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Login;