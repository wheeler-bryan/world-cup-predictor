import { SubmitButton } from "../Components/SubmitButton.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputBox } from "../Components/InputBox.tsx";
import { supabase } from "../lib/supabase.ts"

export function Home() {

    const navigate = useNavigate();
    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const handleClick1 = (): void => {
        navigate("/makepicks");
    }

    const handleClick2 = (): void => {
        setEdit(true);
    }

    const handleClick3 = (): void => {
        navigate("/leaderboard");
    }

    const handleClick4 = async (): Promise<void> => {
        const { data, error } = await supabase
            .from('brackets')
            .select('*')
            .eq('name', name)
            .eq('code', code)
            .limit(1)
            .single()

        if (!error && data?.code === code) {
            navigate('/makepicks', { state: {
                    name: data.name,
                    code: data.code,
                    group_stage: data.group_stage,
                    third_place: data.third_place,
                    round_of_16: data.round_of_16,
                    quarterfinals: data.quarterfinals,
                    semifinals: data.semifinals,
                    finals: data.finals,
                    champion: data.champion,
                    golden_boot: data.golden_boot
            }})
        }
    }

    return (
        <div className="bg-[url('/qatar-stadium.png')] bg-cover bg-center h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white flex flex-col shadow-2xl shadow-black items-center justify-center rounded-4xl p-8">
                    <h1 className="font-[Poppins] text-5xl text-center font-bold rounded-4xl text-black bg-white p-4">Welcome to the World Cup Prediction App!</h1>
                    { (!edit) ?
                        <div className="flex gap-4 justify-center items-center">
                            <SubmitButton onClick={handleClick1} pt={"pt-[0.375rem]"} color={"bg-blue-500 hover:bg-blue-600"} width={"w-[7rem] h-[4rem] md:w-[12.375rem] md:h-[3.25rem]"}>Make Picks</SubmitButton>
                            <SubmitButton onClick={handleClick2} pt={"pt-[0.375rem]"} color={"bg-blue-500 hover:bg-blue-600"} width={"w-[7rem] h-[4rem] md:w-[12.375rem] md:h-[3.25rem]"}>Edit/View Picks</SubmitButton>
                            <SubmitButton onClick={handleClick3} pt={"pt-[0.375rem]"} color={"bg-blue-500 hover:bg-blue-600"} width={"w-[7rem] h-[4rem] md:w-[12.375rem] md:h-[3.25rem]"}>View Leaderboard</SubmitButton>
                        </div>
                        :
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <h2 className="text-center">Enter your name and edit code</h2>
                            <InputBox value={name} setState={setName} placeholder={"Name"} />
                            <InputBox value={code} setState={setCode} placeholder={"Code"} />
                            <SubmitButton onClick={handleClick4}>Check your picks</SubmitButton>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
    }