import { Accessor, JSXElement, createContext, createEffect, createMemo, useContext } from "solid-js";
import { fr } from "../i18n/fr/fr";

// I can get away with typeof fr because fr is typed through Language so are every language definition
// Again can't use the direct Language Type because it's not a i18n.BaseDict
const LanguageContext = createContext<Accessor<typeof fr>>();

export function LanguageProvider(props: { children: JSXElement }) {
    const dict = createMemo(() => {
        return fr;
    });

    createEffect(() => {
        document.title = fr.gameTitle();
    });

    return <LanguageContext.Provider value={dict}>{props.children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const language = useContext(LanguageContext)!;

    if (!language) {
        throw new Error("Language context was not initialized");
    }

    return language;
}
