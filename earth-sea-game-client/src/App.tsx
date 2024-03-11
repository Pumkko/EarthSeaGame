import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { For, createEffect, createSignal } from 'solid-js'

type SignalRMesssage = {
  name: string;
  message: string;
}


function App() {

  const [message, setMessage] = createSignal('');
  const [name, setName] = createSignal('');
  const [receivedMessage, setReceivedMessage] = createSignal<SignalRMesssage[]>([]);

  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7071/chat")
    .configureLogging(LogLevel.Debug)
    .build();


  var messageCallback = function (name: string, message: string) {
    if (!message) return;
    // Html encode display name and message.
    var encodedName = name;
    var encodedMsg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    setReceivedMessage((old) => [...old, {
      message: encodedMsg,
      name: encodedName
    }]);
  };
  // Create a function that the hub can call to broadcast messages.
  connection.on("broadcastMessage", messageCallback);
  connection.on("echo", messageCallback);



  createEffect(() => {
    try {
      connection.start();
    }
    catch (err) {
      console.log(err)
    }
  });


  return (
    <main>
      <div>Hello</div>
      <p>Name</p>
      <input type={'text'} value={name()} onchange={(e) => {
        setName(e.currentTarget.value);
      }} />
      <p>Message</p>
      <input type={'text'} value={message()} onchange={(e) => {
        setMessage(e.currentTarget.value);
      }} />
      <button style={{
         display: 'block',
         "margin-top": "10px",
         "margin-bottom": "10px"
      }} onclick={() => {
        connection.send("broadcastMessage", name(), message());
        setMessage("");
      }}>Send Message</button>

      <p>Messages Received:</p>
      <For each={receivedMessage()} fallback={<div>no message yet...</div>}>
        {
          (message) => <div>
            {message.name} - {message.message}
          </div>
        }
      </For>
    </main>
  )
}

export default App
