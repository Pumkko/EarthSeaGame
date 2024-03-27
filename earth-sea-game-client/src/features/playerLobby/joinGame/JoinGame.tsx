import PageTitle from "@components/PageTitle";
import GameMasterField from "./GameMasterField";
import { createJoinLobbyForm } from "./CreateJoinGameForm";
import PickNationField from "./PickNationField";
import InviteCodeField from "./InviteCodeField";
import { Show, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";

export default function JoinGame() {
    const { form } = createJoinLobbyForm();
    const { joinLobbyMutation } = useContext(PlayerLobbyContext)!;

    return (
        <div class="flex flex-col items-center">
            <PageTitle>Join Lobby</PageTitle>

            <form.Provider>
                <form
                    class="flex items items-center flex-col w-1/2 text-xl font-bold"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void form.handleSubmit();
                    }}
                >
                    <GameMasterField form={form} />
                    <PickNationField form={form} />
                    <InviteCodeField form={form} />
                    <button
                        class="text-black flex justify-center bg-opacity-75 bg-white py-2 px-8 mt-2 rounded border-2 border-white text-2xl w-1/2 hover:bg-opacity-100 duration-500"
                        type="submit"
                    >
                        <Show when={joinLobbyMutation.isPending}>
                            <svg
                                class="animate-spin ml-1 mr-3 h-7 w-7 text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </Show>
                        Submit
                    </button>
                </form>
            </form.Provider>
        </div>
    );
}
