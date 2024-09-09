"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from 'react';

type ModalType = 'Login' | 'Delete';

interface ModalProps {
    title: string;
    content: ReactNode[];
    icon: ReactNode;
    handleOk: () => void;
    modalType: ModalType;
    store?: string;
}


const Modal: React.FC<ModalProps> = ({ title, content, icon, handleOk, modalType }) => {

    return (
        <>
            <AlertDialogContent className="font-sans bg-dark-1">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                        {title}
                    </AlertDialogTitle>
                    {
                        content.map((item, i) => {
                            return (
                                <AlertDialogDescription key={`${item}${i}`} className="text-white">
                                    {item}
                                </AlertDialogDescription>
                            )
                        })
                    }
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleOk()}>
                        {icon}{modalType === "Delete" ? '刪除' : '登入'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}

export default Modal
