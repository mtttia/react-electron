import { IconFolder, IconFile, IconFolderOpen } from './Icons'
import { Paper } from '@mui/material'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { useTheme } from '@mui/material/styles';

{/* <tr className="clickable" onClick={onBack}>
<td className="icon-row">
  <IconFolderOpen />
</td>
<td>..</td>
<td></td> */}

export function FilesViewer({ files, onBack, onOpen }) {
  

  return (
    <div>
      <div className="clickable" onClick={onBack}>
        <Link {...{name:'..', directory:true, size:null}} />
      </div>
        {files.map(({ name, directory, size }) => {
          return (
            <div className="clickable" onClick={() => directory && onOpen(name)} key={name}>
              <Link {...{name:name, directory:directory, size:size}} />
            </div>
          )
        })}
    </div>
  )
}

function Link({ name, directory, size }) {
  const theme = useTheme()
  return (
    <Paper elevation={3} style={{display: 'flex', alignItems: 'center', width:'100%', backgroundColor: theme.palette.background.main, margin:'10px 0px', padding:'10px'}}>
      <div style={{flex:1}}>
        {directory ? <FolderRoundedIcon /> : <InsertDriveFileRoundedIcon />}
      </div>
      <div style={{flex:3}}>
        {name}
      </div>
      <div style={{flex:1, float:'end'}}>
        {size}
      </div>

    </Paper>
  )
}