import React, { useState } from 'react';

// --- Interfaces ---
interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

// The component no longer needs props for db or userId
interface HealthMedicineProps {}

// --- SVG Icons ---
const TrashIcon = () => (
  <svg xmlns="http://www.w.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 hover:text-red-500 transition-colors">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

/**
 * A standalone front-end component to manage health, medicine, and chronic condition notes.
 * It manages its own state locally without a database.
 * @returns A JSX element for the health tracking section.
 */
const HealthMedicine: React.FC<HealthMedicineProps> = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '' });
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMed(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name.trim() || !newMed.dosage.trim()) {
      setError("Please fill in both 'Medicine Name' and 'Dosage'. The frequency is optional.");
      return;
    }
    setError(null);
    const newMedicine: Medicine = {
      id: crypto.randomUUID(),
      name: newMed.name.trim(),
      dosage: newMed.dosage.trim(),
      frequency: newMed.frequency.trim(),
    };
    setMedicines(prevMedicines => [...prevMedicines, newMedicine]);
    setNewMed({ name: '', dosage: '', frequency: '' });
  };

  const handleDeleteMedicine = (medId: string) => {
    setMedicines(prevMedicines => prevMedicines.filter(med => med.id !== medId));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
  };
  
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) {
      return; // Don't add empty notes
    }
    const noteToAdd: Note = {
      id: crypto.randomUUID(),
      text: newNote.trim(),
      timestamp: new Date().toLocaleString(),
    };
    setNotes(prevNotes => [noteToAdd, ...prevNotes]); // Add new notes to the top
    setNewNote('');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };


  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto divide-y divide-slate-200">
      {/* --- Medicine Section --- */}
      <div className="py-4">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Health & Medicine</h3>
        <form onSubmit={handleAddMedicine} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Medicine Name</label>
            <input type="text" id="name" name="name" value={newMed.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Paracetamol" />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="dosage" className="block text-sm font-medium text-slate-600 mb-1">Dosage</label>
            <input type="text" id="dosage" name="dosage" value={newMed.dosage} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 500mg" />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="frequency" className="block text-sm font-medium text-slate-600 mb-1">Frequency</label>
            <input type="text" id="frequency" name="frequency" value={newMed.frequency} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Twice a day" />
          </div>
          <button type="submit" className="w-full sm:w-auto sm:col-start-3 justify-self-end bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
            Add
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-3">
          {isLoading ? <p className="text-slate-500">Loading medicines...</p> : medicines.length > 0 ? (
            medicines.map(med => (
              <div key={med.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center transition-shadow hover:shadow-md">
                <div>
                  <p className="font-semibold text-slate-800">{med.name}</p>
                  <p className="text-sm text-slate-600">{med.dosage} - {med.frequency}</p>
                </div>
                <button onClick={() => handleDeleteMedicine(med.id)} aria-label="Delete medicine" className="p-2 rounded-full hover:bg-slate-200">
                  <TrashIcon />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 py-4">No medications added yet.</p>
          )}
        </div>
      </div>
      
      {/* --- Chronic Condition Notes Section --- */}
      <div className="py-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Chronic Condition Notes</h3>
        <p className="text-sm text-slate-600 mb-4">Use this space to jot down symptoms, triggers, or questions for your next doctor's visit.</p>
        <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-2 items-start">
            <textarea value={newNote} onChange={handleNoteChange} placeholder="e.g., Felt dizzy after skipping breakfast..." rows={2} className="flex-grow w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
            <button type="submit" className="w-full sm:w-auto bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105">
              Add Note
            </button>
        </form>
        <div className="space-y-3 mt-6">
           {notes.length > 0 ? (
             notes.map(note => (
               <div key={note.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-start transition-shadow hover:shadow-md">
                 <div>
                   <p className="text-slate-800 whitespace-pre-wrap">{note.text}</p>
                   <p className="text-xs text-slate-500 mt-2">{note.timestamp}</p>
                 </div>
                 <button onClick={() => handleDeleteNote(note.id)} aria-label="Delete note" className="p-2 rounded-full hover:bg-slate-200 flex-shrink-0">
                   <TrashIcon />
                 </button>
               </div>
             ))
           ) : (
             <p className="text-center text-slate-500 py-4">No notes added yet.</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default HealthMedicine;

