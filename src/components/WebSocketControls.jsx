export default function WebSocketControls({ wsConnected, onConnect, onDisconnect, onUpdateConfig }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                WebSocket Connection
            </h3>

            <div className="flex flex-wrap gap-3 mb-4">
                {!wsConnected ? (
                    <button
                        onClick={onConnect}
                        className="px-5 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                        Connect
                    </button>
                ) : (
                    <button
                        onClick={onDisconnect}
                        className="px-5 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
                    >
                        Disconnect
                    </button>
                )}

                {wsConnected && (
                    <button
                        onClick={onUpdateConfig}
                        className="px-5 py-2 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors"
                    >
                        Update Config
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                <div className={`w-2.5 h-2.5 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-700">
                    Status: <span className="font-medium">{wsConnected ? "Connected" : "Disconnected"}</span>
                </span>
            </div>
        </div>
    );
}
