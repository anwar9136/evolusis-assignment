/**
 * Auth Component handles both Login and Signup forms.
 * It takes state and handlers as props to remain a "dumb" presentational component.
 */
export default function Auth({ isSignup, setIsSignup, name, setName, email, setEmail, password, setPassword, loading, error, setError, handleLogin, handleSignup }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8 border border-gray-200">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-lg mb-4">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        {isSignup ? "Create Account" : "Sign In"}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {isSignup ? "Enter your details to get started" : "Enter your credentials to continue"}
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {isSignup && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                        />
                    </div>

                    <button
                        onClick={isSignup ? handleSignup : handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                    >
                        {loading
                            ? isSignup
                                ? "Creating Account..."
                                : "Signing In..."
                            : isSignup
                                ? "Create Account"
                                : "Sign In"}
                    </button>

                    {error && (
                        <div className={`p-3 rounded-md text-sm border ${error.includes("successful")
                                ? "bg-green-50 text-green-800 border-green-200"
                                : "bg-red-50 text-red-800 border-red-200"
                            }`}>
                            {error}
                        </div>
                    )}
                </div>

                {/* Toggle Auth Mode */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError(null);
                            }}
                        >
                            {isSignup ? "Sign In" : "Create Account"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
