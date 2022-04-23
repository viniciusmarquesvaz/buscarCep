import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

const App = () => {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const handleSearch = async () => {
    // 01310930/json/
    if (input === "") {
      alert("Preencha algum Cep!");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops erro ao buscar, tente novamente");
      setInput("");
    }
  };

  return (
    <div className="Container">
      <h1 className="Title">Buscador de CEP</h1>
      <div className="ContainerInput">
        <input
          type="text"
          placeholder="Informe o seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttomSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#ffff" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
};

export default App;
