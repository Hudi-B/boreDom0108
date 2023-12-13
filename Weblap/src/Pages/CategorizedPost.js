import '../Style/Main.css';
import { useParams } from "react-router-dom";


function App() {
  const param = useParams();
  const category = param.category;

  return (
    <div>{category}</div>
  );
}

export default App;
