import '../Style/Main.css';
import OnePost from '../Components/OnePost';
import defaultImage from '../defaultimage.jpg';

function App() {
  const postData3={title: "test1", content: "test1", image: defaultImage, category: "Animals"};
  return (
    <div>
      <OnePost postData={postData3}/>
      <OnePost postData={{title: "test2", content: "test2", image: defaultImage, category: "Art"}}  />
      <OnePost postData={{title: "test3", content: "test3", image: defaultImage, category: "Ai"}}  />
      <OnePost postData={{title: "test4", content: "test3", image: defaultImage, category: "Ai"}}  />
      <OnePost postData={{title: "test5", content: "test3", image: defaultImage, category: "Ai"}}  />
      <OnePost postData={{title: "test6", content: "test3", image: defaultImage, category: "Ai"}}  />
      <OnePost postData={{title: "test7", content: "test3", image: defaultImage, category: "Ai"}}  />
      <OnePost postData={{title: "test8", content: "test3", image: defaultImage, category: "Ai"}}  />
      <OnePost postData={{title: "test9", content: "test3", image: defaultImage, category: "Ai"}}  />
      </div>
  );
}

export default App;
