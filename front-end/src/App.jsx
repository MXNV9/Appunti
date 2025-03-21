import './App.css';
import { Navbar } from './Components/Navbars/Navbar';
import { ComponentsPage } from './Pages/ComponentsPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import { InsertPage } from './Pages/insertPage';
import { GetPage } from './Pages/GetPage';
import { DraggableCard, MyComponent, NewsArticlePage } from './Components/Prove/motionInertia';
import { AutocompleteSearchBar } from './Components/Prove/AutoComplete';
import { CardAxios } from './Components/Cards/Card-Axios';

function App() {
  return (
    <BrowserRouter>
      <Navbar link1="get" link2="post" link3="component" link4="prove" />
      <Routes>
        <Route path="/" element={'HomePage'} />
        <Route path="/component" element={<ComponentsPage />} />
        <Route path="/post" element={<InsertPage />} />
        <Route path="/get" element={<GetPage />} />
        <Route
          path="/prove"
          element={
            <div className="scroll-smooth">
              <MyComponent />
              <hr />
              <DraggableCard />
              <hr />
              <NewsArticlePage />
              <hr />
              <AutocompleteSearchBar />
              <hr />
              <CardAxios />
            </div>
          }
        />
        <Route path="*" element={'404'} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
