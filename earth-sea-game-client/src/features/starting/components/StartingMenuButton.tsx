import { ComponentProps } from "solid-js";

export interface StartingMenuButtonProps extends ComponentProps<"button"> {}

export default function StartingMenuButton(props: StartingMenuButtonProps) {
    return (
        <button {...props} class="text-black bg-opacity-75 bg-white py-6 px-8 rounded border-2 border-white text-2xl w-80 hover:bg-opacity-100 duration-500" />
    );
}
