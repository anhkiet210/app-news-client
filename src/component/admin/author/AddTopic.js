import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';


class AddTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TenChuDe: ""
        }
    }

    //lấy dữ liệu trong thẻ input
    getInputValue = (event) => {
        const value = event.target.value;
        // console.log(value);

        this.setState({
            TenChuDe: value
        });
    }

    // submitForm
    submitForm = (event) => {
        //chặn sự kiện mặc định của form
        event.preventDefault();
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const regex1 = /[0-9]/g;
        if(regex.test(this.state.TenChuDe)){
            alert("Chủ đề không được chứa kí tự đặc biệt");
            return;
        }
        if(regex1.test(this.state.TenChuDe)){
            alert("Chủ đề không được chứa chữ số");
            return;
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(this.state),
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Category", requestOptions)
            .then(response => {
                if(response.ok){
                    response.json();
                    alert("Thêm chủ đề thành công");
                    window.location.href="";
                }
            })
            // .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render() {
        // console.log(this.state);
        return (
            <div>
                <HeaderAuthor></HeaderAuthor>
                <section className="content">
                    <div className="container">
                        <div className="container-fluid">
                            <div className="row clearfix">
                                <div className="wraper-add-topic">
                                    <div className="title">
                                        <h3>THÊM CHỦ ĐỀ</h3>
                                    </div>
                                    <form method="POST" onSubmit={(event) => this.submitForm(event)}>
                                        <input type="text" onChange={event => this.getInputValue(event)} name="TenChuDe" id="ip-add-theme" placeholder="Nhập tên chủ đề muốn thêm" required />
                                        <input type="submit" value="Thêm" name="submit-add-theme" className="btn btn-outline-info" />
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

export default AddTopic;