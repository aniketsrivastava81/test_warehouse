import React from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Guides</div>
            <h1 style={{ marginTop: "8px" }}>Neighbourhood Guides + Lease Strategy</h1>
          </div>
          <p>
            Built for business owners: decision clarity, fewer surprises, and better negotiation
            leverage.
          </p>
        </div>

        <div className="grid">
          {BLOG_POSTS.map((post) => (
            <article className="card soft" id={post.slug} key={post.slug}>
              <div className="badges" style={{ marginBottom: "10px" }}>
                <span className="pill">
                  <strong>{post.tag}</strong>
                </span>
                <span className="pill">{post.date}</span>
              </div>
              <h2 style={{ margin: "0 0 10px 0" }}>{post.title}</h2>
              <p className="muted">{post.excerpt}</p>
              <div className="hr"></div>
              <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
            </article>
          ))}
        </div>

        <div className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Next step</div>
              <div>
                <strong>Want a shortlist?</strong> Tell us your timeline, use, and budget range—we’ll
                bring 3–5 options and negotiate from leverage.
              </div>
            </div>
            <Link className="btn btn-primary" to="/property-list">
              Browse listings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
