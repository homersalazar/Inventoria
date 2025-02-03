import React from 'react'

const StatsComponent = () => {
    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat text-center overflow-x-hidden">
                <div className="stat-value md:text-3xl text-xl text-[var(--secondary)]">31K</div>
                <div className="stat-title text-[var(--primary)]">Qty</div>
                <div className="stat-desc">NEW ITEMS</div>
            </div>
        </div>
    )
}

export default StatsComponent