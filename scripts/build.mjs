import * as esbuild from 'esbuild'
import { rimraf } from 'rimraf'
import stylePlugin from 'esbuild-style-plugin'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { copyFileSync, mkdirSync, readdirSync, existsSync, statSync, cpSync } from 'fs'
import { join } from 'path'

const args = process.argv.slice(2)
const isProd = args[0] === '--production'

await rimraf('dist')

/**
 * @type {esbuild.BuildOptions}
 */
const esbuildOpts = {
  color: true,
  entryPoints: ['src/main.tsx', 'index.html'],
  outdir: 'dist',
  entryNames: '[name]',
  write: true,
  bundle: true,
  format: 'iife',
  sourcemap: isProd ? false : 'linked',
  minify: isProd,
  treeShaking: true,
  jsx: 'automatic',
  loader: {
    '.html': 'copy',
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
  },
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
}

const copyStaticFiles = () => {
  mkdirSync('dist', { recursive: true })
  copyFileSync('src/imgs/favicon.svg', join('dist', 'favicon.svg'))
  copyFileSync('robots.txt', join('dist', 'robots.txt'))
  copyFileSync('sitemap.xml', join('dist', 'sitemap.xml'))
  // Copy public/ into dist/ root (recursively, preserving subfolders like pdf/)
  // so CSS url() references and direct links (e.g. /pdf/*.pdf) work
  if (existsSync('public')) {
    for (const file of readdirSync('public')) {
      const src = join('public', file)
      const dest = join('dist', file)
      if (statSync(src).isDirectory()) {
        cpSync(src, dest, { recursive: true })
      } else {
        copyFileSync(src, dest)
      }
    }
  }
}

if (isProd) {
  await esbuild.build(esbuildOpts)
  copyStaticFiles()
} else {
  const ctx = await esbuild.context(esbuildOpts)
  copyStaticFiles()
  await ctx.watch()
  const { hosts, port } = await ctx.serve({ servedir: 'dist' })
  console.log(`Running on:`)
  hosts.forEach((host) => {
    console.log('Creado por © Pushodev - 2025 pushodevs@gmail.com');

    console.log(`http://${host}:${port}`)
  })
}
