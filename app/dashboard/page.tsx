'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [dueMembers, setDueMembers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${token}` };

      const [mRes, pRes, tRes] = await Promise.all([
        fetch('http://localhost:5000/api/members', { headers }),
        fetch('http://localhost:5000/api/plans', { headers }),
        fetch('http://localhost:5000/api/trainers', { headers }),
      ]);

      const membersData = await mRes.json();
      const plansData = await pRes.json();
      const trainersData = await tRes.json();

      setMembers(membersData);
      setPlans(plansData);
      setTrainers(trainersData);

      const today = new Date();
      const due = membersData.filter((m: any) => new Date(m.paymentDate) < today);
      setDueMembers(due);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-navyblue min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-darkblue p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold">Total Members</h2>
            <p className="text-3xl mt-2">{members.length}</p>
          </div>

          <div className="bg-darkblue p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold">Active Plans</h2>
            <p className="text-3xl mt-2">{plans.length}</p>
          </div>

          <div className="bg-darkblue p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold">Total Trainers</h2>
            <p className="text-3xl mt-2">{trainers.length}</p>
          </div>
        </div>

        {/* Due Payments */}
        <h2 className="text-xl font-semibold mb-4">⏰ Members with Due Payments</h2>

        {dueMembers.length === 0 ? (
          <p className="text-gray-400">All members are up to date with payments.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-darkblue rounded-xl overflow-hidden">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {dueMembers.map((member: any) => (
                  <tr key={member.id} className="border-b border-gray-700 hover:bg-navyblue/60">
                    <td className="p-3">{member.name}</td>
                    <td className="p-3">{member.phone}</td>
                    <td className="p-3">{member.plan_name || 'N/A'}</td>
                    <td className="p-3">{new Date(member.paymentDate).toLocaleDateString()}</td>
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

export default Dashboard;
