import { msalInstance } from "@lib/MsalConfig";
import { JSXElement, Show, Suspense, createResource } from "solid-js";

export default function MsalInitializer(props: { children: JSXElement }) {
    const [msal] = createResource(async () => {
        await msalInstance.initialize();
        return msalInstance;
    });

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Show when={msal()}>{props.children}</Show>
        </Suspense>
    );
}
