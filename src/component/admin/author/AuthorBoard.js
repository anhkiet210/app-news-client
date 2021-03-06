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

    //hi???n th??? t???ng s??? b??i vi???t c???a tui
    hienthi_Sum_my_news = (my_news) => {
        if (this.state.user.accounttype === 0) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-file-alt"></i>
                        </div>
                        <div className="content">
                            <div className="text">T????NG S??? B??I VI???T C???A T??I</div>
                            <div className="number">{my_news.length}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hi???n th??? t???ng b??i vi???t ch??? duy???t
    hienthi_Sum_post_pending = (tong_post_pending, my_news_pending) => {
        if (this.state.user.accounttype === 1) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-scroll" />
                        </div>
                        <div className="content">
                            <div className="text">B??I VI???T CH???? DUY????T</div>
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
                            <div className="text">B??I VI???T CH???? DUY????T</div>
                            <div className="number">{my_news_pending}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hi???n th??? t???ng s??? ng?????i d??ng
    hienthi_Sum_author = (author) => {
        if (this.state.user.accounttype === 2) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="content">
                            <div className="text">T???NG S??? NG?????I D??NG</div>
                            <div className="number">{author.length}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hi???n th??? danh s??ch ng?????i d??ng
    hienthi_ListUser = (author) => {
        var stt = 0;
        if (this.state.user.accounttype === 2) {
            return (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="card" >
                        <div className="header">
                            <h2>Danh s??ch t??c gi???</h2>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <table className="table table-hover dashboard-task-infos" id="myTable">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">T??n</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Email</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ch???c v???</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao t??c</th>
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
                                                                    {subuser.accounttype === 1 ? "Qu???n tr??? vi??n" : "T??c gi???"}
                                                                </td>
                                                                <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '150px' }} >
                                                                    <button className="btn btn-outline-secondary" onClick={() => this.reset_password(subuser.id)} title="?????t l???i m???t kh???u th??nh 12345678">Reset Password</button>
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

    //hi???n th??? t???ng ch??? ????? ch??? duy???t
    hienthi_Sum_category_pending = (category_pending) => {
        if (this.state.user.accounttype === 1) {
            return (
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                        <div className="icon">
                            <i className="fas fa-newspaper" />
                        </div>
                        <div className="content">
                            <div className="text">CH??? ????? CH??? DUY???T</div>
                            <div className="number">{category_pending.length}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //hi???n th??? ch??? ????? ch??? duy???t
    category_pending = (category_pending) => {
        var stt = 1;
        if (this.state.user.accounttype === 1) {
            return (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="card" style={{ marginLeft: 'auto', marginRight: 'auto', width: '700px' }}>
                        <div className="header">
                            <h2>Ch??? ????? ch??? duy???t</h2>
                        </div>
                        <div className="body">
                            <div className="table-responsive">
                                <table className="table table-hover dashboard-task-infos" id="myTable">
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">T??n ch??? ?????</th>
                                            <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao t??c</th>
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
                                                                        <button className="btn btn-outline-info" onClick={() => this.accept_category(subcategory.id)}>Duy???t</button>
                                                                        <button className="btn btn-outline-danger" onClick={() => this.delete_category(subcategory.id)}>X??a</button>
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

    //hi???n th??? b??i vi???t ch??? duy???t
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
                                <h2>C??c b??i vi???t ch??? duy???t</h2>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-hover dashboard-task-infos" id="myTable">
                                        <thead>
                                            <tr>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ti??u ?????</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ch??? ?????</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tr??ch d???n</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">???nh</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao t??c</th>
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
                                                                        <Link to={`/authordashboard/chitiet/${subpost.id}`} className="btn btn-outline-info" >Chi ti???t</Link>
                                                                        <button className="btn btn-outline-danger" onClick={() => this.delete_post(subpost.id)}>X??a</button>
                                                                        {/* <Link to={`/authordashboard/delete?id=${subpost.id}`} className="btn btn-danger" >X??a</Link> */}
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

    //hi???n th??? b??i vi???t ch??? duy???t c???a t??i
    hienthi_my_post_pending = (my_post_pending) => {
        var stt = 0;
        if (this.state.user.accounttype === 0) {
            return (
                <div className="row clearfix">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="header">
                                <h2>B??i vi???t ch??? duy???t</h2>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-hover dashboard-task-infos" id="myTable">
                                        <thead>
                                            <tr>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ti??u ?????</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ch??? ?????</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tr??ch d???n</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">???nh</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao t??c</th>
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
                                                                        <Link to={`/authordashboard/update/${subpost.id}`} className="btn btn-warning" >S???a</Link>
                                                                        <button className="btn btn-danger" onClick={() => this.delete_post(subpost.id)}>X??a</button>
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

    //hi???n th??? b??i vi???t c???a tui ????ng g???n ????y
    hienthi_recent_post = (recent_post) => {
        var stt = 0;
        if (this.state.user.accounttype === 0) {
            return (
                <div className="row clearfix">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="card">
                            <div className="header">
                                <h2>B??i vi???t ???? ????ng g???n ????y</h2>
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-hover dashboard-task-infos" id="myTable">
                                        <thead>
                                            <tr>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">STT</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ti??u ?????</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Ch??? ?????</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Tr??ch d???n</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">???nh</th>
                                                <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">Thao t??c</th>
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
                                                                <Link to={`/authordashboard/chitiet/${sub_recent_news.id}`} className="btn btn-info" >Chi ti???t</Link>
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

    //duy???t ch??? ?????
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
                alert(`???? duy???t ch??? ?????: ${result.TenChuDe}`);
                window.location.href = "";
            })
            .catch(error => console.log('error', error));
    }

    //x??a ch??? ?????
    delete_category = (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Category/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert(`???? x??a ch??? ?????: ${result.TenChuDe}`);
                window.location.href = "";
            })
            .catch(error => console.log('error', error));
    }

    //x??a b??i vi???t
    delete_post = (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Post/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                alert(`???? x??a b??i vi???t s??? ${result.id}`);
                window.location.href = "";
            })
            .catch(error => console.log('error', error));
    }

    //?????t l???i m???t kh???u ng?????i d??ng
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
                alert("???? ?????t l???i m???t kh???u");
                window.location.href="";
           }else{
               alert("L???i!");
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
                            {/* show t???ng s??? b??i vi???t c???a t??i */}
                            {this.hienthi_Sum_my_news(my_news)}
                            {/* show t???ng s??? ch??? ????? ch??? duy???t */}
                            {this.hienthi_Sum_category_pending(category_pending)}
                            {/* show t???ng s??? b??i vi???t ch??? duy???t*/}
                            {this.hienthi_Sum_post_pending(post_pending.length, my_post_pending.length)}
                            {/* show t???ng s??? ng?????i d??ng */}
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