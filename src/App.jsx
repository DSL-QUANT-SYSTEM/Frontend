//페이지링크
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigator } from './layouts/navigator/Navigator';
import { Footer } from './layouts/footer/Footer';
import { Home } from './pages/main/home/Home';
import { Explain } from './pages/preview/explain/Explain';
import { Login } from './pages/info/login/Login';
import { MyPage } from './pages/info/myPage/MyPage';
import { Result } from './pages/main/result/Result';
import { StrategyMain } from './pages/main/strategy/StrategyMain';
import { StrategyGolden } from './pages/main/strategy/StrategyGolden';
import { StrategyBollinger } from './pages/main/strategy/StrategyBollinger';
import { StrategyRSI } from './pages/main/strategy/StrategyRSI';
import { StrategyEnv } from './pages/main/strategy/StrategyEnv';
import { StrategyWilliams } from './pages/main/strategy/StrategyWilliams';
import { StrategySelect } from './pages/main/strategy/StrategySelect';
import { StrategyMulti } from './pages/main/strategy/StrategyMulti';
import { StockList } from './pages/main/stockList/StockList';
import { StockInfo } from './pages/main/stockInfo/StockInfo';
import { LoginHandler } from './pages/info/login/LoginHandler';
import { AuthProvider } from './context/AuthContext';
import { StrategyProvider } from './context/StrategyContext';
import './app.css';
import './assets/fonts.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <StrategyProvider>
                        <Navigator />
                        <div className="container">
                            <Routes>
                                <Route path="/home/" element={<Home />} />
                                <Route path="/" element={<Explain />} />
                                <Route path="/login/" element={<Login />} />
                                <Route
                                    path="/login/oauth2/code/kakao/"
                                    element={<LoginHandler />}
                                />
                                <Route path="/stocklist/" element={<StockList />} />
                                <Route path="/stockinfo/" element={<StockInfo />} />
                                <Route path="/mypage/" element={<MyPage />} />
                                <Route path="/result/:id/" element={<Result />} />
                                <Route path="/strategy/" element={<StrategyMain />} />
                                <Route path="/strategy/golden/" element={<StrategyGolden />} />
                                <Route
                                    path="/strategy/bollinger/"
                                    element={<StrategyBollinger />}
                                />
                                <Route path="/strategy/rsi/" element={<StrategyRSI />} />
                                <Route path="/strategy/env/" element={<StrategyEnv />} />
                                <Route path="/strategy/williams/" element={<StrategyWilliams />} />
                                <Route
                                    path="/strategy/multi/:strategy1/:strategy2/"
                                    element={<StrategyMulti />}
                                />
                                <Route path="/strategy/select/" element={<StrategySelect />} />
                            </Routes>
                        </div>
                        <Footer />
                    </StrategyProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
