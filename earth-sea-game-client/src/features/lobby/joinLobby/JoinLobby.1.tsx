import PageTitle from "@components/PageTitle";
import GameMasterField from "./GameMasterField";
import { createJoinLobbyForm } from "./JoinLobbyFormFactory";
import PickNationField from "./PickNationField";

export default function JoinLobby() {
    const form = createJoinLobbyForm();

    return (
        <div class="bg-aircraft bg-cover h-screen flex flex-col items-center">
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
                </form>
            </form.Provider>
        </div>
    );
}
