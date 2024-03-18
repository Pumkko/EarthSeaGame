import { ComponentProps } from "solid-js";

export default function PageTitle(props: ComponentProps<"h1">) {
    return <h1 {...props} class="text-9xl text-white" />;
}
