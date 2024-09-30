//import 라이브러리
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    /*---라우터 관련-------------------------------*/
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    /*---일반 변수--------------------------------*/
    /*---일반 메소드 -----------------------------*/
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleLogout = ()=>{
        console.log('로그아웃');

        //로컬스토리지에 token 삭제
        localStorage.removeItem('token');
        //로컬스토리지에 authUser 삭제
        localStorage.removeItem('authUser');
        
        //화면반영을 위한 상태값 변경
        setToken(null);
        setAuthUser(null);
        
    };

    return (
        <>
            <div id="header" className="clearfix">
                <h1>
                    <Link to="/" rel="noreferrer noopener">MySite</Link>
                </h1>
                
                {
                    (token !== null)?(
                        <ul>
                            <li>{authUser.name} 님 안녕하세요^^</li>
                            <li><button className="btn_s" onClick={handleLogout}>로그아웃</button></li>
                            <li><Link to="/user/editform" className="btn_s" rel="noreferrer noopener">회원정보수정</Link></li>
                        </ul>
                    ):(
                        <ul>
                            <li><Link to="/user/loginform" className="btn_s" rel="noreferrer noopener">로그인</Link></li>
                            <li><Link to="" className="btn_s" rel="noreferrer noopener">회원가입</Link></li>
                        </ul>
                    ) 
                }

            </div>
            {/* <!-- //header --> */}

            {/* <!-- nav --> */}
            <div id="nav">
                <ul className="clearfix">
                    <li><Link to="" rel="noreferrer noopener">입사지원서</Link></li>
                    <li><Link to="" rel="noreferrer noopener">게시판</Link></li>
                    <li><Link to="/attach/form2" rel="noreferrer noopener">갤러리</Link></li>
                    <li><Link to="/guest" rel="noreferrer noopener">방명록</Link></li>
                </ul>
            </div>
            {/* <!-- //nav --> */}
        </>
    );
}

export default Header;
