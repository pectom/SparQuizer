import {createContext, ReactNode, useContext, useState} from "react";

export interface MondalContextValues {
    title: string;
    setTitle: (title: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    body: string;
    setBody: (body: string) => void;
}

export const ModalContext = createContext<MondalContextValues | null>(null);

interface ModalContextProviderProps {
    children: ReactNode;
}

export const ModalContextProvider:
    React.FC<ModalContextProviderProps> = ({children}: ModalContextProviderProps) => {

    const [title, setTitle] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [body, setBody] = useState<string>("");

    return (
        <ModalContext.Provider
            value={{
                title,
                setTitle,
                open,
                setOpen,
                body,
                setBody,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export function useModalContext(): MondalContextValues {
    const context = useContext(ModalContext);

    if (!context) throw new Error("useModalContext have to be used within ModalContextProvider");

    return context;
}
