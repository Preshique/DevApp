import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Repo from "./pages/Repo";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/repo/:id" element={<Repo />} />
          </Route>
          <Route path="/error-page" element={<Error />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
