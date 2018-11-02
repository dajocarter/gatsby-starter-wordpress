import React from 'react'

const Comments = ({ comments, postName }) => {
  const getCommentDepth = commentNode => {
    let depthLevel = 0
    while (commentNode.wordpress_parent) {
      commentNode = comments.find(
        ({ node }) => node.wordpress_id === commentNode.wordpress_parent
      )
      console.log('parent found')
      ++depthLevel
    }
    console.log('depth level', depthLevel)
    return depthLevel
  }

  const arrangeComments = commentsToArrange => {
    let maxDepth = 0
    const adjustedComments = commentsToArrange.map(({ node }) => {
      node.comment_children = []
      node.comment_depth = getCommentDepth(node)
      if (node.comment_depth > maxDepth) maxDepth = node.comment_depth
      return node
    })
    console.log('max depth', maxDepth)
    /* let arrangedComments = []
    let commentsAtDepth = []
    console.log('maxDepth', maxDepth)
    for (let i = maxDepth; i > 0; i--) {
      commentsAtDepth = adjustedComments.filter(
        comment => comment.comment_depth === i
      )
      console.log('commentsAtDepth', commentsAtDepth)
      arrangedComments = commentsAtDepth.map(comment => {
        parentComment = commentsToArrange.find(
          comm => comm.wordpress_id === comment.wordpress_parent
        )
        parentComment.comment_children.push(comment)
      })
      console.log('arrangeComments', arrangeComments)
    }
		return arrangedComments.filter(comment => comment.wordpress_parent > 0) */
    return commentsToArrange
  }

  const commentList = arrangeComments(comments)
  //console.log(commentList)

  return (
    <div className="comments-area">
      <h2 className="comments-title">
        {comments.length} Replies to “{postName}”
      </h2>
      <ol className="comment-list">
        {commentList.map(({ node }, i) => (
          <li
            key={node.wordpress_id}
            className={`comment comment-${node.wordpress_id} ${
              i % 2 === 0 ? 'even' : 'odd'
            }`}
          >
            <article className="comment-body">
              <header className="comment-meta">
                <div className="comment-author vcard">
                  <img
                    src={node.author_avatar_urls.wordpress_96}
                    className="avatar photo"
                  />
                  <strong className="fn">
                    <a
                      href={node.author.author_url}
                      rel="external nofollow"
                      className="url"
                    >
                      {node.author_name}
                    </a>
                  </strong>
                </div>
                <div className="comment-metadata">
                  <time dateTime={node.date}>{node.formatted_date}</time>
                </div>
              </header>
              <div
                className="comment-content"
                dangerouslySetInnerHTML={{ __html: node.content }}
              />
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Comments
