import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import "highlight.js/styles/atom-one-dark.css"

hljs.registerLanguage("javascript", javascript)

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allMicrocmsCategory {
        edges {
          node {
            id
            category
            categorySlug
          }
        }
      }
    }
  `)
  useEffect(() => {
    hljs.initHighlighting()
    // React環境だと初回以降ハイライト処理が入らないため外部からフラグをfalseに
    hljs.initHighlighting.called = false
  })
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__title">
          <Link to={`/`}>Web系の情報を中心に情報発信するブログです</Link>
        </h1>
        <div className="header-logo">
          <Link to={`/`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={445}
              height={132}
              viewBox="0 0 445 132"
            >
              <image
                id="logo_white02"
                width={445}
                height={132}
                xlinkHref="data:image/png;base64,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"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="header-nav-wrapper">
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li className="header-nav-list__item">
              <Link className="header-nav-list__item-link" to={`/`}>
                トップ
              </Link>
            </li>
            {data.allMicrocmsCategory.edges.map(({ node }) => (
              <li className="header-nav-list__item" key={node.id}>
                <Link
                  className="header-nav-list__item-link"
                  to={`/category/${node.categorySlug}/`}
                >
                  {node.category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
