import AuthForm from "./components/AuthForm";

export default function Login() {

    return (
        <div className="flex min-h-screen flex-col items-center w-full">
            <div
                className="flex min-h-screen flex-col justify-center py-12
            sm:px-6 lg:px-8 bg-gray-100 w-full
          "
            >
                <AuthForm />
            </div>
        </div>
    );
}
