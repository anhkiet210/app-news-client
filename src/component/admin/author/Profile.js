import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    componentDidMount(){
        this.loadProfile();
    }

    loadProfile = () => {
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
                this.setState({
                    id: result.id, 
                    name: result.name,
                    email: result.email,
                    accounttype: result.accounttype,
                    ngaytao: result.created_at
                });
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(value);
    }

    // submitForm
    submitForm = (event) => {
        //chặn sự kiện mặc định của form
        event.preventDefault();
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(regex.test(this.state.name)){
            alert("Họ tên không được rỗng và không chứ ký tự đặc biệt!");
        }else{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "name": this.state.name
            });

            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("http://localhost:8000/api/updateProfile/" + this.state.id, requestOptions)
            .then(response => {
                if(response.ok){
                    response.json();
                    alert("Cập nhật thông tin thành công");
                    window.location.href=""
                }
            })
            // .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
    }

    render() {
        return (
            <div>
                <HeaderAuthor></HeaderAuthor>
                <section className="content">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="wraper-profile">
                                <div className="wraper-header">
                                    <h3>THÔNG TIN CÁ NHÂN</h3>
                                </div>
                                <div className="wraper-body">
                                    <form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
                                        <div className="input-group">
                                            <label >Họ tên: <span style={{ fontWeight: 'normal', fontStyle: 'italic', fontSize: '14px' }}>(Không được chứa kí tự đặc biệt)</span></label>
                                            <input type="text" name="name" onChange={(event) => this.getValue(event)} defaultValue={this.state.name} autoComplete="new_pass" required />
                                        </div>
                                        <div className="input-group">
                                            <label >Email:</label>
                                            <input type="email" name="email"  defaultValue={this.state.email} readOnly/>
                                        </div>
                                        <div className="input-group">
                                            <label >Ngày tạo tài khoản:</label>
                                            <input type="text" name="ngay"  defaultValue={this.state.ngaytao} readOnly/>
                                        </div>
                                        <div className="input-group">
                                            <label >Loại tài khoản:</label>
                                            {this.state.accounttype === 0 && <input type="text" name="loaitk" defaultValue={"Tác Giả"} readOnly />}
                                            {this.state.accounttype === 1 && <input type="text" name="loaitk" defaultValue={"Quản trị"} readOnly />}
                                            {this.state.accounttype === 2 && <input type="text" name="loaitk" defaultValue={"Quản trị hệ thống"} readOnly />}
                                            
                                        </div>
                                        <input type="submit" name="capnhat" className="btn btn-outline-info" value="Cập nhật"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;