require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const compression = require('compression')

const { createServer: createViteServer } = require('vite')
const handleSSR = require('./ssr')

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes (как и было)
const authMiddleware = require('./middlewares/auth')
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/consultations', require('./routes/consultationRoutes'))
app.use('/api/admin', authMiddleware.authenticate, require('./routes/adminRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use(compression())

// SSR Vite middleware
async function start() {
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
    root: path.resolve(__dirname, '../voe-client'),
    appType: 'custom'
  })

  app.use(vite.middlewares)

  // Catch-all route for SSR (SPA fallback)
  app.use('*', (req, res) => handleSSR(req, res, vite))

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

start()
