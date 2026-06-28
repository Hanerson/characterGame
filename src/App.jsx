import {Routes, Route, HashRouter} from 'react-router-dom';
import Home from './components/official/Home';
import { TexiusiBBS } from './components/Texiusi/TexiusiBBS';

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/dep" element={<TexiusiBBS />} />
            </Routes>
        </HashRouter>
    );
};

export default App;