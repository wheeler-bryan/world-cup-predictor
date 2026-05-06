import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Header} from "./Header.tsx";
import {InputBox} from "./InputBox.tsx";
import {SubmitButton} from "./SubmitButton.tsx";

export function SignInForm(){
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("")
    const [pin, setPin] = useState<string>("")

    function handleSubmit(){
        if (username === "BryanW" && pin === "227928") {
            localStorage.setItem("firstName", "Bryan");
            localStorage.setItem("isSignedIn", "true");
            console.log(localStorage.getItem("firstName"));
            navigate("/makepicks")
        } else {
            alert("Incorrect username or PIN");
            navigate("/login")
        }
    }

    return(
        <>
            <h1 className="font-[Poppins] font-[550] text-[26px] text-center">Login to your account</h1>
            <form id="signInForm" onSubmit={handleSubmit}>
                <Header className="pt-[20px]">Username</Header>
                <InputBox value={username} setState={setUsername} placeholder={"Username"} width = "w-[400px]" />
                <br/>
                <Header className="pt-[15px]">PIN</Header>
                <InputBox value={pin} setState={setPin} placeholder={"Enter your 6 digit PIN"} width = "w-[260px]" type="password" />
                <br/>
                <SubmitButton onClick={handleSubmit}>Login now</SubmitButton>
            </form>
        </>
    )
}