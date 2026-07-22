import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(projectRoot, 'build/client/404/index.html')
const destination = resolve(projectRoot, 'build/client/404.html')

await mkdir(dirname(destination), { recursive: true })
await copyFile(source, destination)
console.log('Created build/client/404.html')
