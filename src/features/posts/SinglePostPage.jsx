import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

function SinglePostPage({ match }) {
  const {postId} = match.params
  const posts = useSelector(state => selectPostById(state, postId))
  // const findedPost = posts.find((post) => post.id === postId)

  if (!posts) {
    return (
      <section>
        <h2 className="alert alert-danger text-primary text-upper text-center">
          Post not found
        </h2>
      </section>
    )
  }

  return (
    <article>
      <section>
        <h2>{posts.title}</h2>
        <div>
          <PostAuthor userId={posts.userId} />
          <TimeAgo timeStamp={posts.date} />
        </div>
        <p className="post-content">{posts.content}</p>
        <ReactionButtons post={posts} />
        <Link to={`/editPost/${posts.id}`} className="button">
          Edit Post
        </Link>
      </section>
    </article>
  )
}

export default SinglePostPage
