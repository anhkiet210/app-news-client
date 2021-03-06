import React, { Component } from 'react';
import HeaderAuthor from './HeaderAuthor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class AddNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            "user": ""
        }
    }

    componentDidMount() {
        this.loadCategory();
        this.loadDataProfile();
    }

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    onImagechange = (event) =>{
        if (event.target.files && event.target.files[0]) {
            // console.log(event.target.files);
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({Anh: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    //load category
    loadCategory = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Category", requestOptions)
            .then(response => response.json())
            .then(result => this.setState({ category: result }))
            .catch(error => console.log('error', error));
    }

    // get value of CKEditor
    getValueCKEditor = (event, editor) => {
        this.setState({
            NoiDung: editor.getData()
        });
        // console.log(this.state.NoiDung);
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

    // submitForm
    submitForm = (event) => {
        //ch???n s??? ki???n m???c ?????nh c???a form
        event.preventDefault();
        if(this.state.idChuDe === 0 || this.state.idChuDe === -1){
            alert("B???n ch??a ch???n ch??? ?????");
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "TieuDe": this.state.TieuDe,
            "idChuDe": this.state.idChuDe,
            "TrichDan": this.state.TrichDan,
            "NoiDung": this.state.NoiDung,
            "Anh": this.state.Anh,
            "TacGia": this.state.user.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Post", requestOptions)
            .then(response => {
                response.json();
                if (response.ok) {
                    alert("Th??m b??i vi???t th??nh c??ng!");
                    window.location.href = "/authordashboard/home";
                }
                throw new Error(response.status)
            })
            .catch(error => console.log('error', error));
        
        // if(this.state.idChuDe !==0 && this.state.idChuDe !== -1){
        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify({
        //         "TieuDe": this.state.TieuDe,
        //         "idChuDe": this.state.idChuDe,
        //         "TrichDan": this.state.TrichDan,
        //         "NoiDung": this.state.NoiDung,
        //         "Anh": this.state.Anh,
        //         "TacGia": this.state.user.id
        //     });

        //     var requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: raw,
        //         redirect: 'follow'
        //     };

        //     fetch("http://localhost:8000/api/Post", requestOptions)
        //         .then(response => {
        //             response.json();
        //             if (response.ok) {
        //                 alert("Th??m b??i vi???t th??nh c??ng!");
        //                 window.location.href = "/authordashboard/home";
        //             }
        //             throw new Error(response.status)
        //         })
        //         .catch(error => console.log('error', error));
        // }
        // else{
        //     alert("B???n ch??a ch???n ch??? ?????");
        // }
        
    }

    render() {
        // console.log(this.state.Anh);
        return (
            <React.Fragment>
                <HeaderAuthor></HeaderAuthor>
                <section className="content">
                    <div className="container">
                        <div className="container-fluid">
                            <div className="row clearfix">
                                <div className="wraper-add-news">
                                    <div className="wraper-header">
                                        <h3>TH??M B??I VI???T</h3>
                                    </div>
                                    <form className="form-add-news" onSubmit={(event) => this.submitForm(event)}>
                                        <div className="input-group">
                                            <label >Ti??u ?????</label>
                                            <textarea name="TieuDe" onChange={(event) => this.getValue(event)} className="form-add-news--tieude" cols={30} rows={4} placeholder="Nh???p ti??u ????? cho b??i vi???t..." required />
                                        </div>
                                        <div className="input-group">
                                            <label >Ch??? ?????</label>
                                            <select name="idChuDe" className="form-add-news--chude" onChange={(event) => this.getValue(event)}>
                                                <option  value={-1}>H??y ch???n ch??? ?????...</option>
                                                {
                                                    this.state.category.map((item) => (
                                                        
                                                        item.TrangThaiCD === 1 ?
                                                            <React.Fragment key={item.id}>
                                                                <option  value={item.id}>{item.TenChuDe}</option>
                                                            </React.Fragment> :
                                                            <React.Fragment key={item.id}>
                                                                <option  value={0}>Kh??ng c?? ch??? ????? ????? ch???n</option>
                                                            </React.Fragment> 
                                                            
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label >Tr??ch d???n</label>
                                            <textarea name="TrichDan" onChange={(event) => this.getValue(event)} className="form-add-news--trichdan" cols={30} rows={6} placeholder="Nh???p tr??ch d???n cho b??i vi???t..." required />
                                        </div>
                                        <div className="input-group" style={{ display: 'block' }}>
                                            <div className="title" style={{ textAlign: 'left' }}>
                                                <label >N???i dung</label>
                                            </div>
                                            <div className="form-add-news--noidung">
                                                <CKEditor 
                                                    editor={ClassicEditor}
                                                    onChange={this.getValueCKEditor}
                                                    id="noidung"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group" style={{ display: 'block' }} >
                                            <div className="title" style={{ textAlign: 'left' }}>
                                                <label>???nh</label>
                                                
                                            </div>
                                            <div>
                                                <label htmlFor="Anh" className="btn btn-outline-info form-add-news--Anh">Ch???n ???nh<i className="fas fa-arrow-circle-up" style={{marginLeft: '5px'}}></i></label>
                                                <input type="file" name="Anh" id="Anh" className="input-anh" onChange={(event) => {this.onImagechange(event)}}   required />
                                                <img id="target" className="bind-img" src={this.state.Anh} alt={"???nh ?????i di???n tin"} accept="image/*" />
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label >T??c gi???</label>
                                            <input type="text" name="TacGia" value={this.state.user.name} className="form-add-news--tacgia" readOnly />
                                        </div>
                                        <input type="submit" value="Th??m" name="form-add-news--them" id="form-add-news--them" className="form-add-news--them btn btn-outline-info" />
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

export default AddNews;