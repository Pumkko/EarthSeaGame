import { createForm } from "@tanstack/solid-form";
import { createMutation } from "@tanstack/solid-query";
import { CreateLobbyInput } from "./CreateLobbyInput";
import { Show } from "solid-js";
import axios from "axios";

export default function NewGame() {
  const createLobby = createMutation(() => ({
    mutationFn: async (lobby: CreateLobbyInput) => {
      const targetUrl = new URL("GameLobby", import.meta.env.VITE_API_ROOT_URL);
      return axios.post(targetUrl.href, lobby);
    },
  }));

  const form = createForm(() => ({
    defaultValues: {
      lobbyName: "",
    } satisfies CreateLobbyInput,
    onSubmit: async ({ value }) => {
      return createLobby.mutateAsync(value);
    },
  }));

  return (
    <div class="h-screen flex flex-col items-center bg-redoutable_slbn bg-cover ">
      <h1 class="text-9xl text-black m-8">Start New Game</h1>
      <form.Provider>
        <form
          class="flex flex-col w-1/2 text-xl font-bold"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div class="flex justify-center">
            <form.Field
              name="lobbyName"
              children={(field) => (
                <input
                  class="rounded p-2 w-1/2 "
                  name={field().name}
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onInput={(e) => field().handleChange(e.target.value)}
                  placeholder="Lobby Name"
                />
              )}
            />
          </div>
          <button
            class="flex justify-center mt-4 w-1/2 py-2 self-center rounded bg-black text-white opacity-80 hover:opacity-100 duration-500"
            type="submit"
          >
            <Show when={createLobby.isPending}>
              <svg
                class="animate-spin ml-1 mr-3 h-7 w-7  text-white"
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
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </Show>
            Submit
          </button>
        </form>
      </form.Provider>
    </div>
  );
}
