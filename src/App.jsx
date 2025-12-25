import { useState, useEffect } from "react";
import axios from "axios";

// Components
import Auth from "./components/Auth";
import Header from "./components/Header";
import ConfigPanel from "./components/ConfigPanel";
import ConfigSummary from "./components/ConfigSummary";
import WebSocketControls from "./components/WebSocketControls";
import LogConsole from "./components/LogConsole";

// Configuration
const API_BASE_URL = "https://voicecoach-1.onrender.com";
const WS_BASE_URL = "wss://voicecoach-1.onrender.com";

function App() {
    // --- STATE ---
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [config, setConfig] = useState(null);
    const [selectedPersonality, setSelectedPersonality] = useState(null);
    const [selectedScenario, setSelectedScenario] = useState(null);

    const [socket, setSocket] = useState(null);
    const [wsConnected, setWsConnected] = useState(false);
    const [logs, setLogs] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSignup, setIsSignup] = useState(false);

    // --- AUTH HANDLERS ---
    const handleLogin = async () => {
        if (!email || !password) return setError("Enter credentials");
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            const accessToken = res.data.access_token;
            localStorage.setItem("access_token", accessToken);
            setToken(accessToken);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        if (!name || !email || !password) return setError("Fill all fields");
        try {
            setLoading(true);
            setError(null);
            await axios.post(`${API_BASE_URL}/auth/signup`, { name, email, password });
            setIsSignup(false);
            setError("Signup successful! Please sign in.");
            setPassword("");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setConfig(null);
        if (socket) socket.close();
    };

    // --- CONFIG HANDLERS ---
    const fetchConfig = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/config`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            setConfig(data);

            // Auto-select first items
            setSelectedPersonality(Object.keys(data.personalities)[0]);
            setSelectedScenario(Object.keys(data.scenarios)[0]);
        } catch (err) {
            console.error("Config fetch error", err);
        }
    };

    // --- WEBSOCKET HANDLERS ---
    const connectWS = () => {
        if (!token || !config) return;
        const clientId = crypto.randomUUID();
        const ws = new WebSocket(`${WS_BASE_URL}/ws/${clientId}?token=${token}`);

        ws.onopen = () => {
            setLogs([]);
            setWsConnected(true);
            addLog({ type: "status", message: "Connected to voice coach" });
        };

        ws.onmessage = (e) => {
            try {
                addLog(JSON.parse(e.data));
            } catch {
                addLog({ type: "raw", data: e.data });
            }
        };

        ws.onclose = () => {
            setWsConnected(false);
            addLog({ type: "status", message: "Disconnected" });
            setSocket(null);
        };

        setSocket(ws);
    };

    const disconnectWS = () => {
        if (socket) socket.close();
    };

    const updateSessionConfig = () => {
        if (!socket || !wsConnected) return;
        const payload = {
            type: "change_config",
            personality: selectedPersonality,
            scenario: selectedScenario,
        };
        socket.send(JSON.stringify(payload));
        addLog({ type: "outbound", ...payload });
    };

    const addLog = (msg) => {
        setLogs((prev) => [...prev, JSON.stringify(msg, null, 2)]);
    };

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-gray-50">
            {!token ? (
                <Auth
                    isSignup={isSignup} setIsSignup={setIsSignup}
                    name={name} setName={setName}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    loading={loading} error={error} setError={setError}
                    handleLogin={handleLogin} handleSignup={handleSignup}
                />
            ) : (
                <div className="min-h-screen p-6">
                    <div className="max-w-6xl mx-auto">
                        <Header onLogout={handleLogout} />

                        {!config ? (
                            <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
                                <p className="text-gray-600 mb-4 text-sm">Load your configuration to begin</p>
                                <button
                                    onClick={fetchConfig}
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Load Configuration
                                </button>
                            </div>
                        ) : (
                            <>
                                <ConfigPanel
                                    config={config}
                                    selectedPersonality={selectedPersonality}
                                    setSelectedPersonality={setSelectedPersonality}
                                    selectedScenario={selectedScenario}
                                    setSelectedScenario={setSelectedScenario}
                                />

                                <ConfigSummary
                                    config={config}
                                    selectedPersonality={selectedPersonality}
                                    selectedScenario={selectedScenario}
                                />

                                <WebSocketControls
                                    wsConnected={wsConnected}
                                    onConnect={connectWS}
                                    onDisconnect={disconnectWS}
                                    onUpdateConfig={updateSessionConfig}
                                />

                                <LogConsole logs={logs} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
