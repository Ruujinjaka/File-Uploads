import React, { useState } from 'react'
import axios from 'axios'

const FileUpload = () => {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})

    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(res.data)
            const { filename, filePath } = res.data;
            setUploadedFile({ filename, filePath })
        } catch (err) {
            if(err.response.status === 500) return console.log('there was a problem with the server')
            console.log(err.response.data.msg)
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type='file' id='customFile' onChange={event => {
                setFile(event.target.files[0])
                setFilename(event.target.files[0].name)
            }}/><br/>
            <br/>
            <label htmlFor="customFile">{filename}</label><br/>
            <input value='Upload' type="submit" value='Upload'/>
        </form>

        { uploadedFile ? <img src={uploadedFile.filePath} alt='must appear here' /> : null}
        </>
    )
}

export default FileUpload;