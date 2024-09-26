//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

const EditForm = () => {
    /*---라우터 관련-------------------------------*/
    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    /*---일반 변수--------------------------------*/
    const token = localStorage.getItem('token');
    /*---일반 메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    //마운트되었을때(로딩)
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

            const userVo = response.data.apiData;
            if(response.data.result === 'success'){
                //가져온데이타 화면에 반영
                setId(userVo.id);
                setPw(userVo.password);
                setName(userVo.name);
                setGender(userVo.gender);

            }else{
                alert('확인하세요');
            }

        }).catch(error => {
            console.log(error);
        });

    }, []);

    //패스워드창에 값이 변할때
    const handlePw = (e)=>{
        setPw(e.target.value);
    };

    //이름창에 값이 변할때
    const handleName = (e)=>{
        setName(e.target.value);
    };

    //라디오버튼(성별) 클릭했을때
    const handleGender = (e)=>{
        setGender(e.target.value);
    };

    //수정버튼을 클릭했을때
    const handleUpdate = (e)=>{
        e.preventDefault();
        console.log('수정버튼클릭');

        const userVo = {
            password: pw,
            name: name,
            gender: gender
        };
        console.log(userVo);

        axios({
            method: 'put', 			// put, post, delete                   
            url: 'http://localhost:9000/api/users/me',
            headers: { 
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
             },  // post put
            data: userVo,     // put, post,  JSON(자동변환됨)
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타

            if(response.data.result === 'success'){
                const authUser = response.data.apiData;
                localStorage.setItem("authUser", JSON.stringify(authUser));
                navigate('/');
            }else {
                alert("수정실패"); 
            }

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
                                <form action="" method="" onSubmit={handleUpdate}>

                                    {/* <!-- 아이디 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-uid">아이디</label>
                                        <span className="text-large bold">{id}</span>
                                    </div>

                                    {/* <!-- 비밀번호 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-pass">패스워드</label>
                                        <input type="text" id="input-pass" name="" value={pw} placeholder="비밀번호를 입력하세요" 
                                        onChange={handlePw} />
                                    </div>

                                    {/* <!-- 이름 --> */}
                                    <div className="form-group">
                                        <label className="form-text" htmlFor="input-name">이름</label>
                                        <input type="text" id="input-name" name="" value={name} placeholder="이름을 입력하세요" 
                                        onChange={handleName}/>
                                    </div>

                                    {/* <!-- //성별 --> */}
                                    <div className="form-group">
                                        <span className="form-text">성별</span>

                                        <label htmlFor="rdo-male">남</label>
                                        <input type="radio" id="rdo-male" name="gender" 
                                            value="male" checked={gender==='male'}  onChange={handleGender} />

                                        <label htmlFor="rdo-female">여</label>
                                        <input type="radio" id="rdo-female" name="gender" 
                                            value="female" checked={gender==='female'}  onChange={handleGender} />

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

                {/* <!-- footer --> */}
                <Footer/>
                {/* <!-- //footer --> */}

            </div>
            {/* <!-- //wrap --> */}
        </>
    );
}

export default EditForm;
