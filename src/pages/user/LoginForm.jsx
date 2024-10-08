//import 라이브러리
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

//css  전역에 적용되지만 #user 아래만 적용되도록 css를 코딩했음
import '../../css/user.css'


const Test = () => {
    /*---라우터 관련-------------------------------*/
    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    /*---일반 변수--------------------------------*/
    /*---일반 메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    //아이디입력했을때
    const handleId = (e) => {
        setId(e.target.value);
    };

    //패스워드입력했을때
    const handlePw = (e) => {
        setPw(e.target.value);
    };

    //로그인버튼을 클릭했을때(전송)
    const handleLogin = (e) => {
        //이벤트잡고
        e.preventDefault();
        console.log("로그인 클릭");

        //데이터모으고 묶고
        const userVo = {
            id: id,
            password: pw
        };
        console.log(userVo);

        //전송
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/users/login`,
            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            data: userVo,     // put, post,  JSON(자동변환됨)

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data.apiData); //수신데이타

            ;    
            //해더에서 토큰꺼내기
            const token =response.headers['authorization'].split(' ')[1];
            console.log(token);

            //로컬스토리지에 토큰저장
            localStorage.setItem("token", token);
            //로컬스토리지에 authUser저장
            localStorage.setItem("authUser", JSON.stringify(response.data.apiData));


            navigate("/");

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
                        <h2>회원</h2>
                        <ul>
                            <li>회원정보</li>
                            <li>로그인</li>
                            <li>회원가입</li>
                        </ul>
                    </div>
                    {/* <!-- //aside --> */}

                    <div id="content">

                        <div id="content-head">
                            <h3>로그인</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>회원</li>
                                    <li className="last">로그인</li>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        {/* <!-- //content-head --> */}

                        <div id="user">
                            <div id="loginForm">
                                <form action="" method="" onSubmit={handleLogin}>

                                    {/* <!-- 아이디 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-uid">아이디</label>
                                        <input type="text" id="input-uid" name="" value={id} placeholder="아이디를 입력하세요"
                                            onChange={handleId} />
                                    </div>

                                    {/* <!-- 비밀번호 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-pass">비밀번호</label>
                                        <input type="text" id="input-pass" name="" value={pw} placeholder="비밀번호를 입력하세요"
                                            onChange={handlePw} />
                                    </div>


                                    {/* <!-- 버튼영역 --> */}
                                    <div className="button-area">
                                        <button type="submit" id="btn-submit">로그인</button>
                                    </div>

                                </form>
                            </div>
                            {/* <!-- //loginForm --> */}
                        </div>
                        {/* <!-- //user --> */}
                    </div>
                    {/* <!-- //content  --> */}

                </div>
                {/* <!-- //container  --> */}

                {/* <!-- footer --> */}
                <Footer/>
                {/* <!-- //footer --> */}

            </div>
            {/* <!-- //wrap --> */}
        </>
    );
}

export default Test;
