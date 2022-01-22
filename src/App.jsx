import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import SinglePage from "./pages/SinglePage/SinglePage";
import UserAction from "./pages/UserAction/UserAction";
import Write from "./pages/Write/Write";
import { ToastContainer } from "react-toastify";
import { Context } from "./context/Context";

const App = () => {
  const { user } = useContext(Context);
  console.log(user);
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/?login=true",
            }}
          />
        )
      }
    />
  );

  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
  return (
    <div className="App">
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <ProtectedRoute path="/settings" component={Settings} />
        <AdminRoute path="/user" component={UserAction} />
        <AdminRoute path="/write" component={Write} />
        <Route path="/post/:postId">
          <SinglePage />
        </Route>
      </Switch>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
