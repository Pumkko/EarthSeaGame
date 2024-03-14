import { createForm } from "@tanstack/solid-form";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { For, Show } from "solid-js";
import axios from "axios";
import { QueryKeys } from "@lib/QueryKeys";

type CreateLobbyInput = {
  readonly lobbyName: string;
};

export default function CreateLobby() {
  const queryClient = useQueryClient();

  const createLobby = createMutation(() => ({
    mutationFn: async (lobby: CreateLobbyInput) => {
      const targetUrl = new URL("GameLobby", import.meta.env.VITE_API_ROOT_URL);
      return axios.post(targetUrl.href, lobby);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.lobby,
      });
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
    <div class="flex flex-col w-full items-center">
      <h2 class="text-white text-4xl">Could not find a Lobby - Create One !</h2>
      <form.Provider>
        <form
          class="flex flex-col items-center w-full text-xl font-bold"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="lobbyName"
            validators={{
              onChange: ({ value }) =>
                value === "" ? "Lobby name can not be empty" : undefined,
            }}
            children={(field) => (
              <>
                <input
                  class={`rounded p-2 w-1/2 border-2 ${field().state.meta.errors.length > 0 ? "border-red-600" : "border-black"}`}
                  name={field().name}
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onInput={(e) => field().handleChange(e.target.value)}
                  placeholder="Lobby Name"
                />

                <For each={field().state.meta.errors}>
                  {(error) => (
                    <em class="text-red-400" role="alert">
                      {error}
                    </em>
                  )}
                </For>
              </>
            )}
          />
          <button
            class="text-black flex justify-center bg-opacity-75 bg-white py-2 px-8 mt-2 rounded border-2 border-white text-2xl w-1/2 hover:bg-opacity-100 duration-500"
            type="submit"
          >
            <Show when={createLobby.isPending}>
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
