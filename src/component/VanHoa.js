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


const VanHoa = () => {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const vanhoa_post = post && post.filter((subpost) => (subpost.idChuDe === 1 && subpost.TrangThai === 1))

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
                .finally(() => setLoading(false))
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
                            {/* <Link to="/van-hoa">Văn Hóa</Link> */}
                            <a href="/van-hoa">Văn Hóa</a>
                        </h1>
                    </div>
                </div>
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {
                                vanhoa_post.slice(vanhoa_post.length - 1, vanhoa_post.length).map((subvanhoa) => (
                                    <BigNewsItem
                                        key={subvanhoa.id}
                                        idpost={subvanhoa.id}
                                        tieude={subvanhoa.TieuDe}
                                        anh={subvanhoa.Anh}
                                        trichdan={subvanhoa.TrichDan}
                                    ></BigNewsItem>
                                ))
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <ul>
                                {
                                    vanhoa_post.slice(vanhoa_post.length - 9, vanhoa_post.length - 1).map((subvanhoa) => (
                                        <NewsEventItem
                                            key={subvanhoa.id}
                                            idpost={subvanhoa.id}
                                            tieude={subvanhoa.TieuDe}
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
                            vanhoa_post.slice(vanhoa_post.length - 7, vanhoa_post.length - 4).map((subvanhoa) => (
                                <SmallContentItemCol4
                                    key={subvanhoa.id}
                                    idpost={subvanhoa.id}
                                    tieude={subvanhoa.TieuDe}
                                    anh={subvanhoa.Anh}
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
                                vanhoa_post.slice(vanhoa_post.length - 10, vanhoa_post.length - 2).map((subvanhoa) => (
                                    <HorizontalContent
                                        key={subvanhoa.id}
                                        idpost={subvanhoa.id}
                                        tieude={subvanhoa.TieuDe}
                                        trichdan={subvanhoa.TrichDan}
                                        anh={subvanhoa.Anh}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        <div className="col-4 content-right">
                            {
                                vanhoa_post.slice(vanhoa_post.length - 7, vanhoa_post.length - 3).map((subvanhoa) => (
                                    <VerticalContent
                                        key={subvanhoa.id}
                                        idpost={subvanhoa.id}
                                        tieude={subvanhoa.TieuDe}
                                        trichdan={subvanhoa.TrichDan}
                                        anh={subvanhoa.Anh}
                                    ></VerticalContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            vanhoa_post.slice(vanhoa_post.length - 10, vanhoa_post.length - 2).map((subvanhoa) => (
                                <SmallContentItemCol3
                                    key={subvanhoa.id}
                                    idpost={subvanhoa.id}
                                    tieude={subvanhoa.TieuDe}
                                    trichdan={subvanhoa.TrichDan}
                                    anh={subvanhoa.Anh}
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

export default VanHoa;