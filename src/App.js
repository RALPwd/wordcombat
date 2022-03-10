import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import ChatInput from "./components/chatTextInput";

function App() {
  return (
    <div className="App">
      <Input
        label="Nick o correo"
        type="text"
        placeholder="ingresa tu usuario"
        id="usuario"
      />
      <Input
        label="password"
        type="password"
        placeholder="ingresa tu contrasena"
        id="usuario"
      />
     <Button name="jugar solo" type="Button" />
     <ChatInput name='chat-input' id='ingreso-texto' />
    </div>
  );
}

export default App;
