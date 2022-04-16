import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class UpdateNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            TacGia: [],
            chude: [],
            url_post: "http://localhost:8000/api/Post/" + this.props.match.params.id
        }
    }

    componentDidMount() {
        this.loadCategory();
        this.loadTacGia();
        this.loadPost(this.state.url_post);
    }

    //load bài viết cần update
    loadPost = (url) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    TieuDe: result.TieuDe,
                    idChuDe: result.idChuDe,
                    TrichDan: result.TrichDan,
                    NoiDung: result.NoiDung,
                    TrangThai: result.TrangThai,
                    idTacGia: result.TacGia,
                    Anh: result.Anh
                });
            })
            .catch(error => console.log('error', error));
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
                this.setState({ category: result });
            })
            .catch(error => console.log('error', error));
    }

    //chủ đề hiện tại của bài viêt
    current_category_of_post = () => {
        var chude_tam = this.state.category.filter((subcategory) => (subcategory.id === this.state.post.idChuDe));
        if (chude_tam.length > 0) {
            // this.setState({chude: chude_tam});
        }
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

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    onImagechange = (event) => {
        if (event.target.files && event.target.files[0]) {
            // console.log(event.target.files);
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ Anh: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    // get value of CKEditor
    getValueCKEditor = (event, editor) => {
        this.setState({
            NoiDung: editor.getData()
        });
        console.log(this.state.NoiDung);
    }


    // submitForm
    submitFormUpdate = (event) => {
        //chặn sự kiện mặc định
        event.preventDefault();
        if(this.state.idChuDe !== 0 && this.state.idChuDe){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "TieuDe": this.state.TieuDe,
                "idChuDe": this.state.idChuDe,
                "TrichDan": this.state.TrichDan,
                "NoiDung": this.state.NoiDung,
                "Anh": this.state.Anh
            });

            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(this.state.url_post, requestOptions)
            .then(response => {
                if(response.ok){
                    response.json()
                    alert("Cập nhật bài viết thành công");
                    window.location.href = "/authordashboard/home";
                }
                throw new Error(response.status);
            })
            .catch(error => console.log('error', error));
        }
        else{
            alert("Hãy chọn chủ đề");
        }
        
    }

    render() {
        var chude = this.state.category.filter((subcategory) => (subcategory.id === this.state.idChuDe));
        var current_tacgia = this.state.TacGia.filter((subtacgia) => (subtacgia.id === this.state.idTacGia));
        // console.log(this.state.TieuDe);
        return (
            <React.Fragment>
                <HeaderAuthor></HeaderAuthor>
                <section className="content">
                    <div className="container">
                        <div className="container-fluid">
                            <div className="row clearfix">
                                <div className="wraper-add-news">
                                    <div className="wraper-header">
                                        <h3>Cập nhật tin số: {this.props.match.params.id}</h3>
                                    </div>
                                    <form className="form-add-news" onSubmit={(event) => this.submitFormUpdate(event)}>
                                        <div className="input-group">
                                            <label >Tiêu đề</label>
                                            <textarea name="TieuDe" onChange={(event) => this.getValue(event)} defaultValue={this.state.TieuDe} className="form-add-news--tieude" cols={30} rows={4} placeholder="Nhập tiêu đề cho bài viết..." required />
                                        </div>
                                        <div className="input-group">
                                            <label >Chủ đề</label>
                                            <select name="idChuDe" className="form-add-news--chude" onChange={(event) => this.getValue(event)}>
                                                {
                                                    chude.map((subchude) => (
                                                        <React.Fragment key={subchude.id}>
                                                            <option defaultValue={subchude.id}>{subchude.TenChuDe}</option>
                                                        </React.Fragment>
                                                    ))
                                                }
                                                {
                                                    this.state.category.map((item) => (
                                                        item.TrangThaiCD === 1 ?
                                                            <React.Fragment key={item.id}>
                                                                <option value={item.id}>{item.TenChuDe}</option>
                                                            </React.Fragment> :
                                                            <React.Fragment key={item.id}>
                                                                <option value={0}>Không có chủ đề để chọn</option>
                                                            </React.Fragment>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label >Trích dẫn</label>
                                            <textarea name="TrichDan" onChange={(event) => this.getValue(event)} defaultValue={this.state.TrichDan} className="form-add-news--trichdan" cols={30} rows={6} placeholder="Nhập trích dẫn cho bài viết..." required />
                                        </div>
                                        <div className="input-group" style={{ display: 'block' }}>
                                            <div className="title" style={{ textAlign: 'left' }}>
                                                <label >Nội dung</label>
                                            </div>
                                            <div className="form-add-news--noidung">
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    onChange={this.getValueCKEditor}
                                                    id="noidung"
                                                    data={this.state.NoiDung}
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group" style={{ display: 'block' }} >
                                            <div className="title" style={{ textAlign: 'left' }}>
                                                <label>Ảnh</label>

                                            </div>
                                            <div>
                                                <label htmlFor="Anh_Update" className="btn btn-outline-info form-add-news--Anh">Chọn ảnh<i className="fas fa-arrow-circle-up" style={{ marginLeft: '5px' }}></i></label>
                                                <input type="file" name="Anh" id="Anh_Update" className="input-anh" onChange={(event) => { this.onImagechange(event) }} />
                                                <img id="target" className="bind-img" src={this.state.Anh} accept="image/*" alt={this.state.TieuDe} />
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label >Tác giả</label>
                                            {
                                                current_tacgia.map((subtacgia) => (
                                                    <React.Fragment key={subtacgia.id}>
                                                        <input type="text" name="TacGia" value={subtacgia.name} className="form-add-news--tacgia" readOnly />
                                                    </React.Fragment>

                                                ))
                                            }
                                        </div>
                                        <input type="submit" value="Cập nhật" name="form-add-news--capnhat" className=" form-add-news--them btn btn-outline-info" />
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

export default UpdateNews;