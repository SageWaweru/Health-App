{/* <h1>
Mental Health Section: This will house journaling and other reflective tools:
Journal Entry Page: For users to create and view past entries.
Counselor Connection: Page to request a session or find a counselor.
</h1> */}

import  { useState, useEffect } from 'react';

const moods = ["Happy 😊", "Sad 😢", "Anxious 😟", "Calm 😌"];

const MentalHealth = () => {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [journalEntry, setJournalEntry] = useState('');
  const [journalHistory, setJournalHistory] = useState([]);

  // Load mood and journal histories from localStorage on component mount
  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const savedJournals = JSON.parse(localStorage.getItem('journalHistory')) || [];
    setMoodHistory(savedMoods);
    setJournalHistory(savedJournals);
  }, []);

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    const newMood = { mood, note, date: new Date().toLocaleString() };
    const updatedMoodHistory = [newMood, ...moodHistory];

    setMoodHistory(updatedMoodHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));
    setMood('');
    setNote('');
  };

  const handleJournalSubmit = (e) => {
    e.preventDefault();
    const newJournal = { entry: journalEntry, date: new Date().toLocaleString() };
    const updatedJournalHistory = [newJournal, ...journalHistory];

    setJournalHistory(updatedJournalHistory);
    localStorage.setItem('journalHistory', JSON.stringify(updatedJournalHistory));
    setJournalEntry('');
  };

  return (
    <div style={{ width: '80vw', maxWidth: '80vw' }} className="">
     <div className='font-sans'>
      <h2 className="text-3xl  text-center mb-10 font-semibold border-b-2 border-b-green-500">MOOD TRACKER</h2>

      {/* Mood Logging Form */}
      <form onSubmit={handleMoodSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-lg text-left font-medium">How are you feeling today?</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border rounded-lg bg-green-300 hover:bg-green-500"
            required
          >
            <option value="" >Select Mood</option>
            {moods.map((moodOption) => (
              <option key={moodOption} value={moodOption}>
                {moodOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-lg text-left font-medium">Description (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe your mood..."
            className="w-full p-2 border rounded-lg bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
        >
          Log Mood
        </button>
      </form>

      {/* Mood History */}
      <h3 className="text-xl font-semibold mt-6 mb-3 text-left">Mood History</h3>
      <ul className="space-y-4">
        {moodHistory.map((entry, index) => (
          <li
            key={index}
            className="p-4 bg-white border rounded-lg shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">{entry.mood}</span>
              <span className="text-xs text-gray-500">{entry.date}</span>
            </div>
            {entry.note && <p className="text-sm text-gray-700 text-left">{entry.note}</p>}
          </li>
        ))}
      </ul>

      {/* Journal Entry Form */}
      <h3 className="text-xl font-semibold mt-6 mb-3 text-left">My Daily Journal</h3>
      <form onSubmit={handleJournalSubmit} className="space-y-4">
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Write about your emotions..."
          className="w-full p-2 border rounded-lg bg-white"
          rows="4"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-500 font-bold text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Save Journal Entry
        </button>
      </form>

      {/* Journal History */}
      <h3 className="text-xl font-semibold mt-6 mb-3">Journal History</h3>
      <ul className="space-y-4">
        {journalHistory.map((entry, index) => (
          <li
            key={index}
            className="p-4 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">{entry.date}</span>
            </div>
            <p className="text-sm text-gray-700 text-left">{entry.entry}</p>
          </li>
        ))}
      </ul>
     </div> 
    </div>
  );
};

export default MentalHealth;