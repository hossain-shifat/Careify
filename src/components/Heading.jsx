import React from 'react'

const Heading = ({ title, subtitle }) => {
    return (
        <div className="my-4">
            <h1 className="inline-block font-bold text-3xl md:text-4xl border-b-4 border-accent pb-1">{title}</h1>
        </div>
    )
}

export default Heading
