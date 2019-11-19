import React from 'react';
import _ from 'lodash';

import {htmlToReact, markdownify, sendEvent} from '../utils';

export default class SectionShortcontact extends React.Component {
    handleSubmit = () => {
      sendEvent('Form Submited', {
        'form': 'subscribe'
      })
    }

    render() {
        let section = _.get(this.props, 'section');
        return (
            <section id={_.get(section, 'section_id')} className={'block contact-block bg-' + _.get(section, 'bg') + ' outer'}>
              <div className="block-header inner-small">
                {_.get(section, 'title') && 
                <h2 className="block-title">{_.get(section, 'title')}</h2>
                }
                {_.get(section, 'subtitle') && 
                <p className="block-subtitle">
                  {htmlToReact(_.get(section, 'subtitle'))}
                </p>
                }
              </div>
              <div className="block-content inner-medium">
                {markdownify(_.get(section, 'content'))}
                <form name="shortContactForm" method="POST" netlifyHoneypot="bot-field" data-netlify="true" id="short-contact-form"
                  className="contact-form"  onSubmit={this.handleSubmit}>
                  <p className="screen-reader-text">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </p>
                  <p className="form-row">
                    <input type="email" name="email" placeholder='Enter Email Address...' className="form-input"/>
                  </p>
                  <input type="hidden" name="form-name" value="shortContactForm" />
                  <p className="form-row form-submit">
                    <button type="submit" className="button">Submit</button>
                  </p>
                </form>
              </div>
            </section>
        );
    }
}
