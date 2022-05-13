import React, { Component, useEffect, useState } from 'react';
import BigNewsItem from './BigNewsItem';
import Footer from './Footer';
import Header from './Header';
import HorizontalContent from './HorizontalContent';
import Menu from './Menu';
import NewsEventItem from './NewsEventItem';
import SmallContentItemCol3 from './SmallContentItemCol3';
import SmallContentItemCol4 from './SmallContentItemCol4';
import VerticalContent from './VerticalContent';
import Loading from './Loading';
// class AnSinh extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             post: []
//         }
//     }

//     componentDidMount() {
//         this.loadPost();
//     }

//     //load post
//     loadPost = async () => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         await fetch("https://app-news-laravel.herokuapp.com/api/Post", requestOptions)
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error(response.status);
//             })
//             .then(result => {
//                 this.setState({ post: result });
//             })
//             .catch(error => console.log('error', error));
//     }
//     render() {
//         var ansinh_post = this.state.post.filter( (subansinh) => (subansinh.idChuDe === 8 && subansinh.TrangThai===1));
//         return (
//            <div>
//                <Header></Header>
//                <Menu></Menu>
//                <div className="main container">
//                 <div className="container">
//                     <div className="Title-page">
//                         <h1>
//                             <a href="/an-sinh">An Sinh</a>
//                         </h1>
//                     </div>
//                 </div>
//                 {/* begin content */}
//                 <div className="container big-content">
//                     <div className="row">
//                         <div className="col-8 ">
//                         {
//                             ansinh_post.slice(ansinh_post.length-1, ansinh_post.length).map( (subansinh) => (
//                                 <BigNewsItem
//                                     key={subansinh.id}
//                                     idpost={subansinh.id}
//                                     tieude={subansinh.TieuDe}
//                                     anh={subansinh.Anh}
//                                     trichdan={subansinh.TrichDan}
//                                 ></BigNewsItem>
//                             ))
//                         }
//                         </div>
//                         <div className="col-4 list-news-event">
//                             <ul>
//                             {
//                                 ansinh_post.slice(ansinh_post.length-9, ansinh_post.length-1).map( (subansinh) => (
//                                     <NewsEventItem
//                                         key={subansinh.id}
//                                         idpost={subansinh.id}
//                                         tieude={subansinh.TieuDe}
//                                     ></NewsEventItem>
//                                 ))
//                             }
//                             </ul>
//                         </div>
//                     </div>
//                     <hr />
//                 </div>
//                 <div className="container small-content">
//                     <div className="row">
//                     {
//                         ansinh_post.slice(ansinh_post.length-7, ansinh_post.length-4).map( (subansinh) => (
//                             <SmallContentItemCol4
//                                 key={subansinh.id}
//                                 idpost={subansinh.id}
//                                 tieude={subansinh.TieuDe}
//                                 anh={subansinh.Anh}
//                             ></SmallContentItemCol4>
//                         ))
//                     }
//                     </div>
//                     <hr />
//                 </div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-8 content-left">
//                         {
//                             ansinh_post.slice(ansinh_post.length-10, ansinh_post.length-2).map( (subansinh) => (
//                                 <HorizontalContent
//                                     key={subansinh.id}
//                                     idpost={subansinh.id}
//                                     tieude={subansinh.TieuDe}
//                                     trichdan={subansinh.TrichDan}
//                                     anh={subansinh.Anh}
//                                 ></HorizontalContent>
//                             ))
//                         }
//                         </div>
//                         <div className="col-4 content-right">
//                         {
//                             ansinh_post.slice(ansinh_post.length-7, ansinh_post.length-3).map( (subansinh) => (
//                                 <VerticalContent
//                                     key={subansinh.id}
//                                     idpost={subansinh.id}
//                                     tieude={subansinh.TieuDe}
//                                     trichdan={subansinh.TrichDan}
//                                     anh={subansinh.Anh}
//                                 ></VerticalContent>
//                             ))
//                         }
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container small-content">
//                     <div className="row">
//                     {
//                         ansinh_post.slice(ansinh_post.length-10, ansinh_post.length-2).map( (subansinh) => (
//                             <SmallContentItemCol3 
//                                 key={subansinh.id}
//                                 idpost={subansinh.id}
//                                 tieude={subansinh.TieuDe}
//                                 trichdan={subansinh.TrichDan}
//                                 anh={subansinh.Anh}
//                             ></SmallContentItemCol3>
//                         ))
//                     }
//                     </div>
//                     <hr />
//                 </div>
//                 {/* end content */}
//             </div>
//                <Footer></Footer>
//            </div>
//         );
//     }
// }

const AnSinh = () => {
    const [post, setPost] = useState([])
    const ansinh_post = post && post.filter( (subpost) => (subpost.idChuDe === 4 && subpost.TrangThai === 1))
    const [loading, setLoading] = useState(false)

    // get posts
    useEffect(() => {
        const fetchDate = async () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            await fetch("http://127.0.0.1:8000/api/Post", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPost(result)
                    setLoading(false)
                })
                .catch(error => console.log('error', error))
                .finally( () => setLoading(false))
        }
        fetchDate()
    }, [])
    return loading ? <Loading /> : (
        <div>
            <Header></Header>
            <Menu></Menu>
            <div className="main container">
                <div className="container">
                    <div className="Title-page">
                        <h1>
                            <a href="/an-sinh">An Sinh</a>
                        </h1>
                    </div>
                </div>
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {   
                                ansinh_post.slice(ansinh_post.length - 1, ansinh_post.length).map((subansinh) => (
                                    <BigNewsItem
                                        key={subansinh.id}
                                        idpost={subansinh.id}
                                        tieude={subansinh.TieuDe}
                                        anh={subansinh.Anh}
                                        trichdan={subansinh.TrichDan}
                                    ></BigNewsItem>
                                ))
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <ul>
                                {
                                    ansinh_post.slice(ansinh_post.length - 9, ansinh_post.length - 1).map((subansinh) => (
                                        <NewsEventItem
                                            key={subansinh.id}
                                            idpost={subansinh.id}
                                            tieude={subansinh.TieuDe}
                                        ></NewsEventItem>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            ansinh_post.slice(ansinh_post.length - 7, ansinh_post.length - 4).map((subansinh) => (
                                <SmallContentItemCol4
                                    key={subansinh.id}
                                    idpost={subansinh.id}
                                    tieude={subansinh.TieuDe}
                                    anh={subansinh.Anh}
                                ></SmallContentItemCol4>
                            ))
                        }
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-8 content-left">
                            {
                                ansinh_post.slice(ansinh_post.length - 10, ansinh_post.length - 2).map((subansinh) => (
                                    <HorizontalContent
                                        key={subansinh.id}
                                        idpost={subansinh.id}
                                        tieude={subansinh.TieuDe}
                                        trichdan={subansinh.TrichDan}
                                        anh={subansinh.Anh}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        <div className="col-4 content-right">
                            {
                                ansinh_post.slice(ansinh_post.length - 7, ansinh_post.length - 3).map((subansinh) => (
                                    <VerticalContent
                                        key={subansinh.id}
                                        idpost={subansinh.id}
                                        tieude={subansinh.TieuDe}
                                        trichdan={subansinh.TrichDan}
                                        anh={subansinh.Anh}
                                    ></VerticalContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            ansinh_post.slice(ansinh_post.length - 10, ansinh_post.length - 2).map((subansinh) => (
                                <SmallContentItemCol3
                                    key={subansinh.id}
                                    idpost={subansinh.id}
                                    tieude={subansinh.TieuDe}
                                    trichdan={subansinh.TrichDan}
                                    anh={subansinh.Anh}
                                ></SmallContentItemCol3>
                            ))
                        }
                    </div>
                    <hr />
                </div>
                {/* end content */}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default AnSinh;