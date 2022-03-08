import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import A from "./components/Ancla";
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
      <A content="Salir" href="" id="acncla1" />
    </div>
  );
}

export default App;
