// shadcn/ui form document

"use client";

import Image from "next/image";
import { UtensilsCrossed } from 'lucide-react';

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

import { useCallback, useState } from "react";
import { BsGithub, BsGoogle, BsInstagram } from "react-icons/bs";

import DOMPurify from "isomorphic-dompurify";
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from "next-auth/react";

import AuthSocialButton from "./AuthSocialButton";

const formSchema = z.object({
    username: z.string().min(1, { message: "Username has to be filled." }).max(16, { message: "Username length must less than 16." }),
    email: z.string().min(1, { message: "Email has to be filled." }).max(50).email({ message: "Invalid email." }),
    password: z.string().min(1, { message: "Password has to be filled." }).max(50),
});

type Variant = 'LOGIN' | 'REGISTER';
type SocialType = 'Github' | 'Google' | 'Instagram';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
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
            username: DOMPurify.sanitize(data.username),
            email: DOMPurify.sanitize(data.email),
            password: DOMPurify.sanitize(data.password),
        };
        console.log("sanitizedData", sanitizedData);

        setIsLoading(true);

        if (variant === "REGISTER") {
            // Axios Register
            axios.post('api/register', sanitizedData)
                .then(() => {
                    signIn("crendentials", data);
                })
                .catch((err) => {
                    toast.error("Someting went wrong!");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        if (variant === "LOGIN") {
            // NextAuth Login
        };

    };

    const socialAction = (action: SocialType) => {
        setIsLoading(true);

        // NextAuth Social Sign In
    }

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <UtensilsCrossed size={48} className="mx-auto w-auto" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-wide word-spacing-wider text-gray-900">
                    {variant === "LOGIN" ? "Log in to your account" : "Register your account"}
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
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
                                                    <Input placeholder="username" disabled={isLoading} {...field} />
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
                                            <Input placeholder="email" disabled={isLoading} {...field} />
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
                                            <Input placeholder="password" disabled={isLoading} {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is your password.
                                            </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {variant === "LOGIN" ? "Log in" : "Register"}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6">
                        {/* 分隔區 */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                {/* 線 */}
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    OR
                                </span>
                            </div>
                        </div>

                        {/* 第三方登入 */}
                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => socialAction('Github')}
                            />
                            <AuthSocialButton
                                icon={BsGoogle}
                                onClick={() => socialAction('Google')}
                            />
                            <AuthSocialButton
                                icon={BsInstagram}
                                onClick={() => socialAction('Instagram')}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center text-sm text-gray-500 mt-6 px-2">
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
