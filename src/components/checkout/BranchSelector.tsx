import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Location {
  city: string;
  branches: string[];
}

interface BranchSelectorProps {
  // Assuming you might want to pass an initial branch or something similar as props
  initialBranch?: string;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({ initialBranch }) => {
  const defaultBranch = initialBranch || 'UNITY Fitness Nguyễn Duy Trinh';
  const locations: Location[] = [
    {
      city: 'Hồ Chí Minh',
      branches: [
        'UNITY Fitness Nguyễn Duy Trinh',
        'UNITY Fitness Phạm Văn Đồng',
        'UNITY Fitness Parc Mall'
      ]
    },
    {
      city: 'Hà Nội',
      branches: [
        'UNITY Fitness Phạm Hùng' // Example, replace it with actual branches if needed
      ]
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>(defaultBranch);

  const handleSelectBranch = (branch: string) => {
    setSelectedBranch(branch);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-500 underline flex items-center"
      >
        {selectedBranch} <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 bg-white border border-gray-300 shadow-md rounded mt-2">
          {locations.map((location) => (
            <div key={location.city}>
              <p className="px-4 py-2 font-semibold text-gray-700">{location.city}</p>
              {location.branches.map((branch) => (
                <div
                  key={branch}
                  onClick={() => handleSelectBranch(branch)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedBranch === branch ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}
                >
                  {branch}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BranchSelector;
