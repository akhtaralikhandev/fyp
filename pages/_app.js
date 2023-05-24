import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "../redux/app/store";
import { useState } from "react";
import { persistor } from "../redux/app/store";
import { NavbarContext } from "../components/coordinator/navbarContext";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [render, setRender] = useState("All Projects");
  const [id, setId] = useState("");
  const [viewMore, setViewMore] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [createPanel, setCreatePanel] = useState(false);
  const [addEmpEmail, setAddEmpEmail] = useState("");
  const [addProjectId, setAddProjectId] = useState("");
  const [projectId, setProjectId] = useState("");
  // for the creation of presentation coordinator section
  const [presentationVenue, setPresentationVenue] = useState("");
  const [presentationProjectId, setPresentationProjectId] = useState("");
  const [editPresentationId, setEditPresentationId] = useState("");
  const [viewMorePresentationId, setViewMorePresentationId] = useState("");
  const [viewMorePresentationLoading, setViewMorePresentationLoading] =
    useState(false);
  // for presentation list
  const [list, setList] = useState([]);
  return (
    <NavbarContext.Provider
      value={{
        setViewMorePresentationLoading,
        viewMorePresentationLoading,
        viewMorePresentationId,
        setViewMorePresentationId,
        //for editing presentation by coordinator
        editPresentationId,
        setEditPresentationId,
        presentationVenue,
        setPresentationVenue,
        presentationProjectId,
        setPresentationProjectId,
        addEmpEmail,
        setAddEmpEmail,
        render,
        setRender,
        id,
        setId,
        viewMore,
        setViewMore,
        addEmployee,
        setAddEmployee,
        addEmployee,
        setAddProject,
        addProject,
        createPanel,
        setCreatePanel,
        addProjectId,
        setAddProjectId,
        projectId,
        setProjectId,
        list,
        setList,
      }}
    >
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>{" "}
    </NavbarContext.Provider>
  );
}
