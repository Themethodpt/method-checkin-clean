import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('checkin');
  const [searchTerm, setSearchTerm] = useState('');
  const clients = ['Tom Brady', 'Serena Williams', 'LeBron James'];

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedSessionType, setSelectedSessionType] = useState('');

  const filteredClients = clients.filter((client) =>
    client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedTrainer || !selectedSessionType) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate a successful submission
    alert(`Check-in complete for ${selectedClient}`);
    setSelectedClient('');
    setSelectedTrainer('');
    setSelectedSessionType('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full">
        <img src="/method-logo.jpg" alt="The Method Logo" className="w-72 mx-auto mb-6" />
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setView('checkin')}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 shadow"
          >
            Check-In
          </button>
          <button
            onClick={() => setView('add')}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 shadow"
          >
            Add Client
          </button>
          <button
            onClick={() => setView('history')}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 shadow"
          >
            View History
          </button>
        </div>

        {view === 'checkin' && (
          <form
            onSubmit={handleCheckInSubmit}
            className="space-y-4 mt-4 bg-white p-4 rounded shadow max-w-md mx-auto"
          >
            <h2 className="text-lg font-semibold">
              Check-In {selectedClient ? `for ${selectedClient}` : ''}
            </h2>

            <div>
              <label className="block font-medium">Client</label>
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select a client</option>
                {filteredClients.map((client, idx) => (
                  <option key={idx} value={client}>
                    {client}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Trainer</label>
              <select
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select a trainer</option>
                <option value="1">Trainer A</option>
                <option value="2">Trainer B</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Session Type</label>
              <select
                value={selectedSessionType}
                onChange={(e) => setSelectedSessionType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select session type</option>
                <option value="1">Private</option>
                <option value="2">Partner</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Check-In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
