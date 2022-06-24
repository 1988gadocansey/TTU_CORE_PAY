import React, {Component} from 'react';
import './Public.css'
import logo from './logo.svg'
import google from './google.png'
import pay from './pay-icons.png'
import {GOOGLE_AUTH_URL} from "../constants";

const Public=() =>{

    return(
        <>
            <main className="container-fluid page landing-page">
                <div className="row" style={{height: "100vh"}}>
                    <div className="col-7 featured-block" id="imageColumn" style={{backgroundImage: "url('https://apply.ug.edu.gh/admissions/assets/images/loginbackground3.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                        <div className="container">
                            <div>
                                <h1 id="txt1" style={{textShadow: "3px 3px #000",fontWeight:"bold"}}>
                                    Takoradi Tech. University Payment Platform
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="col">

                        <div>
                            <img src={logo} alt="Logo" />;


                        </div>

                        <section
                            style={{backgroundImage: "url( https://apply.ug.edu.gh/admissions/assets/images/UG_WHITE_LOGO-01.png)", backgroundRepeat: "no-repeat"}}>
                            <div className="row" id="ugrow"
                                 style={{backgroundImage: "linear-gradient(-90deg, #DCCA9C 0%, #2E4975 100%)"}}>
                                <div className="col">
                                    <p id="ugadmission">
                                        Welcome to the TTU Pay Portal simpler, more exciting way to make payments.
                                    </p>
                                </div>
                            </div>
                        </section>
                        <div>
                            <div className="container">
                               <center>
                                   <a href={GOOGLE_AUTH_URL}>
                                   <img alt="google" className="img-fluid"
                                        src={google} style={{cursor: "pointer" ,width:"300px"}}/>
                                   </a>
                               </center>

                            </div>
                            <div className="container">
                                <center>
                                    <img alt="google" className="img-fluid"
                                         src={pay} style={{cursor: "pointer" ,width:"1000px"}}/>

                                </center>

                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}
export default Public
