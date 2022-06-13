import styled from "styled-components";
import RoutesComponent from "./routes/routes";
import {NavLink} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const OwnLink = styled(NavLink)`
  text-decoration: none;
  :visited {
    color: black;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  margin: 100px auto;
  justify-content: space-between;
  column-gap: 25px;
  box-shadow: 0 2px 17px 8px rgba(34, 60, 80, 0.21);
  padding: 20px;
  border-radius: 15px;
`;

function App() {
    return (
        <Wrapper>
            <Navigation>
                <OwnLink to="/">
                    Авторизация
                </OwnLink>
                <OwnLink to="/registration">
                    Регистарция
                </OwnLink>
                <OwnLink to="/changePass">
                    Смена пароля
                </OwnLink>
            </Navigation>
            <RoutesComponent/>
        </Wrapper>
    );
}

export default App;
