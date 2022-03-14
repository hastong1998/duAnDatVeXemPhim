import "./App.css";
import { createBrowserHistory } from "history";

import { Route, Router, Switch } from "react-router-dom";

import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import "antd/dist/antd.css";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { lazy, Suspense } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import Showtime from "./pages/Admin/Films/Showtime/Showtime";
import EditUser from "./pages/Admin/Dashboard/EditUser/EditUser";
import AddUser from "./pages/Admin/Dashboard/AddUser/AddUser";
import { notification } from "antd";

const CheckoutTemplateLazy = lazy(() =>
  import("./templates/CheckoutTemplate/CheckoutTemplate")
);
export const openNotificationWithIcon = (type, title, content) => {
  notification[type]({
    message: title,
    description: content,
  });
};
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/contact" exact Component={Contact}></HomeTemplate>
        <HomeTemplate path="/news" exact Component={News}></HomeTemplate>
        <HomeTemplate path={"/profile"} exact Component={Profile} />

        <CheckoutTemplate
          path="/checkout/:id"
          exact
          Component={Checkout}
        ></CheckoutTemplate>

        <Route path={"/register"} exact component={Register} />
        <UserTemplate path={"/login"} exact Component={Login} />

        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/adduser" exact Component={AddUser} />
        <AdminTemplate
          path="/admin/edituser/:taikhoan"
          exact
          Component={EditUser}
        />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate
          path="/admin/films/showtime/:id/:tenPhim"
          exact
          Component={Showtime}
        />
        <HomeTemplate path="/" exact Component={Home}></HomeTemplate>
      </Switch>
    </Router>
  );
}

export default App;
