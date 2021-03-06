import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"

const Contact = () => {
  return (
    <>
      <SEO title={`Contact`} />
      <Layout>
        <div className="infoBanner">{`Contact`}</div>
        <form
          className="contact-container"
          name="Contact"
          method="POST"
          data-netlify-recaptcha="true"
          data-netlify="true"
        >
          <div className="contact-container-name">
            <input
              className="contact-name"
              type="text"
              placeholder="Name..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              name="Name"
            />
          </div>
          <div className="contact-container-email">
            <input
              className="contact-email"
              type="text"
              placeholder="Email..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              name="Email"
            />
          </div>
          <div className="contact-container-message">
            <textarea
              className="contact-message"
              placeholder="Message..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              name="Message"
              rows="10"
            ></textarea>
          </div>
          <div className="contact-submit-container">
            <div data-netlify-recaptcha="true"></div>
            <button className="contact-submit" type="submit">
              Send
            </button>
          </div>
        </form>
        <hr/>
      </Layout>
    </>
  )
}

export default Contact
