import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGroups, createGroup, deleteGroup, updateGroup } from '../apis/Api'; // Import API functions
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons

function GroupList({ onSelectGroup }) {
  const [groups, setGroups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [deletingGroupId, setDeletingGroupId] = useState(null);
  const [newGroupId, setNewGroupId] = useState(null); // New state to track the newly created group
  const [editGroupId, setEditGroupId] = useState(null); // State to track the group being edited
  const [editName, setEditName] = useState(''); // State for the new name of the group
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchGroups().then(data => setGroups(data));
  }, []);

  useEffect(() => {
    if (newGroupId) {
      onSelectGroup(newGroupId); // Pass the newGroupId up to the parent component
      navigate(`/group/${newGroupId}`);
      setNewGroupId(null); // Reset after navigation
    }
  }, [newGroupId, navigate, onSelectGroup]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.popup') && !e.target.closest('.edit-group')) {
        if (editGroupId) {
          handleGroupNameUpdate(editGroupId);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [editGroupId, editName]);

  const handleCreateGroup = () => {
    setShowPopup(true);
  };

  const handleGroupSubmit = () => {
    createGroup({ name: newGroupName, color: selectedColor })
      .then((response) => {
        setNewGroupId(response.id); // Save the ID of the newly created group
        fetchGroups().then(data => setGroups(data));
        setShowPopup(false);
        setNewGroupName('');
        setSelectedColor('');
      })
      .catch(error => console.error('Error creating group:', error));

  };

  const handleGroupClick = (groupId) => {
    if (editGroupId === groupId) {
      return; // Prevent selection if in edit mode
    }
    onSelectGroup(groupId); // Pass the groupId up to the parent component
    navigate(`/group/${groupId}`);
   
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleDeleteClick = (groupId) => {
    setDeletingGroupId(groupId);
    if (window.confirm('Are you sure you want to delete this group?')) {
      deleteGroup(groupId)
        .then(() => {
          fetchGroups().then(data => setGroups(data));
          setDeletingGroupId(null);
        })
        .catch(error => console.error('Error deleting group:', error));
    }
  };

  const handleEditClick = (group) => {
    setEditGroupId(group.id);
    setEditName(group.name);
  };

  const handleGroupNameUpdate = (groupId) => {
    updateGroup(groupId, { name: editName })
      .then(() => {
        fetchGroups().then(data => setGroups(data));
        setEditGroupId(null);
        setEditName('');
      })
      .catch(error => console.error('Error updating group name:', error));
  };

  return (
    <div className="relative h-full">
      <header className="text-xl font-bold mb-4">Pocket Note</header>
      <div className="mb-12">
        {groups.map(group => (
          <div
            key={group.id}
            className="flex items-center p-2 mb-2 bg-white rounded shadow cursor-pointer"
          >
            <div
              onClick={() => handleGroupClick(group.id)}
              className="flex-1 flex items-center"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: group.color }}
              >
                
                {(group.name) != "" ? group.name[0].toUpperCase(): ""}
                {console.log(group.name)}
              </div>
              {editGroupId === group.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleGroupNameUpdate(group.id)}
                  className="ml-2 border p-1 rounded"
                  autoFocus
                />
              ) : (
                <span
                  className="ml-2"
                  onDoubleClick={() => handleEditClick(group)}
                >
                  {group.name}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering group selection
                handleDeleteClick(group.id);
              }}
              className="text-gray-500 hover:text-gray-700 bg-transparent border-none p-0 ml-2"
            >
              <FaTrash className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreateGroup}
        className="fixed bottom-4 left-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        +
      </button>
      {showPopup && (
        <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Create New Group</h2>
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Group Name"
            className="border p-2 rounded mb-2 w-full"
          />
          <div className="flex space-x-2 mb-2">
            {['#ffadad', '#a2c2e6', '#a5d6a7', '#e1bee7', '#f48fb1'].map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded-full cursor-pointer ${color === selectedColor ? 'border-2 border-black' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <button
            onClick={handleGroupSubmit}
            className="bg-blue-500 text-white p-2 rounded w-full"
            disabled={!newGroupName || !selectedColor || newGroupName ==""}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}

export default GroupList;
