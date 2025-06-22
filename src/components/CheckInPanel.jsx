import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const CheckInPanel = () => {
  const [clients, setClients] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [sessionTypes, setSessionTypes] = useState([]);

  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedClientName, setSelectedClientName] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedSessionType, setSelectedSessionType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: clientData } = await supabase.from('clients').select('*');
      const { data: trainerData } = await supabase.from('trainers').select('*');
      const { data: sessionData } = await supabase.from('session_types').select('*');

      if (clientData) setClients(clientData);
      if (trainerData) setTrainers(trainerData);
      if (sessionData) setSessionTypes(sessionData);
    };

    fetchData();
  }, []);

  const filteredClients = clients.filter((client) =>
    `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckInSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClientId || !selectedTrainer || !selectedSessionType) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    const { error } = await supabase.from('check_ins').insert([
      {
        client_id: selectedClientId,
        trainer_id: selectedTrainer,
        session_type_id: selectedSessionType,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Check-in error:', error);
      alert('Error recording check-in. Please try again.');
      return;
    }

    const { error: updateError } = await supabase.rpc('decrement_session', {
      client_id_input: selectedClientId,
    });

    if (updateError) {
      console.error('Failed to decrement session:', updateError);
      alert('Check-in saved, but failed to update sessions.');
      return;
    }

    alert(`✅ Check-in complete for ${selectedClientName}`);

    // Reset the form
    setSelectedClientId('');
    setSelectedClientName('');
    setSelectedTrainer('');
    setSelectedSessionType('');
    setSearchTerm('');
  };

  return (
    <form
      onSubmit={handleCheckInSubmit}
      className="space-y-4 mt-4 bg-white p-4 rounded shadow max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold">
        {selectedClientName ? `Check-In for ${selectedClientName}` : 'Check-In'}
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
          value={selectedClientId}
          onChange={(e) => {
            const clientId = e.target.value;
            const client = clients.find((c) => c.id === clientId);
            setSelectedClientId(clientId);
            setSelectedClientName(client ? `${client.first_name} ${client.last_name}` : '');
          }}
          className="w-full border p-2 rounded"
        >
          <option value="">Select a client</option>
          {filteredClients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.first_name} {client.last_name}
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
          <option value="">Select Trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Session Type</label>
        <select
          value={selectedSessionType}
          onChange={(e) => setSelectedSessionType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Session Type</option>
          {sessionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Check-In
      </button>
    </form>
  );
};

export default CheckInPanel;
