const Table = ({ students }) => {
  return (
    <div class="container mx-auto flex items-center justify-center">
      {students?.length > 0 ? (
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Contact</th>
              <th class="px-4 py-2">Reg No</th>
              <th class="px-4 py-2">Accept</th>
              <th class="px-4 py-2">Delete</th>
            </tr>
          </thead>
          {students.map((x) => (
            <tbody>
              <tr>
                <td class="border px-8 py-2">{x.name}</td>
                <td class="border px-8 py-2">{x.email}</td>
                <td class="border px-8 py-2">{x.contact_no}</td>
                <td class="border px-8 py-2">{x.reg_no}</td>
                <td class="border px-8 py-2 hover:bg-green-600 hover:text-white cursor-pointer">
                  Accept
                </td>
                <td class="border px-8 py-2 hover:bg-red-600 hover:text-white cursor-pointer">
                  Delete
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <div>
          <span>No member was found in this group</span>
        </div>
      )}
    </div>
  );
};

export default Table;
