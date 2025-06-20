import React, { useState, useEffect } from 'react';
import supabase from "./supabaseClient";

export default function AddClientPanel() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sessionTypeId, setSessionTypeId] = useState('');
  const [startingAmount, setStartingAmount] = useState('');
  const [partnerFirst, setPartnerFirst] = useState('');
  const [partnerLast, setPartnerLast] = useState('');
  const [sessionTypes, setSessionTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSessionTypes = async () => {
      const { data, error } = await supabase.from('session_types').select('*');
      if (!error) setSessionTypes(data);
    };
    fetchSessionTypes();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Insert main client
  const { error: mainError } = await supabase.from('clients').insert({
    first_name: firstName,
    last_name: lastName,
    session_type_id: sessionTypeId,
    remaining_sessions: parseInt(startingAmount),
  });

  // If it's a partnered session, insert partner too
  let partnerError = null;
  if (sessionTypeId === '2' && partnerFirst && partnerLast) {
    const { error } = await supabase.from('clients').insert({
      first_name: partnerFirst,
      last_name: partnerLast,
      session_type_id: sessionTypeId,
      remaining_sessions: parseInt(startingAmount),
    });
    partnerError = error;
  }

  if (!mainError && !partnerError) {
    alert('Client(s) added successfully!');
    setFirstName('');
    setLastName('');
    setStartingAmount('');
    setPartnerFirst('');
    setPartnerLast('');
    setSessionTypeId('');
  } else {
    console.error('Main Error:', mainError);
    console.error('Partner Error:', partnerError);
    alert('Error saving client(s)');
  }

  setLoading(false);
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Add New Client</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <select
        value={sessionTypeId}
        onChange={(e) => setSessionTypeId(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Session Type</option>
        {sessionTypes.map((type) => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </select>
      {sessionTypes.find(t => t.name === 'Partnered')?.id === sessionTypeId && (
  <>
    <div>
      <label className="block font-medium">Partner First Name</label>
      <input
        type="text"
        value={partnerFirst}
        onChange={(e) => setPartnerFirst(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        placeholder="Partner First Name"
      />
    </div>
    <div>
      <label className="block font-medium">Partner Last Name</label>
      <input
        type="text"
        value={partnerLast}
        onChange={(e) => setPartnerLast(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        placeholder="Partner Last Name"
      />
    </div>
  </>
)}
      <input
        type="number"
        placeholder="Starting Package Session Amount"
        value={startingAmount}
        onChange={(e) => setStartingAmount(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      {sessionTypeId === '2' && (
        <>
          <input
            type="text"
            placeholder="Partner First Name"
            value={partnerFirst}
            onChange={(e) => setPartnerFirst(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Partner Last Name"
            value={partnerLast}
            onChange={(e) => setPartnerLast(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Adding...' : 'Add Client'}
      </button>
    </form>
  );
}
