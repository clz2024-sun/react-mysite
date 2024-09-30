//import 라이브러리
import React, {useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

//css  전역에 적용되지만 #main 아래만 적용되도록 css를 코딩했음
import '../../css/guestbook.css';

const DeleteForm = () => {
    /*---라우터 관련-------------------------------*/
    const { no } = useParams();    
    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [pw, setPw] = useState('');
    /*---일반 변수--------------------------------*/
    /*---일반 메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handlePw = (e)=>{
        setPw(e.target.value);
    };

    const handleDel = (e)=>{
        e.preventDefault();

        const guestbookVo = {
            password: pw
        };

        axios({
            method: 'delete', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/guestbooks/${no}`,
            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            data: guestbookVo,     // put, post,  JSON(자동변환됨)
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            navigate("/guest/addlist");

        }).catch(error => {
            console.log(error);
        });
        
    };

    return (
        <>
            <div id="wrap">

                {/* <!-- header + nav --> */}
                <Header />
                {/* <!-- //header + nav --> */}

                <div id="container" className="clearfix">
                    <div id="aside">
                        <h2>방명록</h2>
                        <ul>
                            <li>일반방명록</li>
                            <li>ajax방명록</li>
                        </ul>
                    </div>
                    {/* <!-- //aside --> */}

                    <div id="content">
                    
                        <div id="content-head">
                            <h3>일반방명록</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>방명록</li>
                                    <li className="last">일반방명록</li>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        {/* <!-- //content-head --> */}

                        <div id="guestbook">
                            <form action="" method="" onSubmit={handleDel}>
                                <table id="guestDelete">
                                    <colgroup>
                                        <col style={{width: '10%'}}/>
                                        <col style={{width: '40%'}}/>
                                        <col style={{width: '25%'}}/>
                                        <col style={{width: '25%'}}/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>비밀번호</td>
                                            <td><input type="password" name="pass" value={pw} onChange={handlePw}/></td>
                                            <td className="text-left"><button type="submit">삭제</button></td>
                                            <td><Link to="/guestbook2/gbc">[메인으로 돌아가기]</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            
                        </div>
                        {/* <!-- //guestbook --> */}
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

export default DeleteForm;
