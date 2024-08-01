import AuthForm from "./components/AuthForm";

export default function Login() {

    // bg-gray-100
    return (
        <div className="w-full">
            <div
                className="
                  flex flex-col justify-center py-12
                  px-5 sm:px-6 lg:px-8 bg-dark-1 text-light-1 w-full h-full
                "
            >
                <AuthForm />
            </div>
        </div>
    );
}
