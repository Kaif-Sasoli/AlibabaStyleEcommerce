import express from 'express'
import app from './app.js'

// Server
app.listen(process.env.PORT || 5000, (res) => {
    try {
         console.log(`⚙️  Server is running on port ${process.env.PORT}` );
    } catch (error) {
        res.status('500').send('Internal Server Error!!!')
        console.log(error)
    }
})