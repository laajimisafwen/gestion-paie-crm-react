import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Signup from './Pages/Signup/Signup';
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Parametre from "./Pages/Parametre/Parametre";
import FicheEntreprise from "./Pages/FicheEntreprise/FicheEntreprise";
import Identification from "./Pages/Identification/Identification";
import Salaries from "./Pages/Salaries/Salaries";
import JournalDePaie from "./Pages/JournalDePaie/JournalDePaie";
import CalculeDePaie from "./Pages/CalculeDePaie/CalculeDePaie";
import EtatCNSS from "./Pages/EtatCNSS/EtatCNSS";
import VirementBancaire from "./Pages/VirementBancaire/VirementBancaire";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Utilisateurs from "./Pages/Utilisateurs/Utilisateurs";
import Abonnement from "./Pages/Abonnement/Abonnement";
import Historique from "./Pages/Historique/Historique";
import Conge from "./Pages/Conge/Conge";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={JSON.parse(localStorage.getItem('user')) ? <Home /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parametres" element={<Parametre />} />
          <Route path="/fiche-entreprise" element={<FicheEntreprise />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/salaries" element={<Salaries />} />
          <Route path="/journal-de-paie" element={<JournalDePaie />} />
          <Route path="/calcule-de-paie" element={<CalculeDePaie />} />
          <Route path="/etat-cnss" element={<EtatCNSS />} />
          <Route path="/virement" element={<VirementBancaire />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/abonnement" element={<Abonnement />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/conge" element={<Conge />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
