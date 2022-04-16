import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';

class changePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:""
        }
    }

    componentDidMount(){
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

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }

    //submitform
    submitForm = (event) => {
        //chặn sự kiện mặc định
        event.preventDefault();
        if(this.state.new_pass !== this.state.password_confirmation){
            alert("Mật khẩu xác nhận không đúng");
            document.getElementById('password_confirmation').focus();
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "current_pass": this.state.current_pass,
        "new_pass": this.state.new_pass
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8000/api/updatePassword/" + this.state.user.id, requestOptions)
        .then(response => {
           if(response.ok){
                response.json();
                alert("Đổi mật khẩu thành công");
                window.location.href="";
           }else{
               alert("Lỗi!");
           }
            
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    render() {
        console.log(this.state.user.id);
        return (
            <React.Fragment>
                <HeaderAuthor />
                <section className="content">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="wraper-profile">
                                <div className="wraper-header">
                                    <h3>ĐỔI MẬT KHẨU</h3>
                                </div>
                                <div className="wraper-body">
                                    <form onSubmit={(event) => this.submitForm(event)} >
                                        <div className="input-group">
                                            <label >Mật khẩu hiện tại:</label>
                                            <input type="password" name="current_pass" onChange={(event) => this.getValue(event)} autoComplete="new-password"  />
                                        </div>
                                        <div className="input-group">
                                            <label >Mật khẩu mới:</label>
                                            <input type="password" name="new_pass" minLength="8" onChange={(event) => this.getValue(event)} autoComplete="new-password"  />
                                        </div>
                                        <div className="input-group">
                                            <label >Xác nhận mật khẩu:</label>
                                            <input type="password" name="password_confirmation" id="password_confirmation" minLength="8" onChange={(event) => this.getValue(event)}  autoComplete="new-password" />
                                        </div>
                                        <input type="submit" name="capnhat" className="btn btn-outline-info" value="Đổi"/>
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

export default changePass;