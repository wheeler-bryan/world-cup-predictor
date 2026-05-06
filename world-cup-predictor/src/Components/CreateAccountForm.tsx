import {useState} from "react";
import {Header} from "./Header.tsx";
import {InputBox} from "./InputBox.tsx";
import {SubmitButton} from "./SubmitButton.tsx";
import { useNavigate} from 'react-router-dom';

export function CreateAccountForm(){
    const [firstName, setFirst] = useState<string>("")
    const [lastName, setLast] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();
    // const createUser = trpc.makeUser.useMutation()

    function handleSubmit(){
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("isSignedIn", "true");
        // createUser.mutate({
        //     first_name: firstName,
        //     last_name: lastName,
        //     email: email,
        //     password: password
        // })
        navigate("/makepicks")
    }

    return(
        <>

            <h1 className="font-[Poppins] font-[550] text-[26px] text-center">Create an account</h1>
            <form>
                <Header className="pt-[30px]">First Name</Header>
                <InputBox value={firstName} setState={setFirst} placeholder={"First Name"} />
                <br/>
                <Header className="pt-[20px]">Last Name</Header>
                <InputBox value={lastName} setState={setLast} placeholder={"Last Name"} />
                <br/>
                <Header className="pt-[20px]">Email</Header>
                <InputBox value={email} setState={setEmail} placeholder={"yourEmail@email.com"} />
                <br/>
                <Header className="pt-[20px]">Password</Header>
                <InputBox value={password} setState={setPassword} placeholder={"Enter your password"} width = "w-[260px]" type={"password"} />
                <br/>
                <SubmitButton onClick={handleSubmit}>Create account</SubmitButton>
            </form>
        </>
    )
}