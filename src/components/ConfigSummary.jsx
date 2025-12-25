export default function ConfigSummary({ config, selectedPersonality, selectedScenario }) {
    if (!config) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Configuration Summary
            </h3>
            <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                    <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Personality</p>
                    <p className="text-gray-900 text-sm">{config.personalities[selectedPersonality]?.description}</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                    <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Scenario</p>
                    <p className="text-gray-900 text-sm">{config.scenarios[selectedScenario]?.context || config.scenarios[selectedScenario]?.description}</p>
                </div>
            </div>
        </div>
    );
}
