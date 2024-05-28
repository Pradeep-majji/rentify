import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AuthProvider from './context/AuthProvider';
import AuthProviderBuyer from './context/AuthProviderBuyer';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ProtectedRoute,ProtectedRouteBuyer } from './components/ProtectedRoute';
import Home from './pages/Home';
import BuyerFavourite from './pages/BuyerFavourite';
import BuyerFilter from './pages/BuyerFilter';
import BuyerHome from './pages/BuyerHome';
import BuyersLiked from './pages/BuyersLiked';

function App() {
  return (
    <AuthProvider>
		<AuthProviderBuyer>
			<BrowserRouter>
				<Routes>
					<Route path="/register" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<Home />} />
						<Route path="/buyersliked" element={<BuyersLiked />} />
					</Route>
					<Route element={<ProtectedRouteBuyer />}>
						<Route path="/buyerhome" element={<BuyerHome />} />
						<Route path="/buyerfilter" element={<BuyerFilter />} />
						<Route path="/buyerfavourite" element={<BuyerFavourite />} />
					</Route>			
				</Routes>
			</BrowserRouter>
		</AuthProviderBuyer>
	</AuthProvider>
  );
}

export default App;
