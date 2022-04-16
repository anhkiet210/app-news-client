import React, { Component, useState, useEffect } from 'react';
import BigNewsItem from './BigNewsItem';
import Footer from './Footer';
import Header from './Header';
import HorizontalContent from './HorizontalContent';
import Menu from './Menu';
import NewsEventItem from './NewsEventItem';
import SmallContentItemCol3 from './SmallContentItemCol3';
import SmallContentItemCol4 from './SmallContentItemCol4';
import Loading from './Loading';

// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             post: [],
//             category: []
//         }
//     }

//     componentDidMount() {
//         this.loadPost();
//         this.loadCategory();
//     }

//     //load post
//     loadPost = () => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch("https://app-news-laravel.herokuapp.com/api/Post", requestOptions)
//             .then(response => response.json())
//             .then(result => this.setState({ post: result }))
//             .catch(error => console.log('error', error));
//     }


//     //load category
//     loadCategory = () => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };

//         fetch("https://app-news-laravel.herokuapp.com/api/Category", requestOptions)
//             .then(response => response.json())
//             .then(result => this.setState({ category: result }))
//             .catch(error => console.log('error', error));
//     }

//     // get value of CKEditor
//     getValueCKEditor = (event, editor) => {
//         this.setState({
//             NoiDung: editor.getData()
//         });
//         // console.log(NoiDung);
//     }


//     render() {
//         console.log(post);
//         var post_approved = post.filter((subpost) => {
//             return subpost.TrangThai === 1;
//         })
//         var a;
//         // console.log(post.length);
//         return (
//             <div>
//                 <Header></Header>
//                 <Menu></Menu>
//                 <div className="main">
//                     {/* begin content */}
//                     <div className="container big-content">
//                         <div className="row">
//                             <div className="col-8 ">
//                                 {   
//                                     post_approved.slice(post_approved.length - 1, post_approved.length).map((subpost) => {
//                                         return (
//                                             <BigNewsItem
//                                                 key={subpost.id}
//                                                 idpost={subpost.id}
//                                                 tieude={subpost.TieuDe}
//                                                 anh={subpost.Anh}
//                                                 trichdan={subpost.TrichDan}
//                                             />
//                                         )
//                                     })
//                                 }
//                             </div>
//                             <div className="col-4 list-news-event">
//                                 <h3>Tin mới</h3>
//                                 <ul>
//                                     {   
//                                         post_approved.slice(post_approved.length - 9, post_approved.length - 1).map((subpost) => {
//                                             return (
//                                                 <NewsEventItem
//                                                     key={subpost.id}
//                                                     idpost={subpost.id}
//                                                     tieude={subpost.TieuDe}
//                                                 ></NewsEventItem>
//                                             )
//                                         })
//                                     }
//                                 </ul>
//                             </div>
//                         </div>
//                         <hr />
//                     </div>
//                     <div className="container small-content">
//                         <div className="row">
//                             {   
//                                 post_approved.slice(post_approved.length - 13, post_approved.length - 10).map((subpost) => {
//                                     return (
//                                         <SmallContentItemCol4
//                                             key={subpost.id}
//                                             idpost={subpost.id}
//                                             tieude={subpost.TieuDe}
//                                             anh={subpost.Anh}
//                                         ></SmallContentItemCol4>
//                                     )
//                                 })
//                             }
//                         </div>
//                         <hr />
//                     </div>
//                     <div className="container">
//                         <div className="row">
//                             {/* begin content-left */}
//                             <div className="col-8 content-left">
//                                 {

//                                     post_approved.slice(post_approved.length-25, post_approved.length-13).map((subpost) => (
//                                         <HorizontalContent
//                                             key={subpost.id}
//                                             idpost={subpost.id}
//                                             tieude={subpost.TieuDe}
//                                             anh={subpost.Anh}
//                                             trichdan={subpost.TrichDan}
//                                         ></HorizontalContent>
//                                     ))
//                                 }
//                             </div>
//                             {/* end content-left */}
//                             <div className="col-4 content-right">
//                                 {
//                                     category.slice(0, 6).map((subcategory) => {
//                                         if (subcategory.TrangThaiCD === 1) {
//                                             return (
//                                                 <div className="list-news-event" key={subcategory.id}>
//                                                     <h3>{subcategory.TenChuDe}</h3>
//                                                     <ul>
//                                                         {/* {
//                                                             a = post_approved.filter( (subpost_approved) => (subpost_approved.idChuDe === subcategory.id))
//                                                             a = a.reverse()
//                                                             a.slice(0, 6).map((subpost) => {
//                                                                 if (subpost.idChuDe === subcategory.id) {
//                                                                     return (
//                                                                         <NewsEventItem
//                                                                             key={subpost.id}
//                                                                             idpost={subpost.id}
//                                                                             tieude={subpost.TieuDe}
//                                                                         ></NewsEventItem>
//                                                                     )
//                                                                 }
//                                                             })
//                                                         } */}
//                                                         {
//                                                             a = post_approved.filter( (subpost_approved) => subpost_approved.idChuDe === subcategory.id)

//                                                         }
//                                                     </ul>
//                                                 </div>
//                                             )
//                                         }
//                                     })
//                                 }
//                             </div>
//                         </div>
//                     </div>

//                     <div className="container small-content">
//                         <div className="row">
//                             {
//                                 post_approved.slice(post_approved.length-33, post_approved.length-25).map((subpost) => {
//                                     return (
//                                         <SmallContentItemCol3
//                                             key={subpost.id}
//                                             idpost={subpost.id}
//                                             tieude={subpost.TieuDe}
//                                             anh={subpost.Anh}
//                                         ></SmallContentItemCol3>
//                                     )
//                                 })
//                             }
//                         </div>
//                         <hr />
//                     </div>
//                     {/* end content */}
//                 </div>
//                 <Footer></Footer>
//             </div>
//         );
//     }
// }


const Home = () => {
    const [post, setPost] = useState([])
    const [category, setCategory] = useState([])
    const post_approved = post && post.filter((item) => item.TrangThai === 1)
    var a 
    const [loading, setLoading] =useState(false)

    // get posts
    useEffect(() => {
       const fetchDate = async () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            await fetch("https://app-news-laravel.herokuapp.com/api/Post", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPost(result)
                })
                .catch(error => console.log('error', error));
       }
       fetchDate()
    }, [])

    //get category
    useEffect(() => {
        const fetchDate = async () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            setLoading(true)
            await fetch("https://app-news-laravel.herokuapp.com/api/Category", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setCategory(result)
                })
                .catch(error => console.log('error', error))
                .finally(() => {
                    setLoading(false)
                })
        }
        fetchDate()
    }, [])
    return loading ? <Loading /> : (
        <div>
            <Header></Header>
            <Menu></Menu>
            <div className="main">
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {
                                post_approved.slice(post_approved.length - 1, post_approved.length).map((subpost) => {
                                    return (
                                        <BigNewsItem
                                            key={subpost.id}
                                            idpost={subpost.id}
                                            tieude={subpost.TieuDe}
                                            anh={subpost.Anh}
                                            trichdan={subpost.TrichDan}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <h3>Tin mới</h3>
                            <ul>
                                {
                                    post_approved.slice(post_approved.length - 9, post_approved.length - 1).map((subpost) => {
                                        return (
                                            <NewsEventItem
                                                key={subpost.id}
                                                idpost={subpost.id}
                                                tieude={subpost.TieuDe}
                                            ></NewsEventItem>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            post_approved.slice(post_approved.length - 13, post_approved.length - 10).map((subpost) => {
                                return (
                                    <SmallContentItemCol4
                                        key={subpost.id}
                                        idpost={subpost.id}
                                        tieude={subpost.TieuDe}
                                        anh={subpost.Anh}
                                    ></SmallContentItemCol4>
                                )
                            })
                        }
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                        {/* begin content-left */}
                        <div className="col-8 content-left">
                            {

                                post_approved.slice(post_approved.length - 25, post_approved.length - 13).map((subpost) => (
                                    <HorizontalContent
                                        key={subpost.id}
                                        idpost={subpost.id}
                                        tieude={subpost.TieuDe}
                                        anh={subpost.Anh}
                                        trichdan={subpost.TrichDan}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        {/* end content-left */}
                        <div className="col-4 content-right">
                            {
                                category.slice(0, 6).map((subcategory) => {
                                    if (subcategory.TrangThaiCD === 1) {
                                        return (
                                            <div className="list-news-event" key={subcategory.id}>
                                                <h3>{subcategory.TenChuDe}</h3>
                                                <ul>
                                                    {/* {
                                                        {
                                                            a = post_approved.filter((subpost_approved) => (subpost_approved.idChuDe === subcategory.id)),
                                                            a = a.reverse()

                                                            a.slice(0, 6).map( item => {
                                                                if(item.idChuDe === subcategory.id){
                                                                    return (
                                                                        <NewsEventItem 
                                                                            key={item.id}
                                                                            idpost={item.id}
                                                                            tieude={item.TieuDe}
                                                                        />
                                                                    )
                                                                }
                                                            })  
                                                        }
                                                            
                                                    } */}
                                                </ul>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="container small-content">
                    <div className="row">
                        {
                            post_approved.slice(post_approved.length - 33, post_approved.length - 25).map((subpost) => {
                                return (
                                    <SmallContentItemCol3
                                        key={subpost.id}
                                        idpost={subpost.id}
                                        tieude={subpost.TieuDe}
                                        anh={subpost.Anh}
                                    ></SmallContentItemCol3>
                                )
                            })
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

export default Home;