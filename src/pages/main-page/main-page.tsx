import { FC } from "react";
import Header from "../../components/header/header";
import Navigation from "../../components/navigation/navigation";
import Logo from "../../components/Logo/logo";
import ShipsContainer from "../../components/ships-container/ships-container";
import ErrorBoundary from "../../components/error-boundry/error-boundry";

const MainPage: FC = () => {
  return (
    <>
      <Header>
        <Logo />
        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
      </Header>
      <ErrorBoundary>
        <ShipsContainer />
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
