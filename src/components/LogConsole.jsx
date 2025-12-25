export default function LogConsole({ logs }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Console Output
            </h3>
            <div className="bg-slate-900 rounded-md p-4 h-64 overflow-y-auto font-mono text-xs border border-gray-300">
                {logs.length === 0 ? (
                    <p className="text-gray-500">Waiting for messages...</p>
                ) : (
                    logs.map((log, index) => (
                        <pre key={index} className="text-green-400 mb-2 whitespace-pre-wrap">
                            {log}
                        </pre>
                    ))
                )}
            </div>
        </div>
    );
}
