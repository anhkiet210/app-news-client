import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            "name":"",
            "email":"",
            "password":"",
            "password_confirmation":""
        }
    }

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });

    }
    
    submitFormRegister = (event) =>{
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(this.state),
        redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth/register", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert("Đăng ký tài khoản thành công");
            <Redirect to="/" />
        })
        .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div className="wraper" >
                <div className="wraper-register" id="js-modal-hide">
                    <div id="register" className="register shared">
                        <NavLink to="/login" className="nav-link btn-close">x</NavLink>
                        <h3>Đăng ký</h3>
                        <form method="POST" onSubmit={(event) => this.submitFormRegister(event)}>
                            <input type="text" name="name" placeholder="Họ tên" required onChange={(event) => this.getValue(event)} />
                            <input type="email" name="email" placeholder="Email" required onChange={(event) => this.getValue(event)} />
                            <input type="password" name="password" placeholder="Password" required onChange={(event) => this.getValue(event)} />
                            <input type="password" name="password_confirmation" placeholder="Comfirm Password" required onChange={(event) => this.getValue(event)} />
                            <button type="submit" id="dangky">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;