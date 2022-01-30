import { useState, useMemo } from 'react'
import { FilesViewer } from '../components/FilesViewer'
import { TextField, Button } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


const fs = window.require('fs')
const pathModule = window.require('path')

const { app } = window.require('@electron/remote')

const formatSize = size => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

function Home() {
  const [path, setPath] = useState(app.getAppPath())

  const files = useMemo(
    () =>
      fs
        .readdirSync(path)
        .map(file => {
          const stats = fs.statSync(pathModule.join(path, file))
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory()
          }
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        }),
    [path]
  )

  const onBack = () => setPath(pathModule.dirname(path))
  const onOpen = folder => setPath(pathModule.join(path, folder))
  const goto = folder => setPath(folder)

  const [searchString, setSearchString] = useState('')
  const filteredFiles = files.filter(s => s.name.startsWith(searchString))

  return (
    <div className="container mt-2">
      <NavLink p={path} />
      <div className="mt-4 mb-2">
        <TextField
          value={searchString}
          variant="outlined"
          onChange={event => setSearchString(event.target.value)}
          style={{width:'100%'}}
          label="File search"
        />
      </div>
      <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
    </div>
  )
}

function NavLink({ p }) {
  const handleClick = (val) => {
    console.log(val)
  }

  let path = p.split('\\')

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {
          path.
            map((v, i) => {
              let name = path.
                slice(0, i + 1).
                reduce((pv, cv) => {
                  return pv === "" ? cv : pv + '\\' + cv
                }, '')
              return <Button onClick={()=>handleClick({name})} key={name}>{v}</Button>
            })
        }
      </Breadcrumbs>
    </div>
  )
}

export default Home
