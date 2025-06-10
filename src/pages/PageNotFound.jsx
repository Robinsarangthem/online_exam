import { Link, useLocation } from 'react-router-dom';

const PageNotFound = () => {
    const location = useLocation();
    console.log(location); // Log the current path for debugging
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="text-4xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</h2>
                <p className="text-gray-600 mt-4 mb-8">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                    Return to Login
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;