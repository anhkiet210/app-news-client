import React, { Component, useEffect, useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import SmallContentItemCol3 from './SmallContentItemCol3';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import { useParams } from 'react-router-dom';

// class ChiTietTin extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             post: [],
//             posts: [],
//             TacGia: [],
//             url_post: "http://localhost:8000/api/Post/" + this.props.match.params.id
//         }
//     }


//     componentDidMount() {
//         this.loadPost(this.state.url_post);
//         this.loadPosts();
//         this.loadTacGia();
//     }

//     //load bài viết cần xem
//     loadPost = async (url) => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch(url, requestOptions)
//             .then(response => response.json())
//             .then(result => { this.setState({ post: result }); })
//             .catch(error => console.log('error', error));
//     }

//     //load tất cả bài viết
//     loadPosts = () => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch("http://localhost:8000/api/Post", requestOptions)
//             .then(response => response.json())
//             .then(result => { this.setState({ posts: result }); })
//             .catch(error => console.log('error', error));
//     }

//     //load tất cả chủ đề
//     loadCategory = () => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch("http://localhost:8000/api/Category", requestOptions)
//             .then(response => response.json())
//             .then(result => { this.setState({ category: result }); })
//             .catch(error => console.log('error', error));
//     }

//     //load tất cả tác giả
//     loadTacGia = () => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch("http://localhost:8000/api/getAll-user-profile/", requestOptions)
//             .then(response => response.json())
//             .then(result => { this.setState({ TacGia: result }); })
//             .catch(error => console.log('error', error));
//     }

//     render() {
//         const different_news = this.state.posts.filter((subpost) => (subpost.id !== this.state.post.id));
//         const related_news = different_news.filter((subpost) => (subpost.idChuDe === this.state.post.idChuDe));
//         const current_tacgia = this.state.TacGia.filter( (subtacgia) => (subtacgia.id===this.state.post.TacGia))
//         console.log(related_news);
//         return (
//             <React.Fragment>
//                 <Header />
//                 <Menu />
//                 <div className="chi-tiet-tin">
//                     <div className="container">
//                         <div className="row">
//                             <div className="chi-tiet">
//                                 <h1>{this.state.post.TieuDe}</h1>
//                                 <h5 style={{ marginTop: '20px ', marginBottom: '20px' }}><i>{this.state.post.TrichDan}</i></h5>
//                                 <p className="wrap-content">{ReactHtmlParser(this.state.post.NoiDung)}</p>
//                                 {
//                                     current_tacgia.map( (subtacgia) => (
//                                         <React.Fragment key={subtacgia.id}>
//                                             <p className="tac-gia" ><strong>{subtacgia.name}</strong></p>
//                                         </React.Fragment>
//                                     ))
//                                 }

//                                 <hr />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="container small-content">
//                         <div className="row">
//                             {
//                                 related_news.slice(related_news.length-8, related_news.length).map( (subpost) => (
//                                     <SmallContentItemCol3 
//                                         key={subpost.id}
//                                         idpost={subpost.id}
//                                         tieude={subpost.TieuDe}
//                                         anh={subpost.Anh}
//                                     ></SmallContentItemCol3>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>
//                 <Footer></Footer>
//             </React.Fragment>

//         );
//     }
// }

const ChiTietTin = () => {
    const params = useParams()
    const [post, setPost] = useState()
    const [posts, setPosts] = useState([])
    const [TacGia, setTacGia] = useState()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const different_news = post && posts.filter((subpost) => (subpost.id !== post.id));
    const related_news = different_news && different_news.filter((subpost) => (subpost.idChuDe === post.idChuDe));
    const current_tacgia = TacGia && TacGia.filter((subtacgia) => (subtacgia.id === post.TacGia))

    useEffect(() => {
        const loadPost = async (url) => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            fetch(`https://app-news-laravel.herokuapp.com/api/Post/${params.id}`, requestOptions)
                .then(response => response.json())
                .then(result => { 
                    setPost(result) 
                    setLoading(false)
                })
                .catch(error => console.log('error', error))
                .finally(() => {
                    setLoading(false)
                })
        }
        loadPost()
    }, [])

    useEffect(() => {
        const loadTacGia = async () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            await fetch("https://app-news-laravel.herokuapp.com/api/getAll-user-profile/", requestOptions)
                .then(response => response.json())
                .then(result => { 
                    setTacGia(result) 
                    setLoading(false)
                })
                .catch(error => console.log('error', error))
                .finally( () => {
                    setLoading(false)
                })
        }
        loadTacGia()
    }, [])

    useEffect(() => {
        const loadCategory = () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            fetch("https://app-news-laravel.herokuapp.com/api/Category", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setCategory(result)
                    setLoading(false)
                })
                .catch(error => console.log('error', error))
                .finally(() => { setLoading(false) })
        }

        loadCategory()
    }, [])

    // get posts
    useEffect(() => {
        const fetchDate = async () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            await fetch("https://app-news-laravel.herokuapp.com/api/Post", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPosts(result)
                    setLoading(false)
                })
                .catch(error => console.log('error', error))
                .finally(() => setLoading(false))
        }
        fetchDate()
    }, [])

    return Loading ? <Loading /> : (
        <React.Fragment>
            <Header />
            <Menu />
            <div className="chi-tiet-tin">
                <div className="container">
                    <div className="row">
                        <div className="chi-tiet">
                            <h1>{this.state.post.TieuDe}</h1>
                            <h5 style={{ marginTop: '20px ', marginBottom: '20px' }}><i>{this.state.post.TrichDan}</i></h5>
                            <p className="wrap-content">{ReactHtmlParser(this.state.post.NoiDung)}</p>
                            {
                                current_tacgia.map((subtacgia) => (
                                    <React.Fragment key={subtacgia.id}>
                                        <p className="tac-gia" ><strong>{subtacgia.name}</strong></p>
                                    </React.Fragment>
                                ))
                            }

                            <hr />
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            related_news.slice(related_news.length - 8, related_news.length).map((subpost) => (
                                <SmallContentItemCol3
                                    key={subpost.id}
                                    idpost={subpost.id}
                                    tieude={subpost.TieuDe}
                                    anh={subpost.Anh}
                                ></SmallContentItemCol3>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>

    );
}


export default ChiTietTin;