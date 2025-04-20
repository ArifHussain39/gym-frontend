'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');

            localStorage.setItem('adminToken', data.token);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navyblue flex items-center justify-center px-4">
            <div className="bg-darkblue p-8 rounded-2xl shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <Image src="/ellipse.svg" alt="Logo" width={120} height={40} />
                </div>
                <h2 className="text-3xl font-semibold text-white text-center mb-6">Admin Login</h2>
                {error && <p className="text-red text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="text-white block mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-navyblue text-white border border-gray-700 focus:outline-none focus:border-bluish"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-white block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-navyblue text-white border border-gray-700 focus:outline-none focus:border-bluish"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-bluish text-white font-semibold text-lg hover:bg-opacity-80 transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
