import "../App.css"
import {useLocation, useNavigate} from "react-router-dom";
import {SubmitButton} from "../Components/SubmitButton.tsx";
import { useEffect } from "react";


export function BracketSubmitted() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.state?.code) {
            navigate('/')  // redirect home if they typed the URL directly
        }
    }, [])

    const code = location.state?.code
    const name = location.state?.name

    const onSubmit = () => {
        navigate('/');
    }

    return(
        <div className="bg-[url('/world-cup-background.jpg')] bg-cover bg-center h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white flex shadow-2xl shadow-black flex-col items-center justify-center rounded-4xl p-8">
                    <h2 className="text-center">{name + ", thanks for submitting a bracket!"}</h2>
                    <h3 className="text-center">To edit your picks, or view before June 11th, use this code to access your account.</h3>
                    <h1 className="font-[Poppins] text-5xl text-center font-bold rounded-4xl text-black bg-white p-4">{code}</h1>
                    <SubmitButton onClick={onSubmit} color={"bg-black text-white w-[12.375rem] h-[3.25rem]"}>Return Home</SubmitButton>
                </div>
            </div>
        </div>
    )
}