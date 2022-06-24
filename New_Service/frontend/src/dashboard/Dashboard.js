import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, Form} from "antd";
import {Link} from "react-router-dom";

const Dashboard = () => {

   // const user = useSelector((state) => state.people.loggedInUser);
    const dispatch = useDispatch()
  //  useEffect(getFormData(dispatch), [])
    /*const action = (user?.pictureUploaded === 1) ? <Link to={'/Form'}><Button>Start Application</Button></Link> :
        <Link to={'/pictureUpload'}><Button>Upload Picture</Button></Link>
*/
    const admissionStatus =""
    const formCompleted =""
    const pictureUploaded = ""


    return (
        <div>
            {/*<Breadcrumbs>
                <p>Go back</p>
            </Breadcrumbs>*/}
            <div className="ant-row"
                 style={{marginLeft: '-10px', marginRight: '-10px', marginBottom: '5px', rowGap: '5px'}}>
                <div xm="24" className="ant-col ant-col-24 ant-col-sm-6 ant-col-lg-6"
                     style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <div className="ant-card ant-card-bordered overviewCard1">
                        <div className="ant-card-body">
                            <div className="ant-row ant-row-center ant-row-middle"
                                 style={{marginLeft: '-10px', marginRight: '-10px', rowGap: '0px'}}>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><span
                                    role="img" aria-label="file-protect"
                                    className="anticon anticon-file-protect dashIcon"><svg viewBox="64 64 896 896"
                                                                                           focusable="false"
                                                                                           data-icon="file-protect"
                                                                                           width="1em" height="1em"
                                                                                           fill="currentColor"
                                                                                           aria-hidden="true"><path
                                    d="M644.7 669.2a7.92 7.92 0 00-6.5-3.3H594c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.8-5.3 0-12.7-6.5-12.7h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-22.9-31.9zM688 306v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm184 458H208V148h560v296c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h312c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm402.6-320.8l-192-66.7c-.9-.3-1.7-.4-2.6-.4s-1.8.1-2.6.4l-192 66.7a7.96 7.96 0 00-5.4 7.5v251.1c0 2.5 1.1 4.8 3.1 6.3l192 150.2c1.4 1.1 3.2 1.7 4.9 1.7s3.5-.6 4.9-1.7l192-150.2c1.9-1.5 3.1-3.8 3.1-6.3V538.7c0-3.4-2.2-6.4-5.4-7.5zM826 763.7L688 871.6 550 763.7V577l138-48 138 48v186.7z"></path></svg></span>
                                </div>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><h6
                                    className="dashIconTitsle">{admissionStatus}</h6><h6
                                    className="dashIconText">Admission Status</h6></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div xm="24" className="ant-col ant-col-24 ant-col-sm-6 ant-col-lg-6"
                     style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <div className="ant-card ant-card-bordered overviewCard1">
                        <div className="ant-card-body">
                            <div className="ant-row ant-row-center ant-row-middle"
                                 style={{marginLeft: '-10px', marginRight: '-10px', rowGap: '0px'}}>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><span
                                    role="img" aria-label="file-protect"
                                    className="anticon anticon-file-protect dashIcon"><svg viewBox="64 64 896 896"
                                                                                           focusable="false"
                                                                                           data-icon="file-protect"
                                                                                           width="1em" height="1em"
                                                                                           fill="currentColor"
                                                                                           aria-hidden="true"><path
                                    d="M644.7 669.2a7.92 7.92 0 00-6.5-3.3H594c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.8-5.3 0-12.7-6.5-12.7h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-22.9-31.9zM688 306v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm184 458H208V148h560v296c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h312c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm402.6-320.8l-192-66.7c-.9-.3-1.7-.4-2.6-.4s-1.8.1-2.6.4l-192 66.7a7.96 7.96 0 00-5.4 7.5v251.1c0 2.5 1.1 4.8 3.1 6.3l192 150.2c1.4 1.1 3.2 1.7 4.9 1.7s3.5-.6 4.9-1.7l192-150.2c1.9-1.5 3.1-3.8 3.1-6.3V538.7c0-3.4-2.2-6.4-5.4-7.5zM826 763.7L688 871.6 550 763.7V577l138-48 138 48v186.7z"></path></svg></span>
                                </div>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><h6
                                    className="dashIconTitsle">{formCompleted}</h6><h6 className="dashIconText">Form
                                    Completed?</h6></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div xm="24" className="ant-col ant-col-24 ant-col-sm-6 ant-col-lg-6"
                     style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <div className="ant-card ant-card-bordered overviewCard1">
                        <div className="ant-card-body">
                            <div className="ant-row ant-row-center ant-row-middle"
                                 style={{marginLeft: '-10px', marginRight: '-10px', rowGap: '0px'}}>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><span
                                    role="img" aria-label="profile" className="anticon anticon-profile dashIcon"><svg
                                    viewBox="64 64 896 896" focusable="false" data-icon="profile" width="1em"
                                    height="1em" fill="currentColor" aria-hidden="true"><path
                                    d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg></span>
                                </div>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><h6
                                    className="dashIconTitsle">{user?.formNo}</h6><h6 className="dashIconText">Form
                                    No</h6></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div xm="24" className="ant-col ant-col-24 ant-col-sm-6 ant-col-lg-6"
                     style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <div className="ant-card ant-card-bordered overviewCard1">
                        <div className="ant-card-body">
                            <div className="ant-row ant-row-center ant-row-middle"
                                 style={{marginLeft: '-10px', marginRight: '-10px', rowGap: '0px'}}>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><span
                                    role="img" aria-label="user" className="anticon anticon-user dashIcon">
                                    <svg
                                        viewBox="64 64 896 896" focusable="false" data-icon="user" width="1em"
                                        height="1em"
                                        fill="currentColor" aria-hidden="true"><path
                                        d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                                    </svg></span>
                                </div>
                                <div className="ant-col" style={{paddingLeft: '10px', paddingRight: '10px'}}><h6
                                    className="dashIconTitsle">{pictureUploaded}</h6><h6
                                    className="dashIconText">Picture Status</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <div className="ant-col ant-col-24">
                    <div className="ant-card">
                        <div className="ant-card-body">

                            <center><strong>INSTRUCTIONS IN FILLING THE FORM </strong></center>

                            <hr/>
                            <p>All Ghanaian applicants for the 2022/2023 Academic year admission are required to use
                                Takoradi Technical University online admission portal.<br/> The procedure for the
                                online application process is as follows:</p>

                            <p><strong>I</strong>. In completing the online form, applicants will be required to
                                upload their passport size photograph (not more than 250KB) with a white background.
                            </p>
                            <p><strong>II. </strong>Applicants are advised to check thoroughly all details entered
                                before they finally submit their online applications. A form, once submitted, can be
                                viewed, but cannot be edited.</p>
                            <p><strong>III.</strong> Applicants should print out application form; attach result
                                slips, certificates and all other relevant documents.</p>
                            <p><strong>IV. </strong>The application documents as specified (III) above should sent
                                by post to</p>

                            <p align="center"><strong>The Registrar</strong></p>
                            <p align="center"><strong>Takoradi Technical University</strong></p>
                            <p align="center"><strong>P. O Box 256, Takoradi, W/R.</strong></p>

                            <center><strong>For more information call 0508333992 / 0553777777 / 0243348522 /
                                0508335033</strong></center>
                            &nbsp;
                            <div className="form-actions" data-qa-continue="">
                                <center>

                                    {action}

                                </center>

                                {/*{renderForecastsTable(users)}*/}
                            </div>

                        </div>
                    </div>
                </div>

            </>
        </div>
    )

}
export default Dashboard
