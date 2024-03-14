import { A, AnchorProps } from "@solidjs/router";

export default function ManageLobbyAnchor(props: AnchorProps) {
    return <A {...props} end={true} activeClass="text-green-300" class="mx-2 hover:text-green-300" replace={true} />;
}
