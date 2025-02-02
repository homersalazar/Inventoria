import React from 'react'
import NavBar from '../../components/common/NavBar'
import Hero from '../../components/common/Hero'
import Categories from '../../components/common/Categories'
import Features from '../../components/common/Features'
import Contacts from '../../components/common/Contacts'

const customerPage = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <Categories />
            <Features />
            <Contacts />
        </>
    )
}

export default customerPage
