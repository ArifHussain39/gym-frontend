'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/members', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMembers(data);
    };

    fetchMembers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-navyblue min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6">👥 All Members</h1>

        {members.length === 0 ? (
          <p className="text-gray-400">No members found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-darkblue rounded-xl overflow-hidden">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Trainer</th>
                  <th className="p-3">Payment Date</th>
                  <th className="p-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member: any) => (
                  <tr key={member.id} className="border-b border-gray-700 hover:bg-navyblue/60">
                    <td className="p-3">{member.name}</td>
                    <td className="p-3">{member.phone}</td>
                    <td className="p-3">{member.plan_name || 'N/A'}</td>
                    <td className="p-3">{member.trainer_name || 'N/A'}</td>
                    <td className="p-3">{new Date(member.paymentDate).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(member.joinedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Members;
