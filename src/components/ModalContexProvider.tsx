import {createContext, ReactNode, useContext, useState} from "react";
import {ModalModeKeys} from "./RoundModal";

export interface MondalContextValues {
    open: boolean;
    setOpen: (open: boolean) => void;
    mode: ModalModeKeys,
    setMode: (mode: ModalModeKeys) => void,
    points: number,
    setPoints: (points: number) => void,
    answer: string,
    setAnswer: (answer: string) => void
}

export const ModalContext = createContext<MondalContextValues | null>(null);

interface ModalContextProviderProps {
    children: ReactNode;
}

export const ModalContextProvider:
    React.FC<ModalContextProviderProps> = ({children}: ModalContextProviderProps) => {

    const [open, setOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<ModalModeKeys>("timeout");
    const [points, setPoints] = useState<number>(0);
    const [answer, setAnswer] = useState<string>("");

    return (
        <ModalContext.Provider
            value={{
                open,
                setOpen,
                mode,
                setMode,
                points,
                setPoints,
                answer,
                setAnswer,
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
