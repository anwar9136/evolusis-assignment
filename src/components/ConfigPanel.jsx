export default function ConfigPanel({ config, selectedPersonality, setSelectedPersonality, selectedScenario, setSelectedScenario }) {
    if (!config) return null;

    return (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Personality Selection */}
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Personality
                </label>
                <select
                    value={selectedPersonality || ""}
                    onChange={(e) => setSelectedPersonality(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    {Object.entries(config.personalities).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value.name || key}
                        </option>
                    ))}
                </select>
            </div>

            {/* Scenario Selection */}
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                    Scenario
                </label>
                <select
                    value={selectedScenario || ""}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    {Object.entries(config.scenarios).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value.name || value.title || key}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
