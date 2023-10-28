import Image from "next/image";
import { Inter } from "next/font/google";
import Form from "@/components/form";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import Camera from "@/components/Camera";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import { useAppContext } from "@/Context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {step, setStep} = useAppContext()
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSendToLLM = (role, job) => {
    setLoading(true);

    //api call to llm
    setPrompt(
      `You're playing the role of an interviewer at ${job} and you're interviewing a person applying as a ${role} `
    );

    setLoading(false);
    setStep(2);
  };

  const handleBeginRecord = ()=> {
    setLoading(true)
    

    console.log(loading)
  // After 3 seconds, set startLoading back to false
  setTimeout( ()=> {
    setLoading(false)
  }, 3000); // 3

  setStep(3)

  }

  console.log(loading);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <LoaderIcon style={{ width: "100px", height: "100px" }} />
      </div>
    );
  } else {
    return (
      <main className="w-full min-h-screen flex flex=col items-center justify-center">
        {step === 1 && <Form handleSendToLLM={handleSendToLLM} />}
        {step === 2 && (
          <Step2 handleBeginRecord={handleBeginRecord}/>
        )}
        {step === 3 && <Step3 />}
      </main>
    );
  }
}
