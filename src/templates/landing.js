import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import Cookies from 'js-cookie';
import AOS from 'aos'


import components, {Layout} from '../components/index';

const urlPropsQueryConfig = {
    c: { type: UrlQueryParamTypes.string },
};

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaign: 'default'
        }
    }

    componentDidMount(){
        if (typeof window !== `undefined`) {
            window.a = AOS;
            AOS.init({
                offset: -100,
                duration: 1500,
            });
        }

        const { c } = this.props;
        let campaign = c;
        if (c === 'default') {
            campaign = Cookies.get('c') || c;
        } else if (c === 'reset') {
            Cookies.remove('c');
            campaign = 'default';
        } else {
            Cookies.set('c', c, { expires: 365 });
        }
        if (typeof(window) !== 'undefined'){
            window.analytics.ready(function() {
                const traits = {...window.analytics.user().traits(), ...{
                    'campaign': campaign
                }};
                window.analytics.identify(traits);
            });
        }
        this.setState({
            campaign: c
        }, () => { AOS.refresh() });
    };


    static propTypes = {
        // URL props are automatically decoded and passed in based on the config
        c: PropTypes.string,
     
        // change handlers are automatically generated when given a config.
        // By default they update that single query parameter and maintain existing
        // values in the other parameters.
        onChangeC: PropTypes.func,
      }
     
    static defaultProps = {
        c: 'default',
    }

    render() {

        return (
            <Layout {...this.props}>
            {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
                let component = _.upperFirst(_.camelCase(_.get(section, 'type')));
                let Component = components[component];

                const sectionCampaign = _.get(section, 'campaign');
                
                return (
                    <div  key={section_idx} className={!sectionCampaign || sectionCampaign === this.state.campaign ? '' : 'hidden '+ sectionCampaign + ' ' + this.state.campaign}>
                        
                        <Component {...this.props} section={section} site={this.props.pageContext.site} />
                    </div>
                )
            })}
            </Layout>
        );
    }
}
export default addUrlProps({ urlPropsQueryConfig })(Landing);