import { FC } from "react";
import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Logo from "../../components/Logo/logo";
import ShipsContainer from "../../components/ships-container/ships-container";

const MainPage: FC = () => {
  return (
    <>
      <Header>
        <Logo />
        <Navigation />
      </Header>
      <ShipsContainer />
    </>
  );
};

export default MainPage;
