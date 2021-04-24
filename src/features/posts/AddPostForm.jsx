import React, { useState } from 'react'
import { addNewPost } from './postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from './../users/usersSlice'
import { unwrapResult } from '@reduxjs/toolkit'

function AddPostForm() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  })

  const savePost = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({title, content, user:userId})
        )
        unwrapResult(resultAction);

        setTitle('')
        setContent('')
        setUserId('')
      } catch(err) {
          console.error(`Failed: ${err}`)
      }
      finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  return (
    <section>
      <h2>Add a New Post</h2>
      <form autoComplete="off">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Choose user</option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <hr/>
        <button onClick={savePost} type="button" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
