import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('checkin');
  const [search, setSearch] = useState('');
  const clients = ['Tom Brady', 'Serena Williams', 'LeBron James'];

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  const handleCheckInSubmit = async (e) => {
  e.preventDefault();
  if (!selectedClient || !selectedTrainer || !selectedSessionType) return;

  try {
    const { error } = await supabase.from('check_ins').insert([
      {
        client_id: selectedClient.id,
        trainer_id: selectedTrainer.id,
        session_type_id: selectedSessionType.id,
        date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error adding check-in:', error.message);
      alert('Error saving check-in');
    } else {
      alert('Check-in successful!');
      setSelectedClient(null);
      setSelectedTrainer(null);
      setSelectedSessionType(null);
      setSearchTerm('');
      setFilteredClients([]);
      setShowCheckInForm(false);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('Something went wrong.');
  }
};



  const filteredClients = clients.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full">
        <img src="/method-logo.jpg" alt="The Method Logo" className="w-72 mx-auto mb-6" />
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setView('checkin')} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 shadow">
            Check-In
          </button>
          <button onClick={() => setView('add')} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 shadow">
            Add Client
          </button>
          <button onClick={() => setView('history')} className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 shadow">
            View History
          </button>
        </div>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="text-center text-gray-500">
      
 
 {view === 'checkin' && (
  <form onSubmit={handleCheckInSubmit} className="space-y-4 mt-4 bg-white p-4 rounded shadow max-w-md mx-auto">
    <h2 className="text-lg font-semibold">
      Check-In {selectedClient ? `for ${selectedClient}` : ''}
    </h2>

    <div>
      <label className="block font-medium">Client</label>
      <select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">Select a client</option>
        {clients.map((client, idx) => (
          <option key={idx} value={client}>{client}</option>
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
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
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

    

          {filteredClients.length > 0 ? (
            <ul className="text-left">
              {filteredClients.map((name, i) => (
                <li key={i} className="p-1 border-b">{name}</li>
              ))}
            </ul>
          ) : (
            <p>Check-in records and client list will appear here in future updates.</p>
          )}
        </div>
      </div>
    </div>
  );
}
"// redeploy trigger" 
