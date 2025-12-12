import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full max-w-md flex flex-col items-center gap-2 pt-4 px-2 mx-auto">
            <img className="w-full" src="/Tukomer.png" alt="" />
            <SignIn withSignUp={true} />
        </div>
    )
}