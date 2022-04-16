import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state= {
            user: "",
            post:[],
            category: [],
            TacGia: [],
            duyet: 1,
            url_post: "http://localhost:8000/api/Post/" + this.props.match.params.id
        }
    }
    
    componentDidMount(){
        this.loadDataProfile();
        this.loadCategory();
        this.loadPost(this.state.url_post);
        this.loadTacGia();
    }

    //load user-profile
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

    //load tất cả chủ đề
    loadCategory = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8000/api/Category", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({category: result});
            })
            .catch(error => console.log('error', error));
    }

    //load bài viết cần duyệt
    loadPost = (url) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => { this.setState({ post: result }); })
            .catch(error => console.log('error', error));
    }

    //load tác giả
    loadTacGia = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/getAll-user-profile/", requestOptions)
            .then(response => response.json())
            .then(result => { this.setState({ TacGia: result }); })
            .catch(error => console.log('error', error));
    }

    //hiển thị nút duyệt bài
    hienthi_btnduyet = (accounttype) => {
        if(accounttype === 1){
            return (
                <input type="submit" value="Duyệt" name="form-add-news--them" id="form-add-news--them" className="btn btn-outline-info" />
            )
        }
    }

    //submit form
    submitForm = (event) => {
        //chặn sự kiện mắc định của form
        event.preventDefault();
        // console.log("http://127.0.0.1:8000/api/PostStatus/" + this.state.post.id);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "TrangThai": this.state.duyet
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/PostStatus/" + this.state.post.id, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        .then(result => {
            // console.log(result),
            alert(`Đã duyệt bài viết số ${result.id}`);
            window.location.href="/authordashboard/home"
        })
        .catch(error => console.log('error', error));
    }

    render() {
        var chude = this.state.category.filter( (subcategory) => (subcategory.id === this.state.post.idChuDe));
        var current_tacgia = this.state.TacGia.filter( (subtacgia) => (subtacgia.id === this.state.post.TacGia));
        console.log(this.state.user.accounttype);
        return (
            <React.Fragment>
                <HeaderAuthor></HeaderAuthor>
                <section className="content">
                    <div className="container">
                        <div className="container-fluid">
                            <div className="row clearfix">
                                <div className="wraper-add-news">
                                    <div className="wraper-header">
                                        <h3>Chi tiết tin số: {this.state.post.id}</h3>
                                    </div>
                                    <form className="form-add-news" onSubmit={(event) => this.submitForm(event)}>
                                        <div className="input-group">
                                            <label >Tiêu đề</label>
                                            <textarea name="TieuDe"  value={this.state.post.TieuDe} className="form-add-news--tieude" cols={30} rows={4} placeholder="Nhập tiêu đề cho bài viết..." required readOnly/>
                                        </div>
                                        <div className="input-group">
                                            <label >Chủ đề</label>
                                            <select name="idChuDe" className="form-add-news--chude" readOnly>
                                                {/* <option  value={0}>Haycnfn</option> */}
                                                {
                                                    chude.map( (subchude) => (
                                                        <React.Fragment key={subchude.id}>
                                                            <option  value={subchude.id}>{subchude.TenChuDe}</option>
                                                        </React.Fragment>
                                                    ))
                                                }
                                                {/* {
                                                    this.state.category.map((item) => (
                                                        item.TrangThaiCD === 1?
                                                            <React.Fragment key={item.id}>
                                                                <option  value={item.id}>{item.TenChuDe}</option>
                                                            </React.Fragment> :
                                                            <React.Fragment key={item.id}>
                                                                <option  value={0}>Không có chủ đề để chọn</option>
                                                            </React.Fragment> 
                                                            
                                                    ))
                                                } */}
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label >Trích dẫn</label>
                                            <textarea name="TrichDan"  value={this.state.post.TrichDan} className="form-add-news--trichdan" cols={30} rows={6} placeholder="Nhập trích dẫn cho bài viết..." required />
                                        </div>
                                        <div className="input-group" style={{ display: 'block' }}>
                                            <div className="title" style={{ textAlign: 'left' }}>
                                                <label >Nội dung</label>
                                            </div>
                                            <div className="form-add-news--noidung">
                                                <CKEditor 
                                                    editor={ClassicEditor}
                                                    data={this.state.post.NoiDung}
                                                    id="noidung"
                                                    readOnly
                                                    
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group" style={{ display: 'block' }} >
                                            <div className="title" style={{ textAlign: 'left' }}>
                                                <label>Ảnh</label>
                                            </div>
                                            <div>
                                                {/* <label htmlFor="Anh" className="btn btn-outline-info form-add-news--Anh">Chọn ảnh<i className="fas fa-arrow-circle-up" style={{marginLeft: '5px'}}></i></label> */}
                                                {/* <input type="file" name="Anh" id="Anh" className="input-anh" onChange={(event) => {this.onImagechange(event)}}   required /> */}
                                                <img id="target" className="bind-img" src={this.state.post.Anh}  accept="image/*" alt={this.state.post.TieuDe}/>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label>Ngày đăng</label>
                                            <input type="text" value={this.state.post.NgayDang} name="NgayDang" className="form-add-news--tacgia" readOnly/>
                                        </div>
                                        <div className="input-group">
                                            <label >Tác giả</label>
                                            {
                                                current_tacgia.map( (subtacgia) => (
                                                    <input type="text" value={subtacgia.name} name="TacGia" className="form-add-news--tacgia" readOnly/>
                                                ))
                                            }
                                            
                                        </div>
                                        {this.hienthi_btnduyet(this.state.user.accounttype)}
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

export default NewsDetail;