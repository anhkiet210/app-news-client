import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';
import {Link} from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class MyNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            post: []
        }
    }

    componentDidMount() {
        this.loadDataProfile();
        this.loadPost();
        this.loadCategory();
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

    render() {
        var stt=0;
        var myNews = this.state.post.filter( (subpost) => (subpost.TacGia===this.state.user.id && this.state.user.id));
        return (
            <React.Fragment>
                <HeaderAuthor />
                <section className="content">
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="card">
                                    <div className="header">
                                        <h2>Bài viết của tôi</h2>
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
                                                        myNews.length > 0 ?
                                                        myNews.map((sub_myNews) => {
                                                            stt++;
                                                            return (
                                                                <tr key={sub_myNews.id}>
                                                                    <td style={{ verticalAlign: 'middle', textAlign: 'center', width: '50px' }} >{stt}</td>
                                                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{sub_myNews.TieuDe}</td>
                                                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                        {
                                                                            this.state.category.map((subcategory) => (
                                                                                subcategory.id === sub_myNews.idChuDe ?
                                                                                    subcategory.TenChuDe : ''
                                                                            ))
                                                                        }
                                                                    </td>
                                                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >{sub_myNews.TrichDan}</td>
                                                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} >
                                                                        <img src={sub_myNews.Anh} alt={sub_myNews.TieuDe} style={{ width: '70px', height: '90px' }} />
                                                                    </td>
                                                                    <th style={{ verticalAlign: 'middle', textAlign: 'center' }} scope="col">
                                                                        <Link to={`/authordashboard/chitiet/${sub_myNews.id}`} className="btn btn-info" >Chi tiết</Link>
                                                                    </th>
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
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default MyNews;