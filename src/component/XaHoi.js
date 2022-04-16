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

// class XaHoi extends Component {
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

//         fetch("https://app-news-laravel.herokuapp.com/api/Post", requestOptions)
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
//         var xahoi_post = this.state.post.filter( (subpost) => (subpost.idChuDe === 4 && subpost.TrangThai === 1));
//         console.log(this.state.post);
//         return (
//             <div>
//                 <Header></Header>
//                 <Menu></Menu>
//                 <div className="main container">
//                 <div className="container">
//                     <div className="Title-page">
//                         <h1>
//                             {/* <Link to="/xa-hoi">Xã Hội</Link> */}
//                             <a href="/xa-hoi">Xã Hội</a>
//                         </h1>
//                     </div>
//                 </div>
//                 {/* begin content */}
//                 <div className="container big-content">
//                     <div className="row">
//                         <div className="col-8 ">
//                             {   xahoi_post &&
//                                 xahoi_post.slice(xahoi_post.length-1, xahoi_post.length).map( (subpost) => (
//                                     <BigNewsItem
//                                         key={subpost.id}
//                                         idpost={subpost.id}
//                                         tieude={subpost.TieuDe}
//                                         anh={subpost.Anh}
//                                         trichdan={subpost.TrichDan}
//                                     ></BigNewsItem>
//                                 ))
//                             }
//                         </div>
//                         <div className="col-4 list-news-event">
//                             <ul>
//                                 {
//                                     xahoi_post.slice(xahoi_post.length-9, xahoi_post.length-1).map( (subpost) => (
//                                         <NewsEventItem
//                                             key={subpost.id}
//                                             idpost={subpost.id}
//                                             tieude={subpost.TieuDe}
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
//                             xahoi_post.slice(xahoi_post.length-7, xahoi_post.length-4).map( (subpost) => (
//                                 <SmallContentItemCol4
//                                     key={subpost.id}
//                                     idpost={subpost.id}
//                                     tieude={subpost.TieuDe}
//                                     anh={subpost.Anh}
//                                 ></SmallContentItemCol4>
//                             ))
//                         }
//                     </div>
//                     <hr />
//                 </div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-8 content-left">
//                             {
//                                 xahoi_post.slice(xahoi_post.length-10, xahoi_post.length-2).map( (subpost) => (
//                                    <HorizontalContent
//                                         key={subpost.id}
//                                         tieude={subpost.TieuDe}
//                                         anh={subpost.Anh}
//                                         trichdan={subpost.TrichDan}
//                                    ></HorizontalContent>
//                                 ))
//                             }
//                         </div>
//                         <div className="col-4 content-right">
//                             {
//                                 xahoi_post.slice(xahoi_post.length-6, xahoi_post.length-2).map( (subpost) => (
//                                     <VerticalContent
//                                         key={subpost.id}
//                                         idpost={subpost.id}
//                                         tieude={subpost.TieuDe}
//                                         trichdan={subpost.TrichDan}
//                                         anh={subpost.Anh}
//                                     ></VerticalContent>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container small-content">
//                     <div className="row">
//                         {
//                             xahoi_post.slice(xahoi_post.length-10, xahoi_post.length-2).map( (subpost) => (
//                                 <SmallContentItemCol3
//                                     key={subpost.id}
//                                     idpost={subpost.id}
//                                     anh={subpost.Anh}
//                                     tieude={subpost.TieuDe}
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

const XaHoi = () => {
    const [post, setPost] = useState([])
    const xahoi_post = post && post.filter( (subpost) => (subpost.idChuDe === 4 && subpost.TrangThai === 1))
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
                    console.log(result)
                    setLoading(false)
                })
                .catch(error => console.log('error', error))
                .finally( () => setLoading(false))
        }
        fetchDate()
    }, [])

    console.log(xahoi_post);

    return loading ? <Loading /> : (
        <div>
            <Header></Header>
            <Menu></Menu>
            <div className="main container">
                <div className="container">
                    <div className="Title-page">
                        <h1>
                            {/* <Link to="/xa-hoi">Xã Hội</Link> */}
                            <a href="/xa-hoi">Xã Hội</a>
                        </h1>
                    </div>
                </div>
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {   xahoi_post &&
                                xahoi_post.slice(xahoi_post.length - 1, xahoi_post.length).map((subpost) => (
                                    <BigNewsItem
                                        key={subpost.id}
                                        idpost={subpost.id}
                                        tieude={subpost.TieuDe}
                                        anh={subpost.Anh}
                                        trichdan={subpost.TrichDan}
                                    ></BigNewsItem>
                                ))
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <ul>
                                {
                                    xahoi_post.slice(xahoi_post.length - 9, xahoi_post.length - 1).map((subpost) => (
                                        <NewsEventItem
                                            key={subpost.id}
                                            idpost={subpost.id}
                                            tieude={subpost.TieuDe}
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
                            xahoi_post.slice(xahoi_post.length - 7, xahoi_post.length - 4).map((subpost) => (
                                <SmallContentItemCol4
                                    key={subpost.id}
                                    idpost={subpost.id}
                                    tieude={subpost.TieuDe}
                                    anh={subpost.Anh}
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
                                xahoi_post.slice(xahoi_post.length - 10, xahoi_post.length - 2).map((subpost) => (
                                    <HorizontalContent
                                        key={subpost.id}
                                        tieude={subpost.TieuDe}
                                        anh={subpost.Anh}
                                        trichdan={subpost.TrichDan}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        <div className="col-4 content-right">
                            {
                                xahoi_post.slice(xahoi_post.length - 6, xahoi_post.length - 2).map((subpost) => (
                                    <VerticalContent
                                        key={subpost.id}
                                        idpost={subpost.id}
                                        tieude={subpost.TieuDe}
                                        trichdan={subpost.TrichDan}
                                        anh={subpost.Anh}
                                    ></VerticalContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            xahoi_post.slice(xahoi_post.length - 10, xahoi_post.length - 2).map((subpost) => (
                                <SmallContentItemCol3
                                    key={subpost.id}
                                    idpost={subpost.id}
                                    anh={subpost.Anh}
                                    tieude={subpost.TieuDe}
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

export default XaHoi;