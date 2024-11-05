{
  /* <h1>
Mental Health Section: This will house journaling and other reflective tools:
Journal Entry Page: For users to create and view past entries.
Counselor Connection: Page to request a session or find a counselor.
</h1> */
}


import { useState, useEffect } from "react";

const moods = ["Happy 😊", "Sad 😢", "Anxious 😟", "Calm 😌"];

const MentalHealth = () => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [journalEntry, setJournalEntry] = useState("");
  const [journalHistory, setJournalHistory] = useState([]);
  const [journalFiles, setJournalFiles] = useState([]); // Updated to handle multiple files
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editEntryText, setEditEntryText] = useState("");
  const [additionalFiles, setAdditionalFiles] = useState([]);

  
  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    const savedJournals =
      JSON.parse(localStorage.getItem("journalHistory")) || [];
    setMoodHistory(savedMoods);
    setJournalHistory(savedJournals);
  }, []);

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    const newMood = { mood, note, date: new Date().toLocaleString() };
    const updatedMoodHistory = [newMood, ...moodHistory];

    setMoodHistory(updatedMoodHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedMoodHistory));
    setMood("");
    setNote("");
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleJournalSubmit = async (e) => {
    e.preventDefault();

    
    const base64Files = await Promise.all(journalFiles.map(convertToBase64));
    
    
    const newJournal = {
      entry: journalEntry,
      date: new Date().toLocaleString(),
      files: base64Files, 
    };

    
    const updatedJournalHistory = [newJournal, ...journalHistory];

    setJournalHistory(updatedJournalHistory);
    localStorage.setItem("journalHistory", JSON.stringify(updatedJournalHistory));

    
    setJournalEntry("");
    setJournalFiles([]);
  };
  

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(files.map(convertToBase64));
  
    // Determine if files are being added to a new entry or an existing selected entry
    if (selectedEntry) {
      // Update files in the selected entry
      const updatedFiles = [...(selectedEntry.files || []), ...base64Files];
      const updatedSelectedEntry = { ...selectedEntry, files: updatedFiles };
      setSelectedEntry(updatedSelectedEntry);
  
      // Update the journal history with this modified entry
      const updatedJournalHistory = journalHistory.map((entry) =>
        entry.date === selectedEntry.date ? updatedSelectedEntry : entry
      );
      setJournalHistory(updatedJournalHistory);
      localStorage.setItem("journalHistory", JSON.stringify(updatedJournalHistory));
    } else {
      // If adding files for a new entry
      setJournalFiles([...journalFiles, ...files]);
    }
  };
  
  

  const saveAdditionalFiles = async () => {
    const base64Files = await Promise.all(additionalFiles.map(convertToBase64));
    const updatedJournalHistory = journalHistory.map((entry) =>
      entry === selectedEntry
        ? { ...entry, files: [...entry.files, ...base64Files] }
        : entry
    );
    
    setJournalHistory(updatedJournalHistory);
    localStorage.setItem("journalHistory", JSON.stringify(updatedJournalHistory));
    setAdditionalFiles([]);
  };

 
  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = selectedEntry.files.filter((_, idx) => idx !== fileIndex);
    const updatedSelectedEntry = { ...selectedEntry, files: updatedFiles };
    setSelectedEntry(updatedSelectedEntry);
  
    // Update `journalHistory` to reflect the removal
    const updatedJournalHistory = journalHistory.map((entry) =>
      entry.date === selectedEntry.date ? updatedSelectedEntry : entry
    );
    setJournalHistory(updatedJournalHistory);
    localStorage.setItem("journalHistory", JSON.stringify(updatedJournalHistory));
  };
  
  
  
  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setEditEntryText(entry.entry);
  };

  const handleBackClick = () => {
    setSelectedEntry(null);
    setEditEntryText("");
  };

  const handleDeleteEntry = (index) => {
    const updatedJournalHistory = journalHistory.filter((_, i) => i !== index);
    setJournalHistory(updatedJournalHistory);
    localStorage.setItem(
      "journalHistory",
      JSON.stringify(updatedJournalHistory)
    );
  };

  const handleDeleteMoodEntry = (index) => {
    const updatedMoodHistory = moodHistory.filter((_, i) => i !== index);
    setMoodHistory(updatedMoodHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedMoodHistory));
  };

  const handleEntryDoubleClick = () => {
    setEditEntryText(selectedEntry.entry);
    
  };
  
 
  const handleEntryChange = (e) => {
    setEditEntryText(e.target.value);
  };
  
 
  const handleSaveEditedEntry = () => {
    if (selectedEntry) {
      const updatedJournalHistory = journalHistory.map((entry) =>
        entry === selectedEntry ? { ...entry, entry: editEntryText } : entry
      );
      setJournalHistory(updatedJournalHistory);
      localStorage.setItem("journalHistory", JSON.stringify(updatedJournalHistory));
      setSelectedEntry({ ...selectedEntry, entry: editEntryText });
    }
  };

  return (
    <div style={{ width: "80vw", maxWidth: "80vw" }} className="">
      <div className="font-sans">
        <h2 className="text-3xl text-center mb-10 font-semibold border-b-2 border-b-green-500">
          MOOD TRACKER
        </h2>

        {/* Mood Logging Form */}
        <form onSubmit={handleMoodSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-lg text-left font-medium">
              How are you feeling today?
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full p-2 border rounded-lg bg-green-300 hover:bg-green-500"
              required
            >
              <option value="">Select Mood</option>
              {moods.map((moodOption) => (
                <option key={moodOption} value={moodOption}>
                  {moodOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-lg text-left font-medium">
              Description (optional)
            </label>
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
        <h3 className="text-xl font-semibold mt-6 mb-3 text-left">
          Mood History
        </h3>
        <ul className="space-y-4">
          {moodHistory.map((entry, index) => (
            <li
              key={index}
              className="p-4 bg-white border rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium">{entry.mood}</span>
                <span className="text-xs text-gray-500">{entry.date}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                {entry.note && (
                  <p className="text-sm text-gray-700 text-left">{entry.note}</p>
                )}
                <button
                  onClick={() => handleDeleteMoodEntry(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Journal Entry Form */}
        <h3 className="text-xl font-semibold mt-6 mb-3 text-left">
          My Daily Journal
        </h3>
        <form onSubmit={handleJournalSubmit} className="space-y-4">
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write about your emotions..."
            className="w-full p-2 border rounded-lg bg-white"
            rows="4"
            required
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            multiple 
            key={journalFiles ? journalFiles.name : "default"} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
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
        {!selectedEntry ? (
          <ul className="space-y-4">
            {journalHistory.map((entry, index) => (
              <li
                key={index}
                className="p-4 bg-white border rounded-lg shadow-sm flex items-start justify-between hover:bg-gray-200  "
                onDoubleClick={() => handleEntryClick(entry)} 
              >
                <div
                 
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 hover:font-bold">{entry.date}</span>
                  </div>
                
                  <p className="text-sm text-gray-700 text-left hover:font-bold">
                    {entry.entry.split(" ").slice(0, 5).join(" ")}...
                  </p>
      
                </div>
                
                <button
                  onClick={() => handleDeleteEntry(index)}
                  className="text-red-500 hover:text-red-900 ml-4 self-start p-1 hover:border-green-800"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <button
              onClick={handleBackClick}
              className="text-green-500 hover:text-green-700 mb-4"
            >
              &larr; Back to Journal History
            </button>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">
                {selectedEntry.date}
              </span>
            </div>
            
            <textarea
              value={editEntryText}
              onChange={handleEntryChange}
              onDoubleClick={handleEntryDoubleClick}
              onBlur={handleSaveEditedEntry}
              className="w-full p-2 border rounded-lg bg-white"
              rows="4"
              required
            />

            {/* Render each file */} 
            <div className="grid grid-cols-2 gap-8 mt-4">
            {selectedEntry.files && selectedEntry.files.map((file, idx) => (
              <div key={idx} className="relative ">
                {file.startsWith("data:image/") ? (
                  <img
                    src={file}
                    alt={`Journal Media ${idx}`}
                    className="rounded-lg border-2 border-green-400 w-full h-80 object-cover aspect-square"
                  />
                ) : (
                  <video
                    src={file}
                    controls
                    className="rounded-lg border-2 border-green-400 w-full h-80 object-cover aspect-square"
                  />
                )}
                <button onClick={() => handleRemoveFile(idx)} className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700">Remove</button>
              </div>
            ))}
            </div>
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} multiple className="block w-full text-sm mt-4" />
            <button onClick={saveAdditionalFiles} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg">Save Additional Files</button>
          </div>
        )}
      </div>
    </div> 
     
  );
};

export default MentalHealth;

