import { createForm } from '@tanstack/solid-form'

export default function NewGame() {

    const form = createForm(() => ({
        defaultValues: {
            lobbyName: '',
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value)
        },
    }))

    return (
        <div class='h-screen flex flex-col items-center bg-redoutable_slbn bg-cover '>
            <h1 class='text-9xl text-black m-8'>Start New Game</h1>
            <form.Provider>
                <form 
                    class='flex flex-col w-1/2 text-xl font-bold'
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}
                >
                    <div class='flex justify-center'>
                        <form.Field
                            name="lobbyName"
                            children={(field) => (
                                <input
                                    class='rounded p-2 w-1/2 '
                                    name={field().name}
                                    value={field().state.value}
                                    onBlur={field().handleBlur}
                                    onInput={(e) => field().handleChange(e.target.value)}
                                    placeholder='Lobby Name'
                                />
                            )}
                        />
                    </div>
                    <button class='mt-4 w-1/2 py-2 self-center rounded bg-black text-white opacity-80 hover:opacity-100 duration-500' type="submit">Submit</button>
                </form>
            </form.Provider>
        </div>
    )
}