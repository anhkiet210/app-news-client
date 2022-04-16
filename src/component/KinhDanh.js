import React, { useEffect, useState } from 'react';
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

const KinhDoanh = () => {
    const [post, setPost] = useState([])
    const kinhdoanh_post = post && post.filter( (subpost) => (subpost.idChuDe === 4 && subpost.TrangThai === 1))
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

    return loading ? <Loading /> : (
        <div>
            <Header></Header>
            <Menu></Menu>
            <div className="main container">
                <div className="container">
                    <div className="Title-page">
                        <h1>
                            <a href="/kinh-doanh">Kinh Doanh</a>
                        </h1>
                    </div>
                </div>
                {/* begin content */}
                <div className="container big-content">
                    <div className="row">
                        <div className="col-8 ">
                            {
                                kinhdoanh_post.slice(kinhdoanh_post.length - 1, kinhdoanh_post.length).map((subkinhdoanh) => (
                                    <BigNewsItem
                                        key={subkinhdoanh.id}
                                        idpost={subkinhdoanh.id}
                                        tieude={subkinhdoanh.TieuDe}
                                        trichdan={subkinhdoanh.TrichDan}
                                        anh={subkinhdoanh.Anh}
                                    ></BigNewsItem>
                                ))
                            }
                        </div>
                        <div className="col-4 list-news-event">
                            <ul>
                                {
                                    kinhdoanh_post.slice(kinhdoanh_post.length - 9, kinhdoanh_post.length - 1).map((subkinhdoanh) => (
                                        <NewsEventItem
                                            key={subkinhdoanh.id}
                                            idpost={subkinhdoanh.id}
                                            tieude={subkinhdoanh.TieuDe}
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
                            kinhdoanh_post.slice(kinhdoanh_post.length - 7, kinhdoanh_post.length - 4).map((subkinhdoanh) => (
                                <SmallContentItemCol4
                                    key={subkinhdoanh.id}
                                    idpost={subkinhdoanh.id}
                                    tieude={subkinhdoanh.TieuDe}
                                    anh={subkinhdoanh.Anh}
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
                                kinhdoanh_post.slice(kinhdoanh_post.length - 10, kinhdoanh_post.length - 2).map((subkinhdoanh) => (
                                    <HorizontalContent
                                        key={subkinhdoanh.id}
                                        idpost={subkinhdoanh.id}
                                        tieude={subkinhdoanh.TieuDe}
                                        trichdan={subkinhdoanh.TrichDan}
                                        anh={subkinhdoanh.Anh}
                                    ></HorizontalContent>
                                ))
                            }
                        </div>
                        <div className="col-4 content-right">
                            {
                                kinhdoanh_post.slice(kinhdoanh_post.length - 7, kinhdoanh_post.length - 3).map((subkinhdoanh) => (
                                    <VerticalContent
                                        key={subkinhdoanh.id}
                                        idpost={subkinhdoanh.id}
                                        tieude={subkinhdoanh.TieuDe}
                                        trichdan={subkinhdoanh.TrichDan}
                                        anh={subkinhdoanh.Anh}
                                    ></VerticalContent>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="container small-content">
                    <div className="row">
                        {
                            kinhdoanh_post.slice(kinhdoanh_post.length - 10, kinhdoanh_post.length - 2).map((subkinhdoanh) => (
                                <SmallContentItemCol3
                                    key={subkinhdoanh.id}
                                    idpost={subkinhdoanh.id}
                                    tieude={subkinhdoanh.TieuDe}
                                    anh={subkinhdoanh.Anh}
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

export default KinhDoanh;