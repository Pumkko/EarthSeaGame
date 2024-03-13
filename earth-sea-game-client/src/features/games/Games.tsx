import { createQuery } from "@tanstack/solid-query";
import axios from "axios";

export default function Games() {


    const query = createQuery(() => ({
        queryKey: ['games'],
        queryFn: async () => {
            const targetUrl = new URL("GameLobby/my", import.meta.env.VITE_API_ROOT_URL);
            return axios.get(targetUrl.href).then(r => r.data)
        }
    }));



    return <div class="h-screen bg-rocket bg-cover bg-center">
        
    </div>

}