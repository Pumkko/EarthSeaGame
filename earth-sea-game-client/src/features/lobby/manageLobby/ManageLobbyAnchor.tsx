import { ComponentProps } from "solid-js";

export interface ManageLobbyAnchorProps extends ComponentProps<"a"> {
  isActive: boolean;
}

export default function ManageLobbyAnchor(props: ManageLobbyAnchorProps) {
  return (
    <li class="me-2">
      <a
        {...props}
        class={`${props.isActive ? "text-white" : "text-gray-400"} p-4 border-transparent rounded-t-lg hover:text-yellow-400 hover:border-gray-300 hover:cursor-pointer`}
      />
    </li>
  );
}
