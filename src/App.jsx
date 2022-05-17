import "./App.css";
import { useState } from "react";
import Movies from "./components/Movies";
import AppBar from "./components/AppBar";
import styled from "styled-components";

export default function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <Body>
      <AppBar setKeyword={setKeyword} />
      <Movies keyword={keyword} />
    </Body>
  );
}

const Body = styled.div`
  background-color: #090a0e;
  color: white;
  min-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`;
