export default function Header({ onLogout }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">VoiceCoach Dashboard</h1>
                    <p className="text-gray-600 text-sm">Configure and manage your voice coaching sessions</p>
                </div>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md font-medium transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
