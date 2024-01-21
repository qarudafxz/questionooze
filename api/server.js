import app from './index.js'

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
