import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import App from '../../App';

const MemberList = lazy(() => import("../../page/member/MemberList"));
const Member = lazy(() => import("../../page/member/Member"));
const Animation = lazy(() => import('../../page/animation/Index'));
const Login = lazy(() => import('../../page/auth/Login'));
const SignUp = lazy(() => import('../../page/sign-up/SignUp'));
const Jwt = lazy(() => import('../../page/jwt/Index'));
const EmployeePagingView = lazy(() => import('../../page/employee/View'));
const Chat = lazy(() => import('../../page/chat/Index'));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "member",
    element: <MemberList />
  },
  {
    path: "member/:id",
    element: <Member />
  },
  {
    path: 'animation',
    element: <Animation />
  },
  {
    path: 'jwt',
    element: <Jwt />
  },
  {
    path: 'employees',
    element: <EmployeePagingView />
  },
  {
    path: 'chat',
    element: <Chat />
  }
];