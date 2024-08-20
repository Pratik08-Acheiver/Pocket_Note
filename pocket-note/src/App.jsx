// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import GroupList from './components/GroupList';
import NotesPanel from './components/NotesPanel';
import './index.css';
import { useState } from 'react';

function App() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleSelectGroup = (groupId) => {
    console.log(groupId);
    setSelectedGroupId(groupId);
  };

  return (
    <Router> {/* Wrap the entire app with Router */}
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200 p-4">
          <GroupList  onSelectGroup={handleSelectGroup}/>
        </div>
        <div className="w-3/4 p-4">
         <NotesPanel groupId={selectedGroupId} />
          {/* <Routes>
            <Route path="/" element={} />
            {/* Add more routes here if needed 
          </Routes> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
