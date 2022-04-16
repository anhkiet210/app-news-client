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
// class PhapLuat extends Component {
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

//    //load post
//    loadPost = async () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };

//     await fetch("https://app-news-laravel.herokuapp.com/api/Post", requestOptions)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error(response.status);
//         })
//         .then(result => {
//             this.setState({ post: result });
//         })
//         .catch(error => console.log('error', error));
// }
//     render() {
//         var phapluat_post = this.state.post.filter( (subpost) => (subpost.idChuDe === 3 && subpost.TrangThai===1));
//         return (
//             <div>
//                 <Header></Header>
//                 <Menu></Menu><div className="main container">
//                 <div className="container">
//                     <div className="Title-page">
//                         <h1>
//                             {/* <Link to="/phap-luat">Pháp Luật</Link> */}
//                             <a href="/phap-luat">Pháp Luật</a>
//                         </h1>
//                     </div>
//                 </div>
//                 {/* begin content */}
//                 <div className="container big-content">
//                     <div className="row">
//                         <div className="col-8 ">
//                             {
//                                 phapluat_post.slice(phapluat_post.length-1, phapluat_post.length).map( (subphapluat) => (
//                                     <BigNewsItem
//                                         key={subphapluat.id}
//                                         idpost={subphapluat.id}
//                                         tieude={subphapluat.TieuDe}
//                                         trichdan={subphapluat.TrichDan}
//                                         anh={subphapluat.Anh}
//                                     ></BigNewsItem>
//                                 ))
//                             }
//                         </div>
//                         <div className="col-4 list-news-event">
//                             <ul>
//                                 {
//                                     phapluat_post.slice(phapluat_post.length-9, phapluat_post.length-1).map( (subphapluat) => (
//                                         <NewsEventItem
//                                             key={subphapluat.id}
//                                             idpost={subphapluat.id}
//                                             tieude={subphapluat.TieuDe}
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
//                             phapluat_post.slice(phapluat_post.length-7, phapluat_post.length-4).map( (subphapluat) => (
//                                 <SmallContentItemCol4
//                                     key={subphapluat.id}
//                                     idpost={subphapluat.id}
//                                     tieude={subphapluat.TieuDe}
//                                     anh={subphapluat.Anh}
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
//                                 phapluat_post.slice(phapluat_post.length-10, phapluat_post.length-2).map( (subphapluat) => (
//                                     <HorizontalContent
//                                         key={subphapluat.id}
//                                         idpost={subphapluat.id}
//                                         tieude={subphapluat.TieuDe}
//                                         trichdan={subphapluat.TrichDan}
//                                         anh={subphapluat.Anh}
//                                     ></HorizontalContent>
//                                 ))
//                             }
//                         </div>
//                         <div className="col-4 content-right">
//                             {
//                                 phapluat_post.slice(phapluat_post.length-6, phapluat_post.length-2).map( (subphapluat) => (
//                                     <VerticalContent
//                                         key={subphapluat.id}
//                                         idpost={subphapluat.id}
//                                         tieude={subphapluat.TieuDe}
//                                         trichdan={subphapluat.TrichDan}
//                                         anh={subphapluat.Anh}
//                                     ></VerticalContent>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container small-content">
//                     <div className="row">
//                         {
//                             phapluat_post.slice(phapluat_post.length-10, phapluat_post.length-2).map( (subphapluat) => (
//                                 <SmallContentItemCol3
//                                     key={subphapluat.id}
//                                     idpost={subphapluat.id}
//                                     tieude={subphapluat.TieuDe}
//                                     anh={subphapluat.Anh}
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

const PhapLuat = () => {
    const [post, setPost] = useState([])
    const phapluat_post = post && post.filter( (subpost) => (subpost.idChuDe === 3 && subpost.TrangThai === 1))
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
            <Menu></Menu><div className="main container">
                <div className="container">
                    <div className="Title-page">
                        <h1>
                            {/* <Link to="/phap-luat">Pháp Luật</Link> */}
                            <a href="/phap-luat">Pháp Luật</a>
                        </h1>
                    </div>
                </div>
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {
                                phapluat_post.slice(phapluat_post.length - 1, phapluat_post.length).map((subphapluat) => (
                                    <BigNewsItem
                                        key={subphapluat.id}
                                        idpost={subphapluat.id}
                                        tieude={subphapluat.TieuDe}
                                        trichdan={subphapluat.TrichDan}
                                        anh={subphapluat.Anh}
                                    ></BigNewsItem>
                                ))
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <ul>
                                {
                                    phapluat_post.slice(phapluat_post.length - 9, phapluat_post.length - 1).map((subphapluat) => (
                                        <NewsEventItem
                                            key={subphapluat.id}
                                            idpost={subphapluat.id}
                                            tieude={subphapluat.TieuDe}
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
                            phapluat_post.slice(phapluat_post.length - 7, phapluat_post.length - 4).map((subphapluat) => (
                                <SmallContentItemCol4
                                    key={subphapluat.id}
                                    idpost={subphapluat.id}
                                    tieude={subphapluat.TieuDe}
                                    anh={subphapluat.Anh}
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
                                phapluat_post.slice(phapluat_post.length - 10, phapluat_post.length - 2).map((subphapluat) => (
                                    <HorizontalContent
                                        key={subphapluat.id}
                                        idpost={subphapluat.id}
                                        tieude={subphapluat.TieuDe}
                                        trichdan={subphapluat.TrichDan}
                                        anh={subphapluat.Anh}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        <div className="col-4 content-right">
                            {
                                phapluat_post.slice(phapluat_post.length - 6, phapluat_post.length - 2).map((subphapluat) => (
                                    <VerticalContent
                                        key={subphapluat.id}
                                        idpost={subphapluat.id}
                                        tieude={subphapluat.TieuDe}
                                        trichdan={subphapluat.TrichDan}
                                        anh={subphapluat.Anh}
                                    ></VerticalContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            phapluat_post.slice(phapluat_post.length - 10, phapluat_post.length - 2).map((subphapluat) => (
                                <SmallContentItemCol3
                                    key={subphapluat.id}
                                    idpost={subphapluat.id}
                                    tieude={subphapluat.TieuDe}
                                    anh={subphapluat.Anh}
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

export default PhapLuat;