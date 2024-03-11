import { Input } from '~/components/ui/input'
import './NewGame.scss'
import { Label } from '~/components/ui/label'
import { createForm } from '@tanstack/solid-form'
import { Button } from '~/components/ui/button'

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
        <div class='new-game-container'>
            <h1 class='title'>Start New Game</h1>
            <form.Provider>
                <form 
                    class='new-game-form'
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
                                <Input
                                    name={field().name}
                                    value={field().state.value}
                                    onBlur={field().handleBlur}
                                    onInput={(e) => field().handleChange(e.target.value)}
                                    placeholder='Lobby Name'
                                />
                            )}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </form.Provider>
        </div>
    )
}