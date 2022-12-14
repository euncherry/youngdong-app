import React, { useState } from "react"
import { Row, Col } from "../../../layout"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import headerIcon from "../../../assets/icons/youngdongHeaderIcon.png"
import { Image, Typo, Divider } from "../../../Components/"
import HamburgerIcon from "../../../assets/icons/hamburgerIcon.png"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import naverBtn from "../../../assets/icons/naverBtn.png"
import kakaoBtn from "../../../assets/icons/kakaoBtn.png"
import login_process from "../../../service/utils/login_progress"
import signup_process from "../../../service/utils/signup_progress"
import logout_process from "../../../service/utils/logout_progress"
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useEffect } from "react"


const IconHeader = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    width : 100%;
    padding: 2rem;
    box-sizing: border-box;
`
const CategoryHeader = styled.div`
    display : flex;
    align-items : center;
    width : 100%;
    height : auto;
    padding : 0 2rem;
    box-sizing: border-box;
    background-color :#c2e19d;
    position: sticky;
    top : 0;
    z-index: 20;
`

const CategoryBox = styled.div`
    margin : 5px;
    display : flex;
    align-items : center;
    justify-content: flex-start;
    font-size : 1.2rem;
    border-left : ${props => props.red ? `#e64937` : `#545454`} 2px solid;
    padding-left: 5px;
    color : ${props => props.red ? `#e64937` : `#545454`};
    font-family: "tway" ;
    
    cursor : pointer;
`
const LoginBtnBox = styled.div`
    display: flex;
    align-items:center;
    font-size:1.1rem;
    padding-left:5px;
    height:0;
    /*width:max-content;*/
    right:10px;
    position:relative;
    top:2rem;
    z-index:26;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    padding-right: 2rem;
    @media (max-width: 600px) {
        position : static;
        height : auto ;
        margin : 1.5rem 0 0 0;
        justify-content: space-evenly;
    }
`

const LoginValueBtn = styled.div`
    margin : 5px;
    display : flex;
    align-items : center;
    justify-content: flex-start;
    font-size : inherit;
    border-left : ${props => props.red ? `#e64937` : `#545454`} 2px solid;
    padding-left: 5px;
    color : ${props => props.red ? `#e64937` : `#545454`};
    cursor : pointer;
    font-family : "nixgon";
        margin-right : 20px;
        border-left-width : 1px;
        font-weight :bold;
        @media (max-width: 600px) {
        justify-content: center;
        border : none;
        padding : 5px 10px;
        font-size : 1.5rem;
        margin-top :0px;
        margin-bottom :0px;
    }
`


const SnsLoginBtn = styled.div`
    margin : 5px 0;
    padding : 1rem;

    width: 100%;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    background-color: ${props => props.naver ? `#1EC800` : `#F5E901`};
    color: ${props => props.naver ? `#fff` : `#000`};
    cursor : pointer;
`
const SnsIconWrapper = styled.div`
  display:flex;
    align-items:center;
    justify-content:center;
    width : 2rem;
    border-right:1px solid white;
    padding : 1rem;
    cursor : pointer;

`
const SelectLoginSign = styled.div`
    transition: all 0.5s ease;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family :"nixgon";
    font-size : 2rem;
    padding : 1rem 2rem;
    width : 100%;
    border-radius : 1rem 1rem 0 0 ;
    background-color : white;
    cursor : pointer;
    ${props => props.isSelect ? {
        backgroundColor: "#393939",
        color: 'white',
    } : null}
`
const CategoryWrapper = styled.div`
    height: calc(95vh - 20rem);
    overflow-y: auto;
    position: absolute;
    display: flex;
    top : 5rem;
    margin-top: 1rem;
`
const CategoryContent = styled.div`
    position: relative;
    z-index: 21;
    min-width : 249px;
    border-bottom : 1px solid #dddddd;
    background-color: #ffffff;
    animation: 0s linear 0s 1 normal;
    box-sizing: border-box;
`
const CategoryValue = styled.div`
width : 100%;
    display : flex;
    align-items : center;
    justify-content : flex-start;
    font-family : "Jeju";
    font-size : 1.2rem;
    color : #333333;
    padding : 15px 0px 15px 24px;
    box-sizing: border-box;
    &:hover{
        background-color:rgba(233, 233, 233, 0.3);
        color : #028000;
        font-weight:bold;
    }
`

const CategoryDetailContent = styled.div`
    position: relative;
    z-index: 21;
    min-width : 249px;
    border-bottom : 1px solid #dddddd;
    background-color: #f7f7f7;
    animation: 0s linear 0s 1 normal;
`

const CategoryDetailValue = styled.div`
    width : 100%;
    display : flex;
    align-items : center;
    justify-content : flex-start;
    font-family : "Jeju";
    font-size : 1.2rem;
    color : #333333;
    padding : 15px 0px 15px 24px;
    box-sizing: border-box;
    &:hover{
        background-color:#e9e9e9;
        color : #028000;
        font-weight:bold;
        text-decoration: underline;
        text-underline-position: under;
        text-decoration-color: #028000;
        text-decoration-thickness : 2px;
    }
`


const HeaderContent = ({ logined, role, }) => {

    const navigate = useNavigate()

    //SECTION modal , UI controls
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const handleLoginModalOpen = () => setOpenLoginModal(true);
    const handleLoginModalClose = () => setOpenLoginModal(false);

    const [isSelectLoginSignup, setIsSelectLoginSignup] = useState("login");
    const selectLogin = () => setIsSelectLoginSignup("login");
    const selectSignup = () => setIsSelectLoginSignup("signup");

    const doingLogin = () => {
        handleLoginModalOpen();
        selectLogin()
    }
    const doingSignup = () => {
        handleLoginModalOpen();
        selectSignup();
    }

    //!SECTION

    //SECTION ???????????? ??????
    const [signUpInfo, setSignUpInfo] = useState({
        email: "",
        password: "",
    });
    const [logInInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    let settingSingUpValueFunction = {
        email: (e) => {
            const email = e.target.value;
            return setSignUpInfo((state) => ({ ...state, email: email }));
        },
        password: (e) => {
            const password = e.target.value;
            return setSignUpInfo((state) => ({ ...state, password: password }));
        },
        name: (e) => {
            const password = e.target.value;
            return setSignUpInfo((state) => ({ ...state, password: password }));
        }
    };

    let settingLogInValueFunction = {
        email: (e) => {
            const email = e.target.value;
            return setLoginInfo((state) => ({ ...state, email: email }));
        },

        password: (e) => {
            const password = e.target.value;
            return setLoginInfo((state) => ({ ...state, password: password }))
        },
    };

    const LoginBtnOnclick = () => {
        login_process(logInInfo)

        handleLoginModalClose();
        setLoginInfo({
            email: "",
            password: "",
        });
    };
    const SignupBtnOnclick = () => {
        signup_process(signUpInfo)


        handleLoginModalClose();
        setSignUpInfo({
            email: "",
            password: "",
        });

    };




    const logOutOnClick = () => {
        logout_process()
        navigate('/')
    }
    //!SECTION

    //SECTION ????????????

    //detail object
    const categoryValueDetailMonk = {
        '??? ?? ??????': [],
        '??????': ['?????????', '?????????', '??????', '?????????', '??????', '??????',],
        '??????': ['??????', '??????', '???', '?????????', '??????', '???????????????', '??????', '??????', '??????'],
        '??? ?? ??????': ['???', '??????'],
        '?????? ?? ??????': ['???', '??????', '????????????'],
        '??????': ['?????????', '??????', '??????'],
        '??????': ['???????????????', '??????', '?????????'],
        '????????????': ['??????', '?????????', '???', '??????', '????????????'],
        '??????': ['??????', '?????????', '?????????', '??????', '??????'],
        '??? ?? ??????': ['???', '??????'],
        '??????': ['???????????????', '???????????????'],

    }
    const categoryValueMonk = Object.keys(categoryValueDetailMonk)

    //???????????? ?????? bool
    const [isCategoryEnter, setCategoryEnter] = useState(false);
    //???????????? value
    const [categoryValue, setCategoryValue] = useState("");
    //???????????? ????????????
    const [isCategoryDetail, setIsCategoryDetail] = useState(false);
    //???????????? ???????????? ??????
    const [categoryValueDetail, setCategoryValueDetail] = useState([]);




    const mouseEnterHandler = () => {
        setCategoryEnter(true);
        setIsCategoryDetail(false)

    }
    const mouseLeaveHandler = () => {
        setCategoryValue("")
        setCategoryEnter(false)
    }

    const valueMouseEnterHandler = (event, value) => {
        setCategoryEnter(true);

        setCategoryValue(value)

        console.log(categoryValueDetailMonk[value])

        setCategoryValueDetail(categoryValueDetailMonk[value])
        categoryValueDetailMonk[value].length === 0 ?
            setIsCategoryDetail(false)
            :
            setIsCategoryDetail(true);

    }


    const valueMouseLeaveHandler = () => {
        console.log('mouseLeaveHandler')
    }
    //!SECTION




    return (
        <>

            {
                logined ?
                    <LoginBtnBox>
                        <LoginValueBtn onClick={logOutOnClick}>????????????</LoginValueBtn>
                    </LoginBtnBox>
                    :
                    <>
                        <LoginBtnBox>
                            <LoginValueBtn onClick={() => navigate('/cart')} >????????????</LoginValueBtn>
                            <LoginValueBtn onClick={doingLogin}>?????????</LoginValueBtn>
                            <Modal
                                open={openLoginModal}
                                onClose={handleLoginModalClose}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '55%',
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    borderRadius: '5px',
                                    p: 4,
                                    overflow: 'auto',
                                    maxHeight: ' 80%'
                                }}>
                                    <Row>
                                        <Col span={12} style={{ borderBottom: "2px solid #393939" }}>
                                            <Row>
                                                <Col span={6}>
                                                    <SelectLoginSign isSelect={(isSelectLoginSignup === "login" ? true : false)} onClick={selectLogin}>
                                                        ?????????
                                                    </SelectLoginSign>
                                                </Col>
                                                <Col span={6}>
                                                    <SelectLoginSign isSelect={(isSelectLoginSignup === "signup" ? true : false)} onClick={selectSignup}>
                                                        ????????????
                                                    </SelectLoginSign>
                                                </Col>
                                            </Row>
                                        </Col>

                                        {
                                            isSelectLoginSignup === "login" ?
                                                <Col span={12} style={{ marginTop: "1.5rem" }}>
                                                    <Typo size={'1.5rem'} color={"#414141"} weight={"bold"}>???????????? ?????????</Typo>
                                                    <Row justify={"space-between"}>
                                                        <Col span={12}>
                                                            <Col span={12}>
                                                                <TextField
                                                                    size="normal"
                                                                    margin="normal"
                                                                    required
                                                                    fullWidth
                                                                    id="email"
                                                                    label="???????????? ???????????????."
                                                                    name="email"
                                                                    autoComplete="email"
                                                                    autoFocus
                                                                    onChange={settingLogInValueFunction.email}
                                                                    value={logInInfo.email}
                                                                />
                                                                <TextField

                                                                    margin="dense"
                                                                    required
                                                                    fullWidth
                                                                    name="password"
                                                                    label="??????????????? ???????????????"
                                                                    type="password"
                                                                    id="password"
                                                                    autoComplete="current-password"
                                                                    size="normal"
                                                                    onChange={settingLogInValueFunction.password}
                                                                    value={logInInfo.password}
                                                                />
                                                            </Col>
                                                            <Col span={12}>
                                                                <Button variant="contained" fullWidth style={{
                                                                    boxShadow: 'none',
                                                                    fontSize: '1.5rem',
                                                                    padding: '1rem 0px',
                                                                }}
                                                                    onClick={LoginBtnOnclick}
                                                                >
                                                                    ?????????
                                                                </Button>
                                                            </Col>

                                                        </Col>
                                                        <Col span={12} style={{ marginTop: "1.5rem" }}>
                                                            <Typo size={'1.5rem'} color={"#414141"} weight={"bold"}>?????????????????? ?????????</Typo>

                                                            <SnsLoginBtn naver>
                                                                <SnsIconWrapper >
                                                                    <img src={naverBtn} alt="NAVER" width={"95%"} />

                                                                </SnsIconWrapper>
                                                                <Typo cursor={"pointer"} width={"inherit"} padding={"0 0 0 5px"} textAlign={"center"} size={"1.2rem"}>???????????? ?????????</Typo>
                                                            </SnsLoginBtn>
                                                            <SnsLoginBtn >
                                                                <SnsIconWrapper >
                                                                    <img src={kakaoBtn} alt="KAKAO" width={"98%"} />

                                                                </SnsIconWrapper>
                                                                <Typo width={"inherit"} padding={"0 0 0 5px"} textAlign={"center"} size={"1.2rem"}>?????????????????? ?????????</Typo>
                                                            </SnsLoginBtn>
                                                        </Col>

                                                        <Col span={12} >
                                                            <Divider></Divider>

                                                            <Button variant="outlined" fullWidth size="large" style={{
                                                                fontSize: '1.3rem',
                                                                padding: '1rem 0px',
                                                            }}>??????????????? ????????????</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                :

                                                <Col span={12} style={{ marginTop: "1.5rem" }}>
                                                    <Typo size={'1.5rem'} color={"#414141"} weight={"bold"}>??????????????????</Typo>
                                                    <Row justify={"space-between"}>
                                                        <Col span={12} >
                                                            <Col span={12}>
                                                                <TextField
                                                                    size="normal"
                                                                    margin="normal"
                                                                    required
                                                                    fullWidth
                                                                    id="email"
                                                                    label="???????????? ???????????????."
                                                                    name="email"
                                                                    autoComplete="email"
                                                                    onChange={settingSingUpValueFunction.email}
                                                                    value={signUpInfo.email}
                                                                />
                                                                <TextField

                                                                    margin="normal"
                                                                    required
                                                                    fullWidth
                                                                    name="password"
                                                                    label="??????????????? ???????????????"
                                                                    type="password"
                                                                    id="password"
                                                                    autoComplete="current-password"
                                                                    size="normal"
                                                                    onChange={settingSingUpValueFunction.password}
                                                                    value={signUpInfo.password}
                                                                />

                                                            </Col>
                                                            <Col span={12}>
                                                                <Button variant="contained" fullWidth style={{
                                                                    boxShadow: 'none',
                                                                    fontSize: '1.5rem',
                                                                    padding: '1rem 0px',
                                                                }}
                                                                    onClick={SignupBtnOnclick}
                                                                >
                                                                    ????????????
                                                                </Button>
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                        }
                                    </Row>



                                </Box>
                            </Modal>
                            <LoginValueBtn onClick={doingSignup} >????????????</LoginValueBtn>
                        </LoginBtnBox>
                    </>
            }




            <IconHeader>
                <Image src={headerIcon} width={'13rem'} cursor={"pointer"} onClick={() => { navigate("/") }} />


            </IconHeader>
            {/* //NOTE */}
            <CategoryHeader>
                <Row align={"center"} >
                    <Col xs={1} sm={1} md={2} span={2} align={"center"} justify={"flex-start"}  >
                        <div
                            style={{ height: "6rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", cursor: "pointer" }}
                            onClick={mouseEnterHandler}
                            onMouseEnter={mouseEnterHandler}
                            onMouseLeave={mouseLeaveHandler}
                        >
                            <Col xs={0} sm={0} md={12} span={12}>
                                <Image src={HamburgerIcon} width={"2.5rem"} padding={"0 10px 0 0 "} />
                                <Typo size={"1.2rem"} fontFamily={"tway"} color={"#545454"}>????????????</Typo>
                            </Col>
                            <Col xs={12} sm={12} md={0} justify={"center"} align={"center"} style={{ width: "100%" }}>
                                <Image src={HamburgerIcon} width={"3rem"} padding={"0 10px 0 0 "} cursor={"pointer"} />
                            </Col>
                        </div>
                        {
                            isCategoryEnter ?
                                <CategoryWrapper onMouseLeave={() => {
                                    setCategoryEnter(false);
                                }}>
                                    <CategoryContent>
                                        <Row style={{ overflowY: "auto", width: "247px", height: "100%", cursor: "pointer" }}>
                                            <Col span={12}>
                                                {
                                                    categoryValueMonk.length > 0 ?
                                                        categoryValueMonk.map((item, index) =>
                                                            <CategoryValue key={index} onMouseEnter={(event) => valueMouseEnterHandler(event, item)} onMouseLeave={valueMouseLeaveHandler}>{item}</CategoryValue>

                                                        )
                                                        :
                                                        null
                                                }
                                            </Col>
                                        </Row>
                                    </CategoryContent>
                                    {
                                        isCategoryDetail === true ?
                                            <>
                                                <CategoryDetailContent>
                                                    <Row style={{ overflowY: "auto", width: "247px", height: "100%", cursor: "pointer" }}>
                                                        <Col span={12}>
                                                            {
                                                                categoryValueDetail.map((item, index) => {
                                                                    return <CategoryDetailValue key={index}>{item}</CategoryDetailValue>
                                                                })

                                                            }

                                                        </Col>
                                                    </Row>

                                                </CategoryDetailContent>
                                            </>

                                            : null
                                    }
                                </CategoryWrapper>
                                :
                                null
                        }

                    </Col>
                    <Col xs={10} sm={10} md={9} lg={9} xl={9} xxl={8} span={8} justify={"space-evenly"}>
                        <CategoryBox>??????????????????</CategoryBox>
                        <CategoryBox>????????????</CategoryBox>
                        <CategoryBox>???????????????</CategoryBox>
                        <CategoryBox>????????????</CategoryBox>
                        <CategoryBox red onClick={() => navigate("/servicecenter")}>????????????</CategoryBox>
                    </Col>

                </Row>
            </CategoryHeader>

        </>

    )

}

export default HeaderContent