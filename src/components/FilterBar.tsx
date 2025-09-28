import type { StoryType } from "../types/types";
import {
  FaBriefcase,
  FaChartLine,
  FaExternalLinkAlt,
  FaNewspaper,
  FaQuestion,
  FaStar,
} from "react-icons/fa";

interface FilterBarProps {
  activeFilter: StoryType;
  onStoryChange: (storyType: StoryType) => void;
}

const FilterBar = ({ activeFilter, onStoryChange }: FilterBarProps) => {
  const storyTypes = ["top", "new", "best", "ask", "show", "job"];
  const storyTypesIcons = {
    top: <FaChartLine />,
    new: <FaNewspaper />,
    best: <FaStar />,
    ask: <FaQuestion />,
    show: <FaExternalLinkAlt />,
    job: <FaBriefcase />,
  };

  return (
    <div className="flex gap-4 mb-12">
      {storyTypes.map((storyType) => (
        <div key={storyType}>
          <button
            className={`${
              activeFilter === storyType
                ? "bg-gray-100 text-gray-950"
                : "bg-gray-900 text-gray-100"
            } flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md`}
            onClick={() => onStoryChange(storyType as StoryType)}
          >
            {storyTypesIcons[storyType as keyof typeof storyTypesIcons]}
            {storyType}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
