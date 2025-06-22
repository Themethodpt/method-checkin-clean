import React, { useState } from 'react';
import AddClientPanel from './AddClientPanel';
import CheckInPanel from './components/CheckInPanel';




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
  <CheckInPanel />
)}

        {view === 'add' && (
  <AddClientPanel />
)}

      </div>
    </div>
  );
}
