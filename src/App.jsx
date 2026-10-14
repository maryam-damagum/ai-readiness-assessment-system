import { Routes, Route } from "react-router-dom";
import ModelPrediction from "./pages/ModelPrediction";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Recommendations from "./pages/Recommendations";


function App() {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/assessment" element={<Assessment />} />
       <Route path="/results" element={<Results />} />
       <Route path="/recommendations" element={<Recommendations />} />
      <Route
  path="/model-demo"
  element={<ModelPrediction />}
/>
     </Routes>
  );
}

export default App;
