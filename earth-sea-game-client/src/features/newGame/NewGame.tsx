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
            <h1 class='text-8xl text-black'>Start New Game</h1>
            <form.Provider>
                <form 
                    class='flex flex-col w-1/2 text-xl font-bold'
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}
                >
                    <div>
                        <form.Field
                            name="lobbyName"
                            children={(field) => (
                                <input
                                    name={field().name}
                                    value={field().state.value}
                                    onBlur={field().handleBlur}
                                    onInput={(e) => field().handleChange(e.target.value)}
                                    placeholder='Lobby Name'
                                />
                            )}
                        />
                    </div>
                    <button class='mt-4' type="submit">Submit</button>
                </form>
            </form.Provider>
        </div>
    )
}