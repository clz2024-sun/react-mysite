//import 라이브러리
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import Header from '../include/Header';
import Footer from '../include/Footer';

//css
import '../../css/gallery.css'
import '../../css/ai.css'

const Chat = () => {
    /*---라우터 관련-------------------------------*/
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [question, setQuestion] = useState('');
    const [msgList, setMsgList] = useState([]);
    /*---일반 변수--------------------------------*/
    /*---일반 메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleQuestion = (e) => {
        setQuestion(e.target.value)
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        console.log(question);

        //질문 리스트에 추가
        //새로운주소의 배열을 파라미터로 전달해야한다
        setMsgList((prevMsgList)=>{
            const msgVo ={
                role: "user",
                msg: question
            };
            const newMsgList = [...prevMsgList, msgVo]
            console.log(newMsgList);
            return newMsgList
        });
        //question spring으로 보낸다
        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/ai/chats`,
            params: {question:question}, // get delete 쿼리스트링(파라미터)
            
            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data.apiData); //수신데이타
            const answer = response.data.apiData
            setMsgList((prevMsgList)=>{
                const msgVo ={
                    role: "bot",
                    msg: answer
                };
                const newMsgList = [...prevMsgList, msgVo]
                console.log("aaa" , newMsgList);
                return newMsgList
            });
        
        }).catch(error => {
            console.log(error);
        });



        setQuestion('')
    };

    return (
        <>
            <div id="wrap">

                {/* <!-- header + nav --> */}
                <Header />
                {/* <!-- //header + nav --> */}


                <div id="container" className="clearfix">
                    <div id="aside">
                        <h2>생성형AI</h2>
                        <ul>
                            <li><Link to="">챗봇</Link></li>
                            <li><Link to="">이미지생성</Link></li>
                        </ul>
                    </div>
                    {/* <!-- //aside --> */}


                    <div id="content">

                        <div id="content-head">
                            <h3>챗봇</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>생성형AI</li>
                                    <li className="last">챗봇</li>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        {/* <!-- //content-head --> */}


                        <div id="ai">

                            <div id="chat-box">
                                {msgList.map(( msgVo, index )=>{    
                                    return (
                                        (msgVo.role == "user")?(
                                            <div className="user-msg-box clearfix" key={index}>
                                                <div className="user-msg" dangerouslySetInnerHTML={{ __html: msgVo.msg }}/>
                                            </div>
                                        ):(
                                            <div className="bot-msg-box clearfix" key={index}>
                                                <div className="bot-msg" dangerouslySetInnerHTML={{ __html: msgVo.msg }}/>
                                            </div>
                                        )
                                        
                                    )
                                })}
                                
                            </div>
                            <form action="" method="" onSubmit={handleSubmitQuestion}>
                                <input id="txt-question" type="text" name="" value={question} onChange={handleQuestion} />
                                <button id="btn-sendMsg" type="submit">보내기</button>
                            </form>
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

export default Chat;
