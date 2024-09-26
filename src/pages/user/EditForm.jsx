//import 라이브러리
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const EditForm = () => {
    /*---라우터 관련-------------------------------*/
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    /*---일반 변수--------------------------------*/
    const token = localStorage.getItem('token');
    /*---일반 메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    useEffect(() => {
        console.log('마운트 되었을때');
        axios({
            method: 'get',
            url: 'http://localhost:9000/api/users/me',
            headers: { "Authorization": `Bearer ${token}` }, 

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data); //수신데이타

        }).catch(error => {
            console.log(error);
        });

    }, []);

    return (
        <>
            <div id="wrap">

                <div id="header" className="clearfix">
                    <h1>
                        <Link to="" rel="noreferrer noopener">MySite</Link>
                    </h1>
                    {/* 
                    <ul>
                        <li>{authUser.name} 님 안녕하세요^^</li>
                        <li><button className="btn_s" onClick={handleLogout}>로그아웃</button></li>
                        <li><Link to="" className="btn_s" rel="noreferrer noopener">회원정보수정</Link></li>
                    </ul>
                     */}
                    <ul>
                        <li><Link to="/user/loginform" className="btn_s" rel="noreferrer noopener">로그인</Link></li>
                        <li><Link to="" className="btn_s" rel="noreferrer noopener">회원가입</Link></li>
                    </ul>

                </div>
                {/* <!-- //header --> */}

                <div id="nav">
                    <ul className="clearfix">
                        <li><Link to="" rel="noreferrer noopener">입사지원서</Link></li>
                        <li><Link to="" rel="noreferrer noopener">게시판</Link></li>
                        <li><Link to="" rel="noreferrer noopener">갤러리</Link></li>
                        <li><Link to="" rel="noreferrer noopener">방명록</Link></li>
                    </ul>
                </div>
                {/* <!-- //nav --> */}

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
                            <h3>회원정보</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>회원</li>
                                    <li className="last">회원정보</li>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        {/*  <!-- //content-head --> */}

                        <div id="user">
                            <div id="modifyForm">
                                <form action="" method="">

                                    {/* <!-- 아이디 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-uid">아이디</label>
                                        <span className="text-large bold">userid</span>
                                    </div>

                                    {/* <!-- 비밀번호 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-pass">패스워드</label>
                                        <input type="text" id="input-pass" name="" value="" placeholder="비밀번호를 입력하세요" />
                                    </div>

                                    {/* <!-- 이메일 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-name">이름</label>
                                        <input type="text" id="input-name" name="" value="" placeholder="이름을 입력하세요" />
                                    </div>

                                    {/* <!-- //나이 --> */}
                                    <div className="form-group">
                                        <span className="form-text">성별</span>

                                        <label htmlFor="rdo-male">남</label>
                                        <input type="radio" id="rdo-male" name="" value="" />

                                        <label htmlFor="rdo-female">여</label>
                                        <input type="radio" id="rdo-female" name="" value="" />

                                    </div>

                                    {/* <!-- 버튼영역 --> */}
                                    <div className="button-area">
                                        <button type="submit" id="btn-submit">회원정보수정</button>
                                    </div>

                                </form>


                            </div>
                            {/* <!-- //modifyForm --> */}
                        </div>
                        {/* <!-- //user --> */}
                    </div>
                    {/* <!-- //content  --> */}

                </div>
                {/* <!-- //container  --> */}

                <div id="footer">
                    Copyright ⓒ 2020 황일영. All right reserved
                </div>
                {/* <!-- //footer --> */}

            </div>
            {/* <!-- //wrap --> */}
        </>
    );
}

export default EditForm;
