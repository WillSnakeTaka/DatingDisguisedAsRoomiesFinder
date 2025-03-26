import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div>Users Page {params.id} </div>
    )
}

export default page