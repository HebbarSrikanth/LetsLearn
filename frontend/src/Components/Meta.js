import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Let's Learn| Home",
    description: 'Learning is the new revolution',
    keyword: 'Learning is the new revolution',
}

export default Meta
