import * as React from "react";

import { Input } from "./input";

import { EyeIcon, EyeOffIcon } from 'lucide-react';

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <Input
                className={className}
                suffixIcon={showPassword ?
                    <EyeIcon className="select-none" onClick={() => setShowPassword(!showPassword)} /> :
                    <EyeOffIcon className="select-none" onClick={() => setShowPassword(!showPassword)} />
                }
                type={showPassword ? "text" : "password"}
                {...props}
                ref={ref}
            />
        )
    }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
