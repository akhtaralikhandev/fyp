import { useState } from "react";

const CreateOrJoinGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [join, setJoin] = useState(false);
  return (
    <div className="createOrJoinGroup bg-slate-800">
      <div className="createOrJoin_wrapper mt-24 flex items-center justify-center gap-4 flex-col">
        <div className="flex gap-8">
          <span
            className="bg-slate-700 rounded-xl text-white cursor-pointer p-2"
            onClick={() => setJoin(true)}
          >
            Join Group
          </span>
          <span
            className="bg-slate-700 rounded-xl cursor-pointer text-white p-2"
            onClick={() => setJoin(false)}
          >
            Create Group
          </span>
        </div>
        {join ? (
          <input
            value={joinCode}
            placeholder="group code"
            className=" border-2 p-2  outline-blue-600 rounded-xl"
            onChange={(e) => setJoinCode(e.target.value)}
          />
        ) : (
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="write group name"
            className=" border-2 p-2  outline-blue-600 rounded-xl"
          />
        )}
      </div>
    </div>
  );
};

export default CreateOrJoinGroup;
