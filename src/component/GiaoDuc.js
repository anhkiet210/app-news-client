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
// class GiaoDuc extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             post: [],
//             category: []
//         }
//     }

//     componentDidMount() {
//         this.loadPost();
//     }

//     //load post
//     loadPost = () => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch("http://localhost:8000/api/Post", requestOptions)
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
//         var giaoduc_post = this.state.post.filter( (subpost) => (subpost.idChuDe === 6 && subpost.TrangThai===1));
//         return (
//             <div>
//                 <Header></Header>
//                 <Menu></Menu>
//                 <div className="main container">
//                 <div className="container">
//                     <div className="Title-page">
//                         <h1>
//                             {/* <Link to="/giao-duc">Giáo dục</Link> */}
//                             <a href="/giao-duc">Giáo dục</a>
//                         </h1>
//                     </div>
//                 </div>
//                 {/* begin content */}
//                 <div className="container big-content">
//                     <div className="row">
//                         <div className="col-8 ">
//                         {
//                             giaoduc_post.slice(giaoduc_post.length-1, giaoduc_post.length).map( (subgiaoduc) => (
//                                 <BigNewsItem
//                                     key={subgiaoduc.id}
//                                     idpost={subgiaoduc.id}
//                                     tieude={subgiaoduc.TieuDe}
//                                     trichdan={subgiaoduc.TrichDan}
//                                     anh={subgiaoduc.Anh}
//                                 ></BigNewsItem>
//                             ))
//                         }
//                         </div>
//                         <div className="col-4 list-news-event">
//                             <ul>
//                             {
//                                 giaoduc_post.slice(giaoduc_post.length-9, giaoduc_post.length-1).map( (subgiaitri) => (
//                                     <NewsEventItem
//                                         key={subgiaitri.id}
//                                         idpost={subgiaitri.id}
//                                         tieude={subgiaitri.TieuDe}
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
//                         giaoduc_post.slice(giaoduc_post.length-6, giaoduc_post.length-3).map( (subgiaitri) => (
//                             <SmallContentItemCol4
//                                 key={subgiaitri.id}
//                                 idpost={subgiaitri.id}
//                                 tieude={subgiaitri.TieuDe}
//                                 anh={subgiaitri.Anh}
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
//                             giaoduc_post.slice(giaoduc_post.length-10, giaoduc_post.length-2).map( (subgiaitri) => (
//                                 <HorizontalContent
//                                     key={subgiaitri.id}
//                                     idpost={subgiaitri.id}
//                                     tieude={subgiaitri.TieuDe}
//                                     trichdan={subgiaitri.TrichDan}
//                                     anh={subgiaitri.Anh}
//                                 ></HorizontalContent>
//                             ))
//                         }
//                         </div>
//                         <div className="col-4 content-right">
//                         {
//                             giaoduc_post.slice(giaoduc_post.length-7, giaoduc_post.length-3).map( (subgiaitri) => (
//                                 <VerticalContent
//                                     key={subgiaitri.id}
//                                     idpost={subgiaitri.id}
//                                     tieude={subgiaitri.TieuDe}
//                                     trichdan={subgiaitri.TrichDan}
//                                     anh={subgiaitri.Anh}
//                                 ></VerticalContent>
//                             ))
//                         }
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container small-content">
//                     <div className="row">
//                     {
//                         giaoduc_post.slice(giaoduc_post.length-10, giaoduc_post.length-2).map( (subgiaitri) => (
//                             <SmallContentItemCol3
//                                 key={subgiaitri.id}
//                                 idpost={subgiaitri.id}
//                                 tieude={subgiaitri.TieuDe}
//                                 anh={subgiaitri.Anh}
//                             ></SmallContentItemCol3>
//                         ))
//                     }
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

const GiaoDuc = () => {
    const [post, setPost] = useState([])
    const giaoduc_post = post && post.filter( (subpost) => (subpost.idChuDe === 4 && subpost.TrangThai === 1))
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
                            {/* <Link to="/giao-duc">Giáo dục</Link> */}
                            <a href="/giao-duc">Giáo dục</a>
                        </h1>
                    </div>
                </div>
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {
                                giaoduc_post.slice(giaoduc_post.length - 1, giaoduc_post.length).map((subgiaoduc) => (
                                    <BigNewsItem
                                        key={subgiaoduc.id}
                                        idpost={subgiaoduc.id}
                                        tieude={subgiaoduc.TieuDe}
                                        trichdan={subgiaoduc.TrichDan}
                                        anh={subgiaoduc.Anh}
                                    ></BigNewsItem>
                                ))
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <ul>
                                {
                                    giaoduc_post.slice(giaoduc_post.length - 9, giaoduc_post.length - 1).map((subgiaitri) => (
                                        <NewsEventItem
                                            key={subgiaitri.id}
                                            idpost={subgiaitri.id}
                                            tieude={subgiaitri.TieuDe}
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
                            giaoduc_post.slice(giaoduc_post.length - 6, giaoduc_post.length - 3).map((subgiaitri) => (
                                <SmallContentItemCol4
                                    key={subgiaitri.id}
                                    idpost={subgiaitri.id}
                                    tieude={subgiaitri.TieuDe}
                                    anh={subgiaitri.Anh}
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
                                giaoduc_post.slice(giaoduc_post.length - 10, giaoduc_post.length - 2).map((subgiaitri) => (
                                    <HorizontalContent
                                        key={subgiaitri.id}
                                        idpost={subgiaitri.id}
                                        tieude={subgiaitri.TieuDe}
                                        trichdan={subgiaitri.TrichDan}
                                        anh={subgiaitri.Anh}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        <div className="col-4 content-right">
                            {
                                giaoduc_post.slice(giaoduc_post.length - 7, giaoduc_post.length - 3).map((subgiaitri) => (
                                    <VerticalContent
                                        key={subgiaitri.id}
                                        idpost={subgiaitri.id}
                                        tieude={subgiaitri.TieuDe}
                                        trichdan={subgiaitri.TrichDan}
                                        anh={subgiaitri.Anh}
                                    ></VerticalContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            giaoduc_post.slice(giaoduc_post.length - 10, giaoduc_post.length - 2).map((subgiaitri) => (
                                <SmallContentItemCol3
                                    key={subgiaitri.id}
                                    idpost={subgiaitri.id}
                                    tieude={subgiaitri.TieuDe}
                                    anh={subgiaitri.Anh}
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

export default GiaoDuc;