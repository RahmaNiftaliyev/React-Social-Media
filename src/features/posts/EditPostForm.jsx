import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postUpdated, selectPostById } from './postsSlice'
import { useHistory } from 'react-router-dom'

function EditPostForm({ match }) {
  const postId = match.params.postId
  const posts = useSelector(state => selectPostById(state, postId))
  // const findedPost = posts.find((post) => post.id === postId)

  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState(posts.title)
  const [content, setContent] = useState(posts.content)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
