import { useCallback } from "react";
import * as React from "react";
import {
  useHistory,
  Link as RouterLink,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";

export enum routeEnum {
  FREE = "FREE",
  GUEST = "GUEST",
  AUTHED = "AUTHED",
}

export interface IRoute {
  path: string;
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<RouteComponentProps & any>;
  type: routeEnum;
}

export interface IRouteParams {
  home: undefined;
  homeUser: undefined;
}

const ROUTES: Record<keyof IRouteParams, IRoute> = {
  home: {
    path: "/",
    exact: true,
    component: () => <h1>Hello, stranger</h1>,
    type: routeEnum.GUEST,
  },
  homeUser: {
    path: "/",
    exact: true,
    component: () => <h1>Hello, user</h1>,
    type: routeEnum.AUTHED,
  },
};

const getPath = (route: IRoute, ...params: (string | number)[]) => {
  const wildCards = route.path.match(/(:[^\n/]+)/g) || [];
  if (wildCards.length < params.length) {
    throw new Error(
      `You have too many params for ${
        route.path
      }. Current params: ${params.join(",")}`
    );
  } else if (wildCards.length > params.length) {
    throw new Error(
      `You need to include enough param for ${
        route.path
      }. Current params: ${params.join(",")}`
    );
  }
  return wildCards.reduce(
    (acc, curr, i) => acc.replace(curr, params[i].toString()),
    route.path
  );
};

export const useNavigateTo = () => {
  const history = useHistory();
  return useCallback(
    (route: IRoute, ...params: (string | number)[]) => {
      const finalPath = getPath(route, ...params);
      return history.push(finalPath);
    },
    [history]
  );
};

export const useParams = <T,>() => {
  const { params } = useRouteMatch<T>();
  return params;
};

interface ILink {
  route: IRoute;
  params?: (string | number)[];
  children: React.ReactNode;
}

export const Link = (props: ILink) => {
  return (
    <RouterLink to={getPath(props.route, ...(props.params || []))}>
      {props.children}
    </RouterLink>
  );
};

export default ROUTES;
