import Link from 'next/link'

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Your Profile</h1>

            <div className="grid gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Profile Sections</h2>
                    <div className="space-y-4">
                        <Link
                            href="/profile/hobbies"
                            className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <h3 className="font-medium">Manage Hobbies</h3>
                            <p className="text-gray-600">Add or remove hobbies from your profile</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 