//import 라이브러리
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ItemGuest from './ItemGuest';
import Header from '../include/Header';
import Footer from '../include/Footer';

//css  전역에 적용되지만 #main 아래만 적용되도록 css를 코딩했음
import '../../css/guestbook.css';

const AddList = () => {
    /*---라우터 관련-------------------------------*/
    const [guestbookList, setGuestbookList] = useState([]);
    const [name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [content, setContent] = useState('');
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    /*---일반 변수--------------------------------*/
    /*---일반 메소드 -----------------------------*/
    const getGuestbookList = ()=>{
        axios({
            method: 'get', 			
            url: `${process.env.REACT_APP_API_URL}/api/guestbooks`,
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data); //수신데이타
            setGuestbookList(response.data.apiData);
        
        }).catch(error => {
            console.log(error);
        });
        
    };

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleName = (e)=>{
        setName(e.target.value);
    };
    const handlePw = (e)=>{
        setPw(e.target.value);
    };
    const handleContent = (e)=>{
        setContent(e.target.value);
    };

    const handleGuestSubmit = (e)=>{
        e.preventDefault();
    
        const guestbookVo = {
            name: name,
            password: pw,
            content: content
        };
        console.log(guestbookVo);

        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/guestbooks`,
            headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            data: guestbookVo,     // put, post,  JSON(자동변환됨)
        
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            getGuestbookList();
            setName('');
            setPw('');
            setContent('');
        }).catch(error => {
            console.log(error);
        });
        
    };

    //마운트 되었을때
    useEffect(()=>{
        getGuestbookList();
    }, []);
    
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

                        <div id="content-head" className="clearfix">
                            <h3>일반방명록</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>방명록</li>
                                    <li className="last">일반방명록</li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- //content-head --> */}

                        <div id="guestbook">
                            <form action="" method="" onSubmit={handleGuestSubmit}>
                                <table id="guestAdd">
                                    <colgroup>
                                        <col style={{ width: '70px' }} />
                                        <col />
                                        <col style={{ width: '70px' }} />
                                        <col />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <label className="form-text" htmlFor="input-uname">이름</label>
                                            </th>
                                            <td>
                                                <input id="input-uname" type="text" name="name" 
                                                    value={name} onChange={handleName} />
                                            </td>
                                            <th>
                                                <label className="form-text" htmlFor="input-pass">패스워드</label>
                                            </th>
                                            <td>
                                                <input id="input-pass" type="password" name="pass" 
                                                    value={pw} onChange={handlePw}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4">
                                                <textarea name="content" cols="72" rows="5" 
                                                    value={content} onChange={handleContent}></textarea>
                                            </td>
                                        </tr>
                                        <tr className="button-area">
                                            <td colSpan="4" className="text-center">
                                                <button type="submit">등록</button>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                                {/* <!-- //guestWrite --> */}
                            </form>
                            <div>
                                
                                {guestbookList.map((guestbookVo)=>{
                                    return (
                                        <ItemGuest guestbookVo={guestbookVo}/>  
                                    )
                                })}
                                
                            </div>

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

export default AddList;
