import {createBrowserRouter, Link, RouterProvider} from 'react-router';
import Home from './pages/Home';
import HeroDetails from './pages/HeroDetails';
import HeroFormPage from './pages/HeroFormPage';
import './index.css';
import './App.css';

const Header = () => (
    <nav className="w-full bg-slate-800 text-white p-4 shadow-md flex justify-between items-center mb-6">
        <Link to="/" className="text-xl font-bold tracking-widest">SUPERHEROES</Link>

            <Link to="/heroes/new" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-medium transition">Add New Hero</Link>

    </nav>
);

const router = createBrowserRouter([
    { path: "/", element: <><Header /><Home /></> },
    { path: "/heroes/:id", element: <><Header /><HeroDetails /></> },
    { path: "/heroes/new", element: <><Header /><HeroFormPage /></> },
        { path: "/heroes/edit/:id", element: <><Header /><HeroFormPage /></> },
]);

export default function App() {
    return (
        <div className="m-0 p-0 w-screen min-h-screen flex flex-col items-center">
            <RouterProvider router={router} />
        </div>
    );
}