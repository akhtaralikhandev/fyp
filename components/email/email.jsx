import axios from "axios";
import { useState } from "react";

const Email = () => {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && text) {
      const resp = await axios.post("http://localhost:3000/api/contact", {
        email: email,
        text: text,
        subject: subject,
      });
      console.log(resp.data);
    }
    try {
      console.log(info.messageId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="email">
      <div className="email_wrapper text-black">
        <input
          type="email"
          placeholder="write email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="write text here"
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>submit</button>
      </div>
    </div>
  );
};
export default Email;
