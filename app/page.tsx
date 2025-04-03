'use client'

import { useState, useEffect } from 'react'
import { DynamoEntry } from './lib/dynamodb'

interface S3Object {
  Key: string
  LastModified: string
  Size: number
}

interface EntryField {
  key: string
  value: string
}

const UploadFiles = ({ file, setFile, uploading, handleSubmit }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2>Upload Files</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <input
        id="file"
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setFile(files[0]);
          }
        }}
        accept="image/png, image/jpeg"
      />
      <button type="submit" disabled={uploading} className="action-button">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  </div>
);

const CreateEntry = ({ fields, updateField, removeField, addField, handleNewEntrySubmit }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2>Create a No-SQL Database Entry</h2>
    <form onSubmit={handleNewEntrySubmit}>
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Enter key name"
            value={field.key}
            onChange={(e) => updateField(index, { key: e.target.value })}
            style={{ width: '200px' }}
          />
          <input
            type="text"
            placeholder="Enter value"
            value={field.value}
            onChange={(e) => updateField(index, { value: e.target.value })}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={() => removeField(index)}
            className="delete-button"
          >
            Remove
          </button>
        </div>
      ))}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button
          type="button"
          onClick={addField}
          className="add-button"
        >
          Add Key-Value Pair
        </button>
        <button
          type="submit"
          className="action-button"
        >
          Create Entry
        </button>
      </div>
    </form>
  </div>
);

const S3BucketContents = ({ objects }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2>S3 Bucket Contents</h2>
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Last Modified</th>
          <th style={{ textAlign: 'right' }}>Size</th>
        </tr>
      </thead>
      <tbody>
        {objects.map((obj) => (
          <tr key={obj.Key}>
            <td>{obj.Key}</td>
            <td>{new Date(obj.LastModified).toLocaleString()}</td>
            <td style={{ textAlign: 'right' }}>
              {(obj.Size / 1024).toFixed(2)} KB
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DatabaseEntries = ({ entries, handleDelete }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2>Database Entries</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Created At</th>
          <th>Data</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries && entries.length > 0 ? (
          entries.map((entry) => {
            const { id, createdAt, updatedAt, ...data } = entry;
            return (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
                <td>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4}>No entries available.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [objects, setObjects] = useState<S3Object[]>([])
  const [entries, setEntries] = useState<DynamoEntry[]>([])
  const [fields, setFields] = useState<EntryField[]>([{ key: '', value: '' }])
  const [error, setError] = useState<string | null>(null)
  const [entriesError, setEntriesError] = useState<string | null>(null)

  const fetchObjects = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/list-objects')
      const data = await response.json()

      if (response.ok) {
        setObjects(data.objects)
        setError(null)
      } else {
        throw new Error(data.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error fetching objects:', error)
      setError('Error communicating with AWS. Check credentials')
      setObjects([])
    }
  }

  const fetchEntries = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/database')
      const data = await response.json()

      if (response.ok) {
        setEntries(data.items)
        setEntriesError(null)
      } else {
        throw new Error(data.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error fetching entries:', error)
      setEntriesError('Error communicating with the database. Check connection.')
      setEntries([])
    }
  }

  useEffect(() => {
    fetchObjects()
    fetchEntries()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setUploading(true)

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload-object',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    )

    if (response.ok) {
      const { url, fields: formFields } = await response.json()

      const formData = new FormData()
      Object.entries(formFields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        alert('Upload successful!')
        fetchObjects()
      } else {
        console.error('S3 Upload Error:', uploadResponse)
        alert('Upload failed.')
      }
    } else {
      alert('Failed to get pre-signed URL.')
    }

    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/database/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        fetchEntries()
      } else {
        alert('Failed to delete entry.')
      }
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry.')
    }
  }

  const handleNewEntrySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Convert fields array to object format
    const entryData = fields.reduce((acc, field) => {
      if (field.key.trim()) { // Only include fields with non-empty keys
        acc[field.key.trim()] = field.value
      }
      return acc
    }, {} as Record<string, string>)

    if (Object.keys(entryData).length === 0) {
      alert('Please add at least one key-value pair')
      return
    }
    
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/database',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entryData),
        }
      )

      if (response.ok) {
        setFields([{ key: '', value: '' }]) // Reset to initial state
        fetchEntries()
      } else {
        alert('Failed to create entry.')
      }
    } catch (error) {
      console.error('Error creating entry:', error)
      alert('Failed to create entry.')
    }
  }

  const addField = () => {
    setFields([...fields, { key: '', value: '' }])
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const updateField = (index: number, field: Partial<EntryField>) => {
    setFields(fields.map((f, i) => {
      if (i === index) {
        return { ...f, ...field }
      }
      return f
    }))
  }

  return (
    <main>
      <h1>CS467 App Template</h1>
      <div style={{ marginBottom: '3rem' }}>
        <p>This is a starter NextJS application that integrates with AWS S3 and DynamoDB.  It can be used as a starting point for your own projects.  AWS credentials must be configured in the ~/.aws/credentials on your dev workstation or in the .env.local file.</p>
      </div>
      <div className="content-wrapper">
        {error && <div className="error-message">{error}</div>}
        {entriesError && <div className="error-message">{entriesError}</div>}
        <UploadFiles file={file} setFile={setFile} uploading={uploading} handleSubmit={handleSubmit} />
        <CreateEntry fields={fields} updateField={updateField} removeField={removeField} addField={addField} handleNewEntrySubmit={handleNewEntrySubmit} />
        <S3BucketContents objects={objects} />
        <DatabaseEntries entries={entries} handleDelete={handleDelete} />
      </div>
    </main>
  )
}
