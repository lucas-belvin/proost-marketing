import React from 'react';
import { sendEvent } from '../utils'

export default class SubscribeForm extends React.Component {
    handleSubmit = () => {
      sendEvent('Form Submited', {
        'form': 'subscribe'
      })
    }

    render() {
        return (
            <form name="subscribeForm" method="POST" netlifyHoneypot="bot-field" data-netlify="true" id="subscribe-form"
              className="subscribe-form" onSubmit={this.handleSubmit}>
              <div className="screen-reader-text">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </div>
              <div className="form-row">
                <label>
                  <span className="screen-reader-text">Email address</span>
                  <input className="subscribe-email" type="email" name="email" placeholder="Enter Email Address..."/>
                </label>
              </div>
              <input type="hidden" name="form-name" value="subscribeForm" />
              <button className="button" type="submit">Subscribe</button>
            </form>
        );
    }
}
