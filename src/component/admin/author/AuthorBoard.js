import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';
import { Link } from "react-router-dom";


class AuthorBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            post: [],
            category: [],
            AllUser: []
        }
    }

    componentDidMount() {
        this.loadDataProfile();
        this.loadPost();
        this.loadCategory();
        this.loadAllUser();
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

    loadPost = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Post", requestOptions)
            .then(response => response.json())
            .then(result => { this.setState({ post: result }); })
            .catch(error => console.log('error', error));
    }

    loadCategory = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Category", requestOptions)
            .then(response => response.json())
            .then(result => { this.setState({ category: result }); })
            .catch(error => console.log('error', error));
    }

    loadAllUser = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/getAll-user-profile", requestOptions)
            .then(response => response.json())
            .then(result => { this.setState({ AllUser: result }); })
            .catch(error => console.log('error', error));
    }

    //hiển thị tổng số bài viết của tui
    hienthi_Sum_my_news = (my_news) => {
        if (this.state.user.accounttype === 0) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-file-alt"></i>
                        </div>
                        <div className="content">
                            <div className="text">TỔNG SỐ BÀI VIẾT CỦA TÔI</div>
                            <div className="number">{my_news.length}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị tổng bài viết chờ duyệt
    hienthi_Sum_post_pending = (tong_post_pending, my_news_pending) => {
        if (this.state.user.accounttype === 1) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-scroll" />
                        </div>
                        <div className="content">
                            <div className="text">BÀI VIẾT CHỜ DUYỆT</div>
                            <div className="number">{tong_post_pending}</div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.user.accounttype === 0) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-scroll" />
                        </div>
                        <div className="content">
                            <div className="text">BÀI VIẾT CHỜ DUYỆT</div>
                            <div className="number">{my_news_pending}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị tổng số người dùng
    hienthi_Sum_author = (author) => {
        if (this.state.user.accounttype === 2) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="content">
                            <div className="text">TỔNG SỐ NGƯỜI DÙNG</div>
                            <div className="number">{author.length}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị danh sách người dùng
    hienthi_ListUser = (author) => {
        var stt = 0;
        if (this.state.user.accounttype === 2) {
            return (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="card" >
                        <div className="header">
                            <h2>Danh sách tác giả</h2>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <table className="table table-hover dashboard-task-infos" id="myTable">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tên</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Email</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Chức vụ</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="middle">
                                        {
                                            author.length > 0 ?
                                                author.map((subuser) => {
                                                    stt++;
                                                    return (
                                                        <React.Fragment key={subuser.id}>
                                                            <tr>
                                                                <td style={{ verticalAlign: 'middle', width: '50px' }} >{stt}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{subuser.name}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{subuser.email}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                    {subuser.accounttype === 1 ? "Quản trị viên" : "Tác giả"}
                                                                </td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '150px' }} >
                                                                    <button className="btn btn-outline-secondary" onClick={() => this.reset_password(subuser.id)} title="Đặt lại mật khẩu thành 12345678">Reset Password</button>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    )
                                                }) :
                                                <tr>
                                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} colSpan="4">404 Not Found</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị tổng chủ đề chờ duyệt
    hienthi_Sum_category_pending = (category_pending) => {
        if (this.state.user.accounttype === 1) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-newspaper" />
                        </div>
                        <div className="content">
                            <div className="text">CHỦ ĐỀ CHỜ DUYỆT</div>
                            <div className="number">{category_pending.length}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị chủ đề chờ duyệt
    category_pending = (category_pending) => {
        var stt = 1;
        if (this.state.user.accounttype === 1) {
            return (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="card" style={{ marginLeft: 'auto', marginRight: 'auto', width: '700px' }}>
                        <div className="header">
                            <h2>Chủ đề chờ duyệt</h2>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <table className="table table-hover dashboard-task-infos" id="myTable">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tên chủ đề</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="middle">
                                        {
                                            category_pending.length > 0 ?
                                                category_pending.map((subcategory) => {
                                                    return (
                                                        <React.Fragment key={subcategory.id}>
                                                            <tr>
                                                                <td style={{ verticalAlign: 'middle', width: '50px' }} >{stt}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{subcategory.TenChuDe}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '150px' }} >
                                                                    <div className="btn-group" style={{ width: '100%' }}>
                                                                        <button className="btn btn-outline-info" onClick={() => this.accept_category(subcategory.id)}>Duyệt</button>
                                                                        <button className="btn btn-outline-danger" onClick={() => this.delete_category(subcategory.id)}>Xóa</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    )
                                                    stt++;
                                                }) :
                                                <tr>
                                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} colSpan="3">404 Not Found</td>
                                                </tr>

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị bài viết chờ duyệt
    hienthi_post_pending = () => {
        var post_pending = this.state.post.filter((subpost) => {
            return subpost.TrangThai === 0;
        })
        var stt = 0;
        if (this.state.user.accounttype === 1) {
            return (
                <div className="row clearfix">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="header">
                                <h2>Các bài viết chờ duyệt</h2>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-hover dashboard-task-infos" id="myTable">
                                        <thead>
                                            <tr>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tiêu đề</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Chủ đề</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Trích dẫn</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ảnh</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="middle">
                                            {
                                                post_pending.length > 0 ?
                                                    post_pending.map((subpost) => {
                                                        stt++
                                                        return (
                                                            <tr key={subpost.id}>
                                                                <td style={{ verticalAlign: 'middle', width: '50px', textAlign: 'center' }} >{stt}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{subpost.TieuDe}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                    {
                                                                        this.state.category.map((subcategory) => (
                                                                            subcategory.id === subpost.idChuDe ?
                                                                                subcategory.TenChuDe : ''
                                                                        ))
                                                                    }
                                                                </td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{subpost.TrichDan}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                    <img src={subpost.Anh} alt={subpost.TieuDe} style={{ width: '70px', height: '90px' }} />
                                                                </td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '150px' }} >
                                                                    <div className="btn-group" style={{ width: '100%' }}>
                                                                        <Link to={`/authordashboard/chitiet/${subpost.id}`} className="btn btn-outline-info" >Chi tiết</Link>
                                                                        <button className="btn btn-outline-danger" onClick={() => this.delete_post(subpost.id)}>Xóa</button>
                                                                        {/* <Link to={`/authordashboard/delete?id=${subpost.id}`} className="btn btn-danger" >Xóa</Link> */}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }} colSpan="6">404 Not Found</td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị bài viết chờ duyệt của tôi
    hienthi_my_post_pending = (my_post_pending) => {
        var stt = 0;
        if (this.state.user.accounttype === 0) {
            return (
                <div className="row clearfix">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="header">
                                <h2>Bài viết chờ duyệt</h2>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-hover dashboard-task-infos" id="myTable">
                                        <thead>
                                            <tr>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tiêu đề</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Chủ đề</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Trích dẫn</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ảnh</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="middle">
                                            {
                                                my_post_pending.length > 0 ?
                                                    my_post_pending.map((subpost) => {
                                                        stt++
                                                        return (
                                                            <tr key={subpost.id}>
                                                                <td style={{ verticalAlign: 'middle', width: '50px', textAlign: 'center' }} >{stt}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{subpost.TieuDe}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                    {
                                                                        this.state.category.map((subcategory) => (
                                                                            subcategory.id === subpost.idChuDe ?
                                                                                subcategory.TenChuDe : ''
                                                                        ))
                                                                    }
                                                                </td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{subpost.TrichDan}</td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                    <img src={subpost.Anh} alt={subpost.TieuDe} style={{ width: '70px', height: '90px' }} />
                                                                </td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '150px' }} >
                                                                    <div className="btn-group" style={{ width: '100%' }}>
                                                                        <Link to={`/authordashboard/update/${subpost.id}`} className="btn btn-warning" >Sửa</Link>
                                                                        <button className="btn btn-danger" onClick={() => this.delete_post(subpost.id)}>Xóa</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }} colSpan="6">404 Not Found</td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hiển thị bài viết của tui đăng gần đây
    hienthi_recent_post = (recent_post) => {
        var stt = 0;
        if (this.state.user.accounttype === 0) {
            return (
                <div className="row clearfix">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="header">
                                <h2>Bài viết đã đăng gần đây</h2>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-hover dashboard-task-infos" id="myTable">
                                        <thead>
                                            <tr>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tiêu đề</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Chủ đề</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Trích dẫn</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ảnh</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="middle">
                                            {
                                                recent_post.slice(0, 10).map((sub_recent_news) => {
                                                    stt++;
                                                    return (
                                                        <tr key={sub_recent_news.id}>
                                                            <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '50px' }} >{stt}</td>
                                                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{sub_recent_news.TieuDe}</td>
                                                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                {
                                                                    this.state.category.map((subcategory) => (
                                                                        subcategory.id === sub_recent_news.idChuDe ?
                                                                            subcategory.TenChuDe : ''
                                                                    ))
                                                                }
                                                            </td>
                                                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{sub_recent_news.TrichDan}</td>
                                                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                <img src={sub_recent_news.Anh} alt={sub_recent_news.TieuDe} style={{ width: '70px', height: '90px' }} />
                                                            </td>
                                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">
                                                                <Link to={`/authordashboard/chitiet/${sub_recent_news.id}`} className="btn btn-info" >Chi tiết</Link>
                                                            </th>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //duyệt chủ đề
    accept_category = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "TrangThaiCD": 1
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/CategoryStatus/" + id, requestOptions)
            .then(response => (response.json()))
            .then(result => {
                // console.log(result);
                alert(`Đã duyệt chủ đề: ${result.TenChuDe}`);
                window.location.href = "";
            })
            .catch(error => console.log('error', error));
    }

    //xóa chủ đề
    delete_category = (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Category/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(`Đã xóa chủ đề: ${result.TenChuDe}`);
                window.location.href = "";
            })
            .catch(error => console.log('error', error));
    }

    //xóa bài viết
    delete_post = (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Post/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                alert(`Đã xóa bài viết số ${result.id}`);
                window.location.href = "";
            })
            .catch(error => console.log('error', error));
    }

    //đặt lại mật khẩu người dùng
    reset_password = (id) => {
        console.log("http://localhost:8000/api/resetPassword/" + id);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "new_pass": "12345678"
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8000/api/resetPassword/" + id, requestOptions)
        .then(response => {
           if(response.ok){
                response.json();
                alert("Đã đặt lại mật khẩu");
                window.location.href="";
           }else{
               alert("Lỗi!");
           }
            
        })
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    render() {
        var post_pending = this.state.post.filter((subpost) => {
            return subpost.TrangThai === 0;
        })
        var my_post_pending = this.state.post.filter((subpost) => (subpost.TrangThai === 0 && subpost.TacGia === this.state.user.id));
        var my_news = this.state.post.filter((subpost) => {
            return subpost.TacGia === this.state.user.id && subpost.TrangThai === 1;
        })
        var recent_post = my_news.reverse();
        var category_pending = this.state.category.filter((subcategory) => (subcategory.TrangThaiCD === 0));
        var author = this.state.AllUser.filter((item) => (item.accounttype !== 2));
        return (
            <React.Fragment>
                <HeaderAuthor></HeaderAuthor>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row clearfix">
                            {/* show tổng số bài viết của tôi */}
                            {this.hienthi_Sum_my_news(my_news)}
                            {/* show tổng số chủ đề chờ duyệt */}
                            {this.hienthi_Sum_category_pending(category_pending)}
                            {/* show tổng số bài viết chờ duyệt*/}
                            {this.hienthi_Sum_post_pending(post_pending.length, my_post_pending.length)}
                            {/* show tổng số người dùng */}
                            {this.hienthi_Sum_author(author)}
                        </div>
                        <div className="row clearfix">
                            {this.category_pending(category_pending)}
                            {this.hienthi_ListUser(author)}
                        </div>
                        {this.hienthi_post_pending()}
                        {this.hienthi_my_post_pending(my_post_pending)}
                        {this.hienthi_recent_post(recent_post)}
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default AuthorBoard;