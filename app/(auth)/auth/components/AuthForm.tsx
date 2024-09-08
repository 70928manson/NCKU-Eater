// shadcn/ui form document

"use client";

import Image from "next/image";
import { UserIcon, MailIcon, UtensilsCrossed } from 'lucide-react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCallback, useEffect, useState } from "react";
import { BsGithub, BsGoogle, BsInstagram } from "react-icons/bs";

import DOMPurify from "isomorphic-dompurify";
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from "next-auth/react";

import { useRouter } from 'next/navigation';

import AuthSocialButton from "./AuthSocialButton";
import { PasswordInput } from "@/components/ui/passwordInput";

const formSchema = z.object({
    username: z.union([z.string().length(0), z.string().min(1, { message: "Username has to be filled." }), z.string().max(16, { message: "Username length must less than 16." })]).optional(),
    email: z.string().min(1, { message: "Email has to be filled." }).max(50).email({ message: "Invalid email." }),
    password: z.string().min(1, { message: "Password has to be filled." }).max(50),
});

type Variant = 'LOGIN' | 'REGISTER';
type SocialType = 'github' | 'google' | 'instagram';  // 這邊是 for next-auth signIn 的 參數, 需注意大小寫, 不能自訂名稱

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const session = useSession();
    const router = useRouter();

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        };
        form.reset();
    }, [variant]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        // sanitize, XSS 攻擊防範
        const sanitizedData = {
            email: DOMPurify.sanitize(data.email),
            password: DOMPurify.sanitize(data.password),
        };

        setIsLoading(true);

        if (variant === "REGISTER") {
            const registerData = data.username && {
                username: DOMPurify.sanitize(data.username),
                ...sanitizedData
            }
            // Axios Register
            axios.post('api/register', registerData)
                .then(() => {
                    signIn("crendentials", data);
                })
                .catch((err) => {
                    console.log("err", err)
                    // toast.error("Someting went wrong!");
                    toast.error(err.response.data);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        if (variant === "LOGIN") {
            // NextAuth Login
            signIn('credentials', {
                ...sanitizedData,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid credentials");
                    };
                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in!");

                        console.log("vercel deploy login check")
                        // router.refresh();
                        // router.push("/");
                    }
                })
                .catch((err) => {
                    console.log("err", err);

                })
                .finally(() => {
                    setIsLoading(false);
                })
        };

    };

    const socialAction = (action: SocialType) => {
        setIsLoading(true);

        // NextAuth Social Sign In
        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid Credentials');
                };

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in');
                };
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        console.log("session", session);

        if (session?.status === "authenticated") {
            console.log("Auth good !!!");
            router.refresh();
            router.push("/");
        };
    }, [session?.status]);

    // h2 text-gray-900 bg-white
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <UtensilsCrossed size={48} className="mx-auto w-auto" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-wide word-spacing-wider text-light-1">
                    {variant === "LOGIN" ? "Log in to your account" : "Register your account"}
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-dark-2 px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    {/* shadcn/ui的Form是封裝react-hook-form的FormProvider, 而非radix ui的form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {
                                variant === "REGISTER" && (
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input className="text-black" suffixIcon={<UserIcon />} placeholder="username" disabled={isLoading} {...field} />
                                                </FormControl>
                                                {/* <FormDescription>
                                                    This is your public display name.
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className="text-black" suffixIcon={<MailIcon />} placeholder="email" disabled={isLoading} {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is your public display email.
                                            </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput className="text-black" placeholder="password" disabled={isLoading} {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is your password.
                                            </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} className="bg-light-4 hover:bg-light-3 w-full py-4">
                                {variant === "LOGIN" ? "Log in" : "Register"}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6">
                        {/* 分隔區 */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                {/* 線 */}
                                <div className="w-full border-t border-light-2" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-dark-2 px-2 text-light-1">
                                    OR
                                </span>
                            </div>
                        </div>

                        {/* 第三方登入 */}
                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => socialAction('github')}
                            />
                            <AuthSocialButton
                                icon={BsGoogle}
                                onClick={() => socialAction('google')}
                            />
                            <AuthSocialButton
                                icon={BsInstagram}
                                onClick={() => socialAction('instagram')}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center text-sm text-light-1 mt-6 px-2">
                        <div>
                            {variant === "LOGIN" ? "New to NCKU Eater？" : "Already have an account？"}
                        </div>
                        <div
                            className="underline cursor-pointer"
                            onClick={toggleVariant}
                        >
                            {variant === "LOGIN" ? "Create an account" : "Login"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
