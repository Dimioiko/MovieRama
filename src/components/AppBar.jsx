import styled from "styled-components";

export default function AppBar({ setKeyword }) {
  const handleChange = (e) => {
    setKeyword(e.target.value);
    setTimeout(() => {}, 500);
  };

  return (
    <HeaderContent>
      <h1>MovieRama</h1>
      <input placeholder='Search for a movie' onChange={handleChange} />
    </HeaderContent>
  );
}

const HeaderContent = styled.div`
  position: fixed;
  top: 0;
  background-color: #020202;
  z-index: 100;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
