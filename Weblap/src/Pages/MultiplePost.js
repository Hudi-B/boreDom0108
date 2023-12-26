import '../Style/Main.css';
import OnePost from '../Components/OnePost';
import defaultImage from '../defaultimage.jpg';


function App() {
  return (
    <div>
      <OnePost postData={{title: "test1", content: "test1", image: defaultImage, category: "Animals"}}  />
      <OnePost postData={{title: "test2", content: "test2", image: defaultImage, category: "Art"}}  />
      <OnePost postData={{title: "test3", content: "test3", image: defaultImage, category: "Ai"}}  />

      </div>
  );
}

export default App;
