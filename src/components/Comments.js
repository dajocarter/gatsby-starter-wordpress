import React from 'react'

const Comments = ({ comments, postName }) => {
  return (
    <div className="comments-area">
      <h2 className="comments-title">
        {comments.length} Replies to “{postName}”
      </h2>
      <ol className="comment-list">
        {comments.map(({ node }, i) => (
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
