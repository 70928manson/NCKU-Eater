import AuthForm from "./components/AuthForm";

export default function Login() {

    return (
        <div className="h-[calc(100vh-65px)] w-full">
            <div
                className="
                  flex flex-col justify-center py-12
                  px-5 sm:px-6 lg:px-8 bg-gray-100 w-full h-full
                "
            >
                <AuthForm />
            </div>
        </div>
    );
}
