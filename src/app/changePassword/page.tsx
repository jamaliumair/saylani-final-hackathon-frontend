import { useState } from 'react';

const ChangePasswordPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const response = await fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword }),
        });

        const data = await response.json();

        if (data.success) {
            setSuccess('Password updated successfully!');
        } else {
            setError(data.message || 'Error changing password');
        }

        setLoading(false);
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center">Change Password</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {success && <div className="text-green-500 text-center mb-4">{success}</div>}
            <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-sm font-medium">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Changing password...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
