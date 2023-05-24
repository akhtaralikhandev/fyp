import React, { useContext, useState } from "react";
import { NavbarContext } from "../navbarContext";

const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Durian",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Ice cream bean",
  "Jackfruit",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Peach",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Ugli fruit",
  "Vanilla bean",
  "Watermelon",
  "Xigua (Chinese watermelon)",
  "Yellow passionfruit",
  "Zucchini",
];

function SearchableDropdownList({ projects }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const filteredProjects = projects?.filter((project) =>
    project.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  //  presentationVenue,
  //       setPresentationVenue,
  //       presentationProjectId,
  //       setPresentationProjectId,
  const { setPresentationProjectId, presentationProjectId } =
    useContext(NavbarContext);
  console.log(presentationProjectId);
  return (
    <div className="relative z-4">
      <div className="flex flex-col">
        <input
          type="text"
          value={searchTerm}
          className="border-2 p-2 rounded-lg z-2 outline-blue-800 border-blue-500"
          placeholder="Search for project..."
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isOpen && (
        <ul className="ulListoption top-18 left-0 right-0 z-4 border border-gray-300 bg-white">
          <span
            onClick={() => setIsOpen(false)}
            className="absolute right-4 text-red-500 cursor-pointer hover:text-red-400 text-4xl"
          >
            <i class="fa fa-close" aria-hidden="true"></i>
          </span>
          {filteredProjects?.map((item) => (
            <li
              key={item?.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                console.log("I am clicked");
                console.log(item);
                setPresentationProjectId(item?.id);
                setSelectedItem(item?.title);
                setSearchTerm(item?.title);
                setIsOpen(false);
              }}
            >
              {item?.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchableDropdownList;
