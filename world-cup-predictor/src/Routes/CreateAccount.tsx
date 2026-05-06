import {SignInForm} from "../Components/SignInForm.tsx";
import {SubmitButton} from "../Components/SubmitButton.tsx";
import {useNavigate} from "react-router-dom";

export function CreateAccount() {

    const navigate = useNavigate();

    const handleSubmit = (): void => {
        navigate("/create-account");
    }

    return (
        <>
            <div className="bg-[url('/stadium.jpg')] bg-cover bg-center h-screen">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 flex justify-center items-center w-screen h-screen">
                    <div className="m-auto py-[55px] px-[72px] bg-[white] shadow-2xl shadow-black rounded-[30px] w-[540px] h-[456px]">
                        <SignInForm />
                        <SubmitButton onClick={handleSubmit}>Create Account</SubmitButton>
                    </div>
                </div>
            </div>
        </>
    )
}