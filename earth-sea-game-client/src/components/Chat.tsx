import { ChatMessageModel } from "@lib/schemas/MessageSchema";
import { For, createSignal } from "solid-js";
import ChatMessage from "./ChatMessage";
import { ChatContext } from "./ChatContext";

export default function Chat() {
    const [messages] = createSignal<ChatMessageModel[]>([
        {
            content: "Hello",
            date: new Date(),
            recipient: "Referee",
            sender: "EarthNation",
        },
        {
            content: "Hello Earth Nation",
            date: new Date(),
            recipient: "EarthNation",
            sender: "Referee",
        },
        {
            content: `I need my secret service to help me with something important you know like really really important because you know i need to know,
                    I already know a lot but i need to know about what's going on, things should not be what they are.  
                    You see things and then you must ask yourself. Is everything okay and I don't think eveything's okay. 
                    Not everything is okay and we must do something we will do something.
                    You know this app used to be a great you remember ? I remember when this was a great app,
                    But don't worry we'll make it great again
                    The crooked justices, the dems, the witch hunters they will get what's coming to them
                    And now as I am writing those lines i keep asking myself if we've not reached it, the low of the low
                    we have people like hanouna, zemmour and the likes and i don't get how these people are successfull
                    how is it possible that someone can still think he's worth a damn when his "historical" knowledge has been rebuked by countless historians
                    many times over. it's beyond me.
                    I need my secret service to help me with something important you know like really really important because you know i need to know,
                    I already know a lot but i need to know about what's going on, things should not be what they are.  
                    You see things and then you must ask yourself. Is everything okay and I don't think eveything's okay. 
                    Not everything is okay and we must do something we will do something.
                    You know this app used to be a great you remember ? I remember when this was a great app,
                    But don't worry we'll make it great again
                    The crooked justices, the dems, the witch hunters they will get what's coming to them
                    And now as I am writing those lines i keep asking myself if we've not reached it, the low of the low
                    we have people like hanouna, zemmour and the likes and i don't get how these people are successfull
                    how is it possible that someone can still think he's worth a damn when his "historical" knowledge has been rebuked by countless historians
                    many times over. it's beyond me.`,
            date: new Date(2021, 0, 6),
            recipient: "Referee",
            sender: "SeaNation",
        },
        {
            content: `I need my secret service to help me with something important you know like really really important because you know i need to know,
                    I already know a lot but i need to know about what's going on, things should not be what they are.  
                    You see things and then you must ask yourself. Is everything okay and I don't think eveything's okay. 
                    Not everything is okay and we must do something we will do something.
                    You know this app used to be a great you remember ? I remember when this was a great app,
                    But don't worry we'll make it great again
                    The crooked justices, the dems, the witch hunters they will get what's coming to them
                    And now as I am writing those lines i keep asking myself if we've not reached it, the low of the low
                    we have people like hanouna, zemmour and the likes and i don't get how these people are successfull
                    how is it possible that someone can still think he's worth a damn when his "historical" knowledge has been rebuked by countless historians
                    many times over. it's beyond me.
                    I need my secret service to help me with something important you know like really really important because you know i need to know,
                    I already know a lot but i need to know about what's going on, things should not be what they are.  
                    You see things and then you must ask yourself. Is everything okay and I don't think eveything's okay. 
                    Not everything is okay and we must do something we will do something.
                    You know this app used to be a great you remember ? I remember when this was a great app,
                    But don't worry we'll make it great again
                    The crooked justices, the dems, the witch hunters they will get what's coming to them
                    And now as I am writing those lines i keep asking myself if we've not reached it, the low of the low
                    we have people like hanouna, zemmour and the likes and i don't get how these people are successfull
                    how is it possible that someone can still think he's worth a damn when his "historical" knowledge has been rebuked by countless historians
                    many times over. it's beyond me.`,
            date: new Date(2021, 0, 6),
            recipient: "EarthNation",
            sender: "Referee",
        },
    ]);

    return (
        <div class="flex flex-col overflow-auto">
            <h1>Earth Nation</h1>
            <ChatContext.Provider
                value={{
                    currentUser: "Referee",
                }}
            >
                <For each={messages()}>{(message) => <ChatMessage message={message} />}</For>
            </ChatContext.Provider>
            <input class="text-black border-2 border-black p-2" />
        </div>
    );
}
