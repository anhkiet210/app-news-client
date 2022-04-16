import React, { Component, useEffect, useState } from 'react';
import BigNewsItem from './BigNewsItem';
import Footer from './Footer';
import Header from './Header';
import HorizontalContent from './HorizontalContent';
import Loading from './Loading';
import Menu from './Menu';
import NewsEventItem from './NewsEventItem';
import SmallContentItemCol3 from './SmallContentItemCol3';
import SmallContentItemCol4 from './SmallContentItemCol4';
import VerticalContent from './VerticalContent';

// class TheThao extends Component {
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
//         var thethao_post = this.state.post.filter( (subpost) => (subpost.idChuDe === 2 && subpost.TrangThai===1));
//         return (
//             <div>
//                 <Header></Header>
//                 <Menu></Menu>
//                 <div className="main container">
//                 <div className="container">
//                     <div className="Title-page">
//                         <h1>
//                             {/* <Link to="/the-thao">Thể Thao</Link> */}
//                             <a href="/the-thao">Thể Thao</a>
//                         </h1>
//                     </div>
//                 </div>
//                 {/* begin content */}
//                 <div className="container big-content">
//                     <div className="row">
//                         <div className="col-8 ">
//                            {
//                                thethao_post.slice(thethao_post.length-1, thethao_post.length).map( (subthethao) => (
//                                    <BigNewsItem
//                                         key={subthethao.id}
//                                         idpost={subthethao.id}
//                                         tieude={subthethao.TieuDe}
//                                         trichdan={subthethao.TrichDan}
//                                         anh={subthethao.Anh}
//                                    ></BigNewsItem>
//                                ))
//                            }
//                         </div>
//                         <div className="col-4 list-news-event">
//                             <ul>
//                                 {
//                                     thethao_post.slice(thethao_post.length-9, thethao_post.length-1).map( (subthethao) => (
//                                         <NewsEventItem
//                                             key={subthethao.id}
//                                             idpost={subthethao.id}
//                                             tieude={subthethao.TieuDe}
//                                         ></NewsEventItem>
//                                     )) 
//                                 }
//                             </ul>
//                         </div>
//                     </div>
//                     <hr />
//                 </div>
//                 <div className="container small-content">
//                     <div className="row">
//                         {
//                             thethao_post.slice(thethao_post.length-7, thethao_post.length-4).map( (subthethao) => (
//                                 <SmallContentItemCol4
//                                     key={subthethao.id}
//                                     idpost={subthethao.id}
//                                     tieude={subthethao.TieuDe}
//                                     anh={subthethao.Anh}
//                                 ></SmallContentItemCol4>
//                             ))
//                         }
//                     </div>
//                     <hr />
//                 </div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-8 content-left">
//                            {
//                                thethao_post.slice(thethao_post.length-10, thethao_post.length-2).map( (subthethao) => (
//                                    <HorizontalContent
//                                         key={subthethao.id}
//                                         idpost={subthethao.id}
//                                         tieude={subthethao.TieuDe}
//                                         trichdan={subthethao.TrichDan}
//                                         anh={subthethao.Anh}
//                                    ></HorizontalContent>
//                                ))
//                            }
//                         </div>
//                         <div className="col-4 content-right">
//                             {
//                                 thethao_post.slice(thethao_post.length-7, thethao_post.length-3).map( (subthethao) => (
//                                     <VerticalContent
//                                         key={subthethao.id}
//                                         idpost={subthethao.id}
//                                         tieude={subthethao.TieuDe}
//                                         trichdan={subthethao.TrichDan}
//                                         anh={subthethao.Anh}
//                                     ></VerticalContent>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container small-content">
//                     <div className="row">
//                         {
//                             thethao_post.slice(thethao_post.length-10, thethao_post.length-2).map( (subthethao) => (
//                                 <SmallContentItemCol3
//                                     key={subthethao.id}
//                                     idpost={subthethao.id}
//                                     tieude={subthethao.TieuDe}
//                                     anh={subthethao.Anh}
//                                 ></SmallContentItemCol3>
//                             ))
//                         }
//                     </div>
//                     <hr />
//                 </div>
//                 {/* end content */}
//             </div>
//                 <Footer></Footer>
//             </div>
//         );
//     }
// }

const TheThao = () => {
    const [post, setPost] = useState([])
    const thethao_post = post && post.filter( (subpost) => (subpost.idChuDe === 2 && subpost.TrangThai === 1))
    const [loading, setLoading] = useState(false)

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
                    setPost(result)
                    setLoading(false)
                })
                .catch(error => console.log('error', error))
                .finally( () => setLoading(false))
        }
        fetchDate()
    }, [])


    return loading ? <Loading /> :(
        <div>
            <Header></Header>
            <Menu></Menu>
            <div className="main container">
                <div className="container">
                    <div className="Title-page">
                        <h1>
                            {/* <Link to="/the-thao">Thể Thao</Link> */}
                            <a href="/the-thao">Thể Thao</a>
                        </h1>
                    </div>
                </div>
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {   thethao_post &&
                                thethao_post.slice(thethao_post.length - 1, thethao_post.length).map((subthethao) => (
                                    <BigNewsItem
                                        key={subthethao.id}
                                        idpost={subthethao.id}
                                        tieude={subthethao.TieuDe}
                                        trichdan={subthethao.TrichDan}
                                        anh={subthethao.Anh}
                                    ></BigNewsItem>
                                ))
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <ul>
                                {
                                    thethao_post.slice(thethao_post.length - 9, thethao_post.length - 1).map((subthethao) => (
                                        <NewsEventItem
                                            key={subthethao.id}
                                            idpost={subthethao.id}
                                            tieude={subthethao.TieuDe}
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
                            thethao_post.slice(thethao_post.length - 7, thethao_post.length - 4).map((subthethao) => (
                                <SmallContentItemCol4
                                    key={subthethao.id}
                                    idpost={subthethao.id}
                                    tieude={subthethao.TieuDe}
                                    anh={subthethao.Anh}
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
                                thethao_post.slice(thethao_post.length - 10, thethao_post.length - 2).map((subthethao) => (
                                    <HorizontalContent
                                        key={subthethao.id}
                                        idpost={subthethao.id}
                                        tieude={subthethao.TieuDe}
                                        trichdan={subthethao.TrichDan}
                                        anh={subthethao.Anh}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        <div className="col-4 content-right">
                            {
                                thethao_post.slice(thethao_post.length - 7, thethao_post.length - 3).map((subthethao) => (
                                    <VerticalContent
                                        key={subthethao.id}
                                        idpost={subthethao.id}
                                        tieude={subthethao.TieuDe}
                                        trichdan={subthethao.TrichDan}
                                        anh={subthethao.Anh}
                                    ></VerticalContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            thethao_post.slice(thethao_post.length - 10, thethao_post.length - 2).map((subthethao) => (
                                <SmallContentItemCol3
                                    key={subthethao.id}
                                    idpost={subthethao.id}
                                    tieude={subthethao.TieuDe}
                                    anh={subthethao.Anh}
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

export default TheThao;