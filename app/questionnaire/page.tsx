'use client';

import { useState } from 'react';

export default function QuestionnairePage() {
  const [address, setAddress] = useState('');
  const [sewerConnected, setSewerConnected] = useState('');
  const [hoa, setHoa] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ address, sewerConnected, hoa });
    alert('Submitted!');
  };

  const addressInput = (
    <label className="flex flex-col">
      <span className="mb-1 font-medium">Your Address</span>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border border-gray-300 rounded p-2"
        placeholder="123 Main St, Springfield, OR"
        required
      />
    </label>
  );

  const sewerInput = (
    <label className="flex flex-col">
      <span className="mb-1 font-medium">Are you connected to sewer?</span>
      <select
        value={sewerConnected}
        onChange={(e) => setSewerConnected(e.target.value)}
        className="border border-gray-300 rounded p-2"
        required
      >
        <option value="" disabled>Select one</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </label>
  );

  const hoaInput = (
    <label className="flex flex-col">
      <span className="mb-1 font-medium">Do you have an HOA?</span>
      <select
        value={hoa}
        onChange={(e) => setHoa(e.target.value)}
        className="border border-gray-300 rounded p-2"
        required
      >
        <option value="" disabled>Select one</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </label>
  );

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Property Questionnaire</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>{addressInput}</div>
        <div>{sewerInput}</div>
        <div>{hoaInput}</div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
