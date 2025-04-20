const dummyUsers = [
    { name: 'Ali Khan', email: 'ali@gmail.com', date: '2025-04-19' },
    { name: 'Sara Shaikh', email: 'sara@gmail.com', date: '2025-04-18' },
    { name: 'Ahmed Raza', email: 'ahmed@gmail.com', date: '2025-04-17' },
  ];
  
  const UserTable = () => (
    <div className="bg-darkblue mt-8 p-6 rounded-2xl shadow-md">
      <h3 className="text-white text-xl font-semibold mb-4">Recent Users</h3>
      <table className="w-full text-left text-white">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="pb-2">Name</th>
            <th className="pb-2">Email</th>
            <th className="pb-2">Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user, idx) => (
            <tr key={idx} className="border-t border-gray-700">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default UserTable;
  