import { useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core";
import { Provider } from "inversify-react";
import BasePage, { ILink } from "./components/BasePage";
import ROUTES, { IRoute, routeEnum } from "./routes";
import { IUserContextValue, UserContextProvider } from "./contexts/UserContext";
import container from "./inversify.config";

function App() {
  function getLinks(text: string, route: IRoute) {
    return {
      text,
      link: route.path,
    };
  }

  const getRouteLinks = useCallback(
    (isAuthenticated: boolean): ILink[] => [
      ...(!isAuthenticated
        ? []
        : []),
      ...(isAuthenticated
        ? [
            getLinks("Home", ROUTES.homeUser),
          ]
        : []),
    ],
    []
  );

  const getRoutes = useCallback(
    (isAuthed: boolean) =>
      Object.values(ROUTES)
        .filter(
          (r) =>
            (r.type === routeEnum.GUEST && !isAuthed) ||
            (r.type === routeEnum.AUTHED && isAuthed) ||
            r.type === routeEnum.FREE
        )
        .map((route) => (
          <Route
            key={route.path}
            exact={!!route.exact}
            path={route.path}
            // eslint-disable-next-line react/jsx-no-bind
            render={(props) => {
              const Page = route.component;
              return <Page {...props} />;
            }}
          />
        )),
    []
  );

  const renderNotFound = useCallback(() => <h1>Not Found!</h1>, []);

  return (
    <BrowserRouter>
      <StylesProvider injectFirst={true}>
        <Provider container={container}>
          <UserContextProvider>
            {({ userData }: IUserContextValue) => {
              return (
                <BasePage topNavLinks={getRouteLinks(!!userData.token)}>
                  <Switch>
                    {getRoutes(!!userData.username)}
                    <Route component={renderNotFound} />
                  </Switch>
                </BasePage>
              );
            }}
          </UserContextProvider>
        </Provider>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;
