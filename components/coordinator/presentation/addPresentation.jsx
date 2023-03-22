import { useState } from "react";

const AddPresentation = () => {
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  return (
    <div className="addPresentation">
      <div className="addPresentation_wrapper">
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="write date here"
        />
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="write venue here"
        />
      </div>
    </div>
  );
};
export default AddPresentation;
