//import 라이브러리
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Header from '../include/Header';
import Footer from '../include/Footer';

//css
import '../../css/gallery.css'


const Result = () => {
    /*---라우터 관련-------------------------------*/
    const [searchParams] = useSearchParams();
    const saveName = searchParams.get('img');

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    /*---일반 변수--------------------------------*/
    /*---일반 메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    return (
        <>
            <div id="wrap">

                {/* <!-- header + nav --> */}
                <Header />
                {/* <!-- //header + nav --> */}


                <div id="container" className="clearfix">
                    <div id="aside">
                        <h2>갤러리</h2>
                        <ul>
                            <li><Link to="">일반갤러리</Link></li>
                            <li><Link to="">파일첨부연습</Link></li>
                        </ul>
                    </div>
                    {/* <!-- //aside --> */}


                    <div id="content">

                        <div id="content-head">
                            <h3>첨부파일연습</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>갤러리</li>
                                    <li className="last">첨부파일연습</li>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        {/* <!-- //content-head --> */}


                        <div id="file">

                            <div>
                                <img id="resultImg" src={`${process.env.REACT_APP_API_URL}/upload/${saveName}`} alt="프로필사진"/>
                            </div>
                            <p>
                                <Link id="btnUpload" to="">다시 업로드 하기</Link>
                            </p>

                        </div>
                        {/* <!-- //file --> */}

                    </div>
                    {/* <!-- //content  --> */}

                </div>
                {/* <!-- //container  --> */}


                {/* <!-- footer --> */}
                <Footer />
                {/* <!-- //footer --> */}
            </div>
            {/* <!-- //wrap --> */}
        </>
    );
}

export default Result;
