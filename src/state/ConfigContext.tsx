import {createContext, ReactNode, useContext} from "react";
import config from "../config.json";

export interface ConfigContextValues {
    wrongAnswer: number,
    goodAnswer: number,
    timeout: number,
    hintCost: number,
    additionalHintCost: number,
    questionNumber: number,
    roundTime: number,
}

export const ConfigContext = createContext<ConfigContextValues | null>(null);

interface ConfigContextProviderProps {
    children: ReactNode;
}

export const ConfigContextProvider:
    React.FC<ConfigContextProviderProps> = ({children}: ConfigContextProviderProps) => {

    return (
        <ConfigContext.Provider
            value={config}
        >
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfigContext(): ConfigContextValues {
    const context = useContext(ConfigContext);

    if (!context) throw new Error("useConfigContext have to be used within ConfigContextProvider");

    return context;
}
