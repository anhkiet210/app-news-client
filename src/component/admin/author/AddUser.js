import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state= {
            loaitk: 0
        }
    }
    
    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    // submitform
    submitForm = (event) => {
        //chặn sự kiện mặc định
        event.preventDefault();
        const regexhoten = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(regexhoten.test(this.state.name)){
            alert("Họ tên không được chứ ký tự đặc biệt!");
        }
        if(this.state.password !== this.state.password_confirmation){
            alert("Mật khẩu xác nhận không đúng!");
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(this.state),
        redirect: 'follow'
        };

        fetch("http://localhost:8000/api/auth/register", requestOptions)
        .then(response => {
            if(response.ok){
                response.json();
                alert("Thêm người dùng thành công");
                window.location.href="/authordashboard/home";
            }
        })
        // .then(result => {
        //     console.log(result);
        //     window.location.href="/authordashboard/home";
        // })
        .catch(error => console.log('error', error));
    }


    render() {
        return (
            <React.Fragment>
                <HeaderAuthor />
                <section className="content">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="wraper-profile">
                                <div className="wraper-header">
                                    <h3>THÊM NGƯỜI DÙNG</h3>
                                </div>
                                <div className="wraper-body">
                                    <form onSubmit={(event) => this.submitForm(event)} >
                                        <div className="input-group">
                                            <label >Họ tên: <span style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px' }}>(Không được chứa kí tự đặc biệt)</span></label>
                                            <input type="text" name="name" onChange={(event) => this.getValue(event)} autoComplete="new-password" />
                                        </div>
                                        <div className="input-group">
                                            <label >Email:</label>
                                            <input type="email" name="email" onChange={(event) => this.getValue(event)}  autoComplete="new-password" />
                                        </div>
                                        <div className="input-group">
                                            <label >Mật khẩu:</label>
                                            <input type="password" name="password" minLength="8" onChange={(event) => this.getValue(event)} autoComplete="new-password"  />
                                        </div>
                                        <div className="input-group">
                                            <label >Xác nhận mật khẩu:</label>
                                            <input type="password" name="password_confirmation" minLength="8" onChange={(event) => this.getValue(event)}  autoComplete="new-password" />
                                        </div>
                                        <div className="input-group">
                                            <label >Loại tài khoản:</label>
                                            <select className="form-add-user" name="loaitk" onChange={(event) => this.getValue(event)}>
                                                <option value={0}>Tác giả</option>
                                                <option value={1}>Quản trị viên</option>
                                            </select>
                                        </div>
                                        <input type="submit" name="capnhat" className="btn btn-outline-info" value="Thêm"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default AddUser;