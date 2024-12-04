import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Paint from './pages/paint/Paint';
import { Header } from './components/header';
import { Footer } from './components/footer';
import Layout from './components/Layout/Layout';

function App() {
 return (
 <BrowserRouter>
 <Layout>
 <Header />
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/about" element={<About />} />
 <Route path="/paint" element={<Paint />} />
 </Routes>
 <Footer />
 </Layout>
 </BrowserRouter>
 );
}
export default App;
