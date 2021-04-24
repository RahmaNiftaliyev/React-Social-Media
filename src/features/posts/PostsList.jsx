/* eslint-disable */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts, selectPostById, selectPostIds } from './postsSlice'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

let PostExcerpt = ({ postId }) => {
  

  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timeStamp={post.date} />
      </div>

      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

PostExcerpt = React.memo(PostExcerpt);

export const PostsList = () => {
  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds)
  // const posts = useSelector(selectPosts)
  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if(postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  },[postStatus, dispatch])

  // const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

  let content ; 

  if(postStatus === "loading") {
    content = <div className="loader">Loading...</div>
  }else if(postStatus === "succeeded") {
    content = orderedPostIds.map((postId) => {
      
       return(
        <PostExcerpt postId={postId} key={postId} />
       )
    
    })
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}


