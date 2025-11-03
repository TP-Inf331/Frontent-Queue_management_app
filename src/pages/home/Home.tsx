import SEO from '@/components/custom/utils/SEO'
import React from 'react'

const Home: React.FC = () => {
    return (
        <>
            {/* Seo compoments */}
            <SEO
                title='NoWait-Smart Queeue'
                description='Smart queue service management'
            />

            {/* App Comoments */}
            <>
                Home
            </>
        </>
    )
}

export default Home
