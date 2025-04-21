const fs = require('fs')
const path = require('path')

async function handleSSR(req, res, vite) {
  try {
    const url = req.originalUrl

    // Читаем HTML-шаблон
    let template = fs.readFileSync(
      path.resolve(__dirname, '../voe-client/index.html'),
      'utf-8'
    )

    template = await vite.transformIndexHtml(url, template)

    // Импорт entry-server и манифеста
    const { render } = await vite.ssrLoadModule('/entry-server.js')
    const manifestPath = path.resolve(__dirname, '../voe-client/dist/ssr-manifest.json')
    const manifest = fs.existsSync(manifestPath) ? require(manifestPath) : {}

    // Получаем итоговую HTML-страницу (со стилями)
    const html = await render(url, manifest)

    // Добавляем итоговый HTML в ответ
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

  } catch (e) {
    vite.ssrFixStacktrace(e)
    console.error(e)
    res.status(500).end(e.message)
  }
}

module.exports = handleSSR
