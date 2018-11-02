import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  featuredImage,
  date,
  author,
  helmet,
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {featuredImage && (
              <Img fluid={featuredImage.localFile.childImageSharp.fluid} />
            )}
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div style={{ marginTop: `4rem` }}>
              <p>
                {date} - posted by{' '}
                <Link to={`/author/${author.slug}`}>{author.name}</Link>
              </p>
              {categories &&
                categories.length && (
                  <div>
                    <h4>Categories</h4>
                    <ul className="taglist">
                      {categories.map(category => (
                        <li key={`${category.slug}-cat`}>
                          <Link to={`/categories/${category.slug}/`}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {tags &&
                tags.length && (
                  <div>
                    <h4>Tags</h4>
                    <ul className="taglist">
                      {tags.map(tag => (
                        <li key={`${tag.slug}-tag`}>
                          <Link to={`/tags/${tag.slug}/`}>{tag.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ),
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.content}
        helmet={<Helmet title={`${post.title} | Blog`} />}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        featuredImage={post.featured_media}
        date={post.date}
        author={post.author}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      author {
        name
        slug
      }
    }
  }
`
