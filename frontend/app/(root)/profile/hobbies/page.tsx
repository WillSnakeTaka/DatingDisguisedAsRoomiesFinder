import { UserHobbies } from '@/app/components/users/UserHobbies'

export default function HobbiesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Manage Your Hobbies</h1>
                <UserHobbies />
            </div>
        </div>
    )
} 