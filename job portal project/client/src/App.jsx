import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Jobs from "./components/Jobs";
import Applications from "./components/Applications";
import Company from "./components/Company";
import Register from "./components/Register";
import MyApplications from "./components/MyApplications";

const App = () => {
  const [page, setPage] = useState("login");
  const [selectedJob, setSelectedJob] = useState("");
  const [user, setUser] = useState(null);

  return (
    <>
      {page === "login" && <Login setPage={setPage} setUser={setUser} />}

      {page === "register" && <Register setPage={setPage} setUser={setUser} />}

      {page === "dashboard" && <Dashboard setPage={setPage} />}

      {page === "jobs" && (
        <Jobs setPage={setPage} setSelectedJob={setSelectedJob} />
      )}

      {page === "applications" && (
        <Applications
          setPage={setPage}
          selectedJob={selectedJob}
          user={user}
        />
      )}

      {page === "myApplications" && (
        <MyApplications
          setPage={setPage}
          user={user}
        />
      )}

      {page === "company" && <Company setPage={setPage} />}


    </>
  );
};

export default App;
