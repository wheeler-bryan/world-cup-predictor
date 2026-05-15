import {SubmitButton} from "../Components/SubmitButton.tsx";
import { useNavigate } from "react-router-dom";

export function Home() {

    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate("/login");
    }

    // if (localStorage.getItem("isSignedIn") === "true") {
    //     return (
    //         <>
    //             <h1>Hello</h1>
    //         </>
    //     )
    // } else
    return (
        <div className="bg-[url('/world-cup-cover.jpg')] bg-cover bg-center h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white flex shadow-2xl shadow-black flex-col items-center justify-center rounded-4xl p-16">
                    <h1 className="font-[Poppins] text-5xl font-bold rounded-4xl text-black bg-white p-4">Make your World Cup picks!</h1>
                    <SubmitButton onClick={handleClick}>Login</SubmitButton>
                </div>
            </div>
        </div>
    )
    }