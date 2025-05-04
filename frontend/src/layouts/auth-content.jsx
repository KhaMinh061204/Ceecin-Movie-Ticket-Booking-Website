// import { useEffect } from "react";
import ForgetPass from "../components/forgetpass";
import Login from "../components/login";
import Otp from "../components/opt";
import Register from "../components/register";
import $ from "jquery"
import Repass from "../components/repass";
import React from 'react'; 

function AuthContent(){


    return(
        <section id="authpopup" className="wrap-auth-popup flex starthor cenver hide">

        <ForgetPass
            changetoLogin={
                ()=>{
                    $("#login-popup").removeClass("hide");
                    $("#forgetpass-popup").addClass("hide")
                }
            }   

            OTP={
                ()=>{
                    $("#otp-popup").removeClass("hide");
                    $("#forgetpass-popup").addClass("hide")
                }
            }    
        />

        <Otp            
            repass={
                ()=>{
                    $("#repass-popup").removeClass("hide");
                    $("#otp-popup").addClass("hide");
                }
            }  
        />

        <Repass 
            changetoLogin={
                ()=>{
                    $("#login-popup").removeClass("hide");
                    $("#repass-popup").addClass("hide")
                }
            }  
        />
        
        <Login 
            changetoRegis={
                ()=>{
                    $("#regis-popup").removeClass("hide");
                    $("#login-popup").addClass("hide")
                }
            }

            changetoForgetPass={
                ()=>{
                    $("#forgetpass-popup").removeClass("hide");
                    $("#login-popup").addClass("hide")
                }
            }
        />
        <Register changetoLogin={()=>{
            $("#login-popup").removeClass("hide");
            $("#regis-popup").addClass("hide")
        }}/>

        </section>
    )
    
}

export default AuthContent;