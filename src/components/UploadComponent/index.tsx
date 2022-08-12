import {
  Grid,
  Container,
  ThemeProvider,
  Typography,
  Link,
  Box,
  CssBaseline,
} from '@mui/material'
import React, { createRef, useState, RefObject, useEffect } from 'react'
import { FileCopy } from '@mui/icons-material'
import ButtonComponent from '../ButtonComponent'
import theme from '../../utilities/theme'

const acceptedTypes = ['.pdf', 'application/pdf']

interface UploadComponentProps {
  onFileSelected: undefined | ((file: File | null) => void)
}

export default function UploadComponent({
  onFileSelected,
}: UploadComponentProps) {
  const [message, setMessage] = useState({
    type: null,
    text: null,
  } as { type: string | null; text: string | null })
  const [fileHovering, setFileHovering] = useState(false)
  const fileInputRef: RefObject<HTMLInputElement> = createRef()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (selectedFile !== null) {
      if (onFileSelected) {
        onFileSelected(selectedFile)
      }
    }
  }, [selectedFile])

  function clearMessage() {
    setMessage({ type: null, text: null })
  }

  function handleInputSelectFile(e: any) {
    if (e.target.files.length < 1) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDragStart = (ev: any) => {
    ev.preventDefault()
    clearMessage()
    setSelectedFile(null)
    setFileHovering(true)

    const files = []

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i]
          if (file) files.push(file)
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        files.push(ev.dataTransfer.files[i])
      }
    }

    if (files.length < 1) {
      setMessage({ type: 'erro', text: 'Falha ao obter o arquivo' })
    }

    const itemType = files[0].type

    if (itemType && !acceptedTypes.includes(itemType)) {
      setMessage({
        type: 'error',
        text: 'Tipo de arquivo não suportado. Selecione um pdf válido.',
      })
    }
  }

  const handleDragExit = (e: any) => {
    console.log('handleDragExit')
    setFileHovering(false)
    e.preventDefault()
    clearMessage()
  }

  const handleDragAreaClick = () => {
    fileInputRef!.current!.click()
  }

  const handleDropCapture = (ev: any) => {
    setFileHovering(false)
    ev.preventDefault()

    const files = []

    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i]
          files.push(file)
        }
      }
    } else {
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        const file = ev.dataTransfer.files[i]
        files.push(file)
      }
    }

    if (files.length < 1) {
      setMessage({
        type: 'error',
        text: 'Falha ao obter arquivo',
      })
    }

    const itemType = files[0].type
    if (itemType && !acceptedTypes.includes(itemType)) {
      setMessage({
        type: 'error',
        text: 'Tipo de arquivo não suportado. Selecione um pdf válido.',
      })
    }

    let f = files[0]

    if (typeof f.getAsFile === 'function') f = f.getAsFile()

    if (!(f instanceof File)) {
      setMessage({
        type: 'error',
        text: 'Falha ao obter arquivo',
      })
    }
    setSelectedFile(f)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        borderRadius={2}
        style={{
          background: fileHovering ? '#f5f5f5' : '#fff',
          opacity: fileHovering ? 0.8 : 1,
        }}
        sx={{
          width: '80vw',
          maxWidth: '900px',
          minHeight: '300px',
          border: '2px dashed #0CABA8',
        }}
        onDragOver={handleDragStart}
        onDragExit={handleDragExit}
        onDrop={handleDropCapture}
      >
        {!selectedFile && (
          <>
            {!fileHovering && (
              <Grid item xs={12}>
                <ButtonComponent
                  isUpload
                  label="Selecionar Histórico"
                  onClick={handleDragAreaClick}
                  variant="contained"
                  color="secondary"
                />
                <Typography variant="body1" marginTop={1}>
                  Ou{' '}
                  <Link href="selectCourses">
                    selecionar disciplinas já cursadas.
                  </Link>
                </Typography>
              </Grid>
            )}
            {fileHovering && (message.text ? message.text : <FileCopy />)}
          </>
        )}
        {selectedFile && (
          <Grid item>
            <Typography>{JSON.stringify(selectedFile.name)}</Typography>
            <ButtonComponent
              isUpload
              label="Selecionar outro arquivo"
              onClick={handleDragAreaClick}
              variant="outlined"
            />
          </Grid>
        )}
      </Grid>
      <Box display="none">
        <form>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleInputSelectFile}
          />
        </form>
      </Box>
    </ThemeProvider>
  )
}
